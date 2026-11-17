import type { NextFunction, Request, Response } from 'express';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { adminAuth } from '../lib/firebase-admin.ts';
import { getOrCreateProfileAndRole } from '../db/queries.ts';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
  profileId?: number;
  userRole?: string;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing bearer token' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = decoded;

    const { profile, role } = await getOrCreateProfileAndRole(
      decoded.uid,
      decoded.email || '',
      decoded.name || 'Sanctuary Member',
    );
    req.profileId = profile.id;
    req.userRole = role;
    next();
  } catch (error) {
    console.error('Auth verification failed:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session token' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  await requireAuth(req, res, () => {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Administrator role required' });
    }
    next();
  });
};
