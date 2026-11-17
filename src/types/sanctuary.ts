export type LanguageCode = 'en' | 'my';

export type AppRole = 'visitor' | 'member' | 'admin';

export type QualityTier = 'high' | 'balanced' | 'fallback';

export type PagodaSlug = 'shwedagon' | 'mahamuni' | 'kyaiktiyo';

export interface Profile {
  id: string;
  email: string;
  displayName: string;
  preferredLanguage: LanguageCode;
  avatarUrl?: string | null;
  privacyPublicProfile: boolean;
  privacySaveActivity: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRoleRecord {
  id: string;
  userId: string;
  role: AppRole;
  assignedAt: string;
}

export interface PagodaPointOfInterest {
  id: string;
  title: string;
  titleMy?: string;
  description: string;
  descriptionMy?: string;
  historicalPeriod?: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

export interface PagodaGalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  eraOrSetting: string;
}

export interface PagodaTimelineEntry {
  period: string;
  title: string;
  summary: string;
}

export interface PagodaHistoryArchive {
  originLegend: string;
  royalPatronage: string;
  architecturalProfile: string;
  keyFacts: Array<{ label: string; value: string }>;
  timeline: PagodaTimelineEntry[];
  gallery: PagodaGalleryPhoto[];
}

export interface Pagoda {
  id: string;
  slug: PagodaSlug;
  name: string;
  nameMy: string;
  location: string;
  region: string;
  summary: string;
  historicalSignificance: string;
  architecturalNotes: string;
  supportsDayNight: boolean;
  mapsSearchQuery?: string;
  pointsOfInterest: PagodaPointOfInterest[];
  updatedAt: string;
}

export interface BuddhistFigure {
  id: string;
  slug: string;
  name: string;
  nameMy?: string;
  era: string;
  titleOrRole: string;
  biography: string;
  historicalBackground: string;
  keyTeachings: string[];
  contributions: string[];
  verifiedQuotations: Array<{
    text: string;
    source: string;
  }>;
  portraitUrl?: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface DhammaContent {
  id: string;
  publishDate: string;
  quoteEn: string;
  quoteMy: string;
  explanationEn: string;
  explanationMy?: string;
  reflectionPrompt: string;
  sourceAttribution: string;
  isDailyFeatured: boolean;
}

export interface MeditationSession {
  id: string;
  userId: string;
  mode: 'guided' | 'silent';
  ambientSound: 'birds' | 'wind' | 'water' | 'bells' | 'none';
  durationMinutes: 5 | 10 | 15 | 30 | 60;
  completedSeconds: number;
  completedAt: string;
}

export interface PrayerSession {
  id: string;
  userId: string;
  prayerTitle: string;
  candleLit: boolean;
  incenseOffered: boolean;
  quietMode: boolean;
  durationSeconds: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface BeadProgress {
  id: string;
  userId: string;
  currentBead: number; // 0 to 108
  completedRounds: number;
  totalBeadsCounted: number;
  soundEnabled: boolean;
  updatedAt: string;
}

export interface FavoritePagoda {
  id: string;
  userId: string;
  pagodaId: string;
  createdAt: string;
}

export interface SavedDhamma {
  id: string;
  userId: string;
  dhammaId: string;
  personalNote?: string;
  createdAt: string;
}

export interface WebGLCapabilities {
  supported: boolean;
  isSoftwareRenderer: boolean;
  rendererName: string;
  recommendedTier: QualityTier;
}
