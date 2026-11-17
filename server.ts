import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { requireAdmin, requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import {
  createDhammaAdmin,
  getAdminOverviewData,
  getPublicCatalog,
  getUserDashboardData,
  recordMeditationSessionDb,
  recordPagodaVisitDb,
  recordPrayerSessionDb,
  toggleFavoritePagodaDb,
  toggleSavedDhammaDb,
  updatePagodaAdmin,
  updateUserProfile,
  updateUserRoleAdmin,
  upsertBeadProgressDb,
  upsertFigureAdmin,
} from './src/db/queries.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  // Public catalog endpoints
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/catalog', async (_req, res) => {
    try {
      const catalog = await getPublicCatalog();
      res.json(catalog);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to load sanctuary catalog',
      });
    }
  });

  // Protected Member endpoints
  app.get('/api/me/dashboard', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const data = await getUserDashboardData(req.profileId);
      res.json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to load dashboard',
      });
    }
  });

  app.patch('/api/me/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const updated = await updateUserProfile(req.profileId, {
        displayName:
          typeof req.body.displayName === 'string' ? req.body.displayName.trim() : undefined,
        preferredLanguage:
          req.body.preferredLanguage === 'en' || req.body.preferredLanguage === 'my'
            ? req.body.preferredLanguage
            : undefined,
        privacyPublicProfile:
          typeof req.body.privacyPublicProfile === 'boolean'
            ? req.body.privacyPublicProfile
            : undefined,
        privacySaveActivity:
          typeof req.body.privacySaveActivity === 'boolean'
            ? req.body.privacySaveActivity
            : undefined,
      });
      res.json({ profile: updated });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update profile',
      });
    }
  });

  app.post('/api/me/meditations', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const saved = await recordMeditationSessionDb(req.profileId, {
        mode: req.body.mode === 'silent' ? 'silent' : 'guided',
        ambientSound: String(req.body.ambientSound || 'bells'),
        durationMinutes: Number(req.body.durationMinutes) || 10,
        completedSeconds: Math.max(1, Number(req.body.completedSeconds) || 60),
      });
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to save meditation session',
      });
    }
  });

  app.post('/api/me/prayers', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const saved = await recordPrayerSessionDb(req.profileId, {
        prayerTitle: String(req.body.prayerTitle || 'Traditional Homage'),
        candleLit: Boolean(req.body.candleLit),
        incenseOffered: Boolean(req.body.incenseOffered),
        quietMode: Boolean(req.body.quietMode),
        durationSeconds: Math.max(1, Number(req.body.durationSeconds) || 120),
        isPrivate: req.body.isPrivate !== false,
      });
      res.status(201).json(saved);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to save prayer session',
      });
    }
  });

  app.put('/api/me/mala', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const saved = await upsertBeadProgressDb(req.profileId, {
        currentBead: Math.max(0, Math.min(108, Number(req.body.currentBead) || 0)),
        completedRounds: Math.max(0, Number(req.body.completedRounds) || 0),
        totalBeadsCounted: Math.max(0, Number(req.body.totalBeadsCounted) || 0),
        soundEnabled: req.body.soundEnabled !== false,
      });
      res.json(saved);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update mala progress',
      });
    }
  });

  app.post('/api/me/pagoda-visit', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const slug = String(req.body.slug || '');
      const visit = await recordPagodaVisitDb(req.profileId, slug);
      res.status(201).json({ visit });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to record visit',
      });
    }
  });

  app.post('/api/me/favorite-pagoda', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const slug = String(req.body.slug || '');
      const result = await toggleFavoritePagodaDb(req.profileId, slug);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update favorite pagoda',
      });
    }
  });

  app.post('/api/me/saved-dhamma', requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.profileId) return res.status(401).json({ error: 'Profile not found' });
      const slug = String(req.body.slug || '');
      const result = await toggleSavedDhammaDb(req.profileId, slug);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update saved Dhamma',
      });
    }
  });

  // Protected Admin endpoints
  app.get('/api/admin/overview', requireAdmin, async (_req: AuthRequest, res) => {
    try {
      const overview = await getAdminOverviewData();
      res.json(overview);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to load admin overview',
      });
    }
  });

  app.patch('/api/admin/users/:id/role', requireAdmin, async (req: AuthRequest, res) => {
    try {
      const targetId = Number(req.params.id);
      const role = req.body.role === 'admin' ? 'admin' : 'member';
      const updated = await updateUserRoleAdmin(targetId, role);
      res.json({ roleRecord: updated });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update user role',
      });
    }
  });

  app.patch('/api/admin/pagodas/:id', requireAdmin, async (req: AuthRequest, res) => {
    try {
      const pagodaId = Number(req.params.id);
      const updated = await updatePagodaAdmin(pagodaId, {
        name: typeof req.body.name === 'string' ? req.body.name : undefined,
        nameMy: typeof req.body.nameMy === 'string' ? req.body.nameMy : undefined,
        location: typeof req.body.location === 'string' ? req.body.location : undefined,
        summary: typeof req.body.summary === 'string' ? req.body.summary : undefined,
        historicalSignificance:
          typeof req.body.historicalSignificance === 'string'
            ? req.body.historicalSignificance
            : undefined,
        architecturalNotes:
          typeof req.body.architecturalNotes === 'string'
            ? req.body.architecturalNotes
            : undefined,
      });
      res.json({ pagoda: updated });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to update pagoda',
      });
    }
  });

  app.post('/api/admin/figures', requireAdmin, async (req: AuthRequest, res) => {
    try {
      const saved = await upsertFigureAdmin({
        id: req.body.id ? Number(req.body.id) : undefined,
        slug: String(req.body.slug || `figure-${Date.now()}`),
        name: String(req.body.name || ''),
        nameMy: typeof req.body.nameMy === 'string' ? req.body.nameMy : undefined,
        era: String(req.body.era || ''),
        titleOrRole: String(req.body.titleOrRole || ''),
        biography: String(req.body.biography || ''),
        historicalBackground: String(req.body.historicalBackground || ''),
        displayOrder: Number(req.body.displayOrder) || 1,
        isActive: req.body.isActive !== false,
      });
      res.json({ figure: saved });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to save figure',
      });
    }
  });

  app.post('/api/admin/dhamma', requireAdmin, async (req: AuthRequest, res) => {
    try {
      const created = await createDhammaAdmin({
        publishDate: String(req.body.publishDate || new Date().toISOString().slice(0, 10)),
        quoteEn: String(req.body.quoteEn || ''),
        quoteMy: String(req.body.quoteMy || ''),
        explanationEn: String(req.body.explanationEn || ''),
        explanationMy: typeof req.body.explanationMy === 'string' ? req.body.explanationMy : undefined,
        reflectionPrompt: String(req.body.reflectionPrompt || ''),
        sourceAttribution: String(req.body.sourceAttribution || ''),
        isDailyFeatured: Boolean(req.body.isDailyFeatured),
      });
      res.status(201).json({ dhamma: created });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unable to publish Daily Dhamma',
      });
    }
  });

  // Vite dev middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Virtual Myanmar Buddhist Sanctuary server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
