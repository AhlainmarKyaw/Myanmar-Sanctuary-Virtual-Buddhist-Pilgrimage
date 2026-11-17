import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { apiFetch } from '../utils/apiClient';
import type { AppRole } from '../types/sanctuary';

interface MemberProfileSummary {
  id: number;
  uid: string;
  email: string;
  displayName: string;
  preferredLanguage: string;
  privacyPublicProfile: boolean;
  privacySaveActivity: boolean;
}

interface AuthContextValue {
  user: User | null;
  idToken: string | null;
  profile: MemberProfileSummary | null;
  role: AppRole;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<MemberProfileSummary | null>(null);
  const [role, setRole] = useState<AppRole>('visitor');
  const [loading, setLoading] = useState(true);

  const syncBackendProfile = useCallback(async (firebaseUser: User) => {
    try {
      const token = await firebaseUser.getIdToken();
      setIdToken(token);
      const data = await apiFetch<{
        profile: MemberProfileSummary;
        role: AppRole;
      }>('/api/me/dashboard', { token });
      setProfile(data.profile);
      setRole(data.role || 'member');
    } catch (error) {
      console.error('Failed to sync profile with PostgreSQL:', error);
      setRole('member');
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await syncBackendProfile(firebaseUser);
      } else {
        setIdToken(null);
        setProfile(null);
        setRole('visitor');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [syncBackendProfile]);

  const refreshProfile = useCallback(async () => {
    if (!auth.currentUser) return;
    await syncBackendProfile(auth.currentUser);
  }, [syncBackendProfile]);

  const signInWithGoogle = useCallback(async () => {
    await signInWithPopup(auth, googleAuthProvider);
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const registerWithEmail = useCallback(
    async (email: string, password: string, displayName: string) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName.trim()) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }
      await syncBackendProfile(cred.user);
    },
    [syncBackendProfile],
  );

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      idToken,
      profile,
      role,
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      resetPassword,
      logout,
      refreshProfile,
    }),
    [
      user,
      idToken,
      profile,
      role,
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      resetPassword,
      logout,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
