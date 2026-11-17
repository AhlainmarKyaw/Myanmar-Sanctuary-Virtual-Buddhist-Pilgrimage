import type {
  BeadProgress,
  MeditationSession,
  PagodaSlug,
  PrayerSession,
} from '../types/sanctuary';

const STORAGE_KEYS = {
  MEDITATION: 'sanctuary_meditation_sessions',
  PRAYER: 'sanctuary_prayer_sessions',
  MALA: 'sanctuary_mala_progress',
  RECENT_PAGODAS: 'sanctuary_recent_pagodas',
  FAVORITE_PAGODAS: 'sanctuary_favorite_pagodas',
  SAVED_DHAMMA: 'sanctuary_saved_dhamma',
} as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export const practiceStorage = {
  getMeditationSessions(): MeditationSession[] {
    return readJson<MeditationSession[]>(STORAGE_KEYS.MEDITATION, []);
  },
  addMeditationSession(session: MeditationSession) {
    const existing = this.getMeditationSessions();
    writeJson(STORAGE_KEYS.MEDITATION, [session, ...existing].slice(0, 50));
  },
  getPrayerSessions(): PrayerSession[] {
    return readJson<PrayerSession[]>(STORAGE_KEYS.PRAYER, []);
  },
  addPrayerSession(session: PrayerSession) {
    const existing = this.getPrayerSessions();
    writeJson(STORAGE_KEYS.PRAYER, [session, ...existing].slice(0, 50));
  },
  getMalaProgress(): BeadProgress {
    return readJson<BeadProgress>(STORAGE_KEYS.MALA, {
      id: 'local-mala',
      userId: 'guest',
      currentBead: 0,
      completedRounds: 0,
      totalBeadsCounted: 0,
      soundEnabled: true,
      updatedAt: new Date().toISOString(),
    });
  },
  saveMalaProgress(progress: BeadProgress) {
    writeJson(STORAGE_KEYS.MALA, progress);
  },
  getRecentPagodas(): PagodaSlug[] {
    return readJson<PagodaSlug[]>(STORAGE_KEYS.RECENT_PAGODAS, []);
  },
  recordPagodaVisit(slug: PagodaSlug) {
    const existing = this.getRecentPagodas().filter((s) => s !== slug);
    writeJson(STORAGE_KEYS.RECENT_PAGODAS, [slug, ...existing].slice(0, 6));
  },
  getFavoritePagodas(): PagodaSlug[] {
    return readJson<PagodaSlug[]>(STORAGE_KEYS.FAVORITE_PAGODAS, []);
  },
  toggleFavoritePagoda(slug: PagodaSlug): PagodaSlug[] {
    const existing = this.getFavoritePagodas();
    const next = existing.includes(slug)
      ? existing.filter((s) => s !== slug)
      : [...existing, slug];
    writeJson(STORAGE_KEYS.FAVORITE_PAGODAS, next);
    return next;
  },
  getSavedDhammaIds(): string[] {
    return readJson<string[]>(STORAGE_KEYS.SAVED_DHAMMA, []);
  },
  toggleSavedDhamma(id: string): string[] {
    const existing = this.getSavedDhammaIds();
    const next = existing.includes(id)
      ? existing.filter((item) => item !== id)
      : [...existing, id];
    writeJson(STORAGE_KEYS.SAVED_DHAMMA, next);
    return next;
  },
};
