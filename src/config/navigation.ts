export interface NavItem {
  label: string;
  to: string;
}

export interface DevelopmentPhase {
  phase: number;
  title: string;
  route: string;
  status: 'complete' | 'in-progress' | 'planned';
  summary: string;
}

export const ROUTES = {
  HOME: '/',
  PAGODAS: '/pagodas',
  PAGODA_DETAIL: '/pagodas/:slug',
  MEDITATION: '/meditation',
  PRAYER: '/prayer',
  MALA: '/mala',
  HERITAGE: '/heritage',
  DHAMMA: '/dhamma',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;

// Strictly 5 concise single-line links for the Top Bar Contract
export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Pagodas', to: ROUTES.PAGODAS },
  { label: 'Meditation', to: ROUTES.MEDITATION },
  { label: 'Prayer & Mala', to: ROUTES.PRAYER },
  { label: 'Heritage', to: ROUTES.HERITAGE },
  { label: 'Dhamma', to: ROUTES.DHAMMA },
];

export const DEVELOPMENT_ROADMAP: DevelopmentPhase[] = [
  {
    phase: 1,
    title: 'Project Setup & Architecture',
    route: ROUTES.HOME,
    status: 'complete',
    summary: 'Core React + TypeScript + Vite foundation, 3D stack dependencies, theme palette, routing shell, and WebGL capability detection.',
  },
  {
    phase: 2,
    title: 'Design System & Landing Page',
    route: ROUTES.HOME,
    status: 'complete',
    summary: 'Full-screen golden Myanmar pagoda hero, welcoming sanctuary narrative, featured pagodas showcase, and heritage introduction.',
  },
  {
    phase: 3,
    title: 'Authentication & Database',
    route: ROUTES.AUTH,
    status: 'complete',
    summary: 'PostgreSQL relational schema, role-based access control, user registration, login, password reset, and protected sessions.',
  },
  {
    phase: 4,
    title: 'Pagoda Map & Street View Exploration',
    route: ROUTES.PAGODAS,
    status: 'complete',
    summary: 'Google Maps Pegman Street View exploration for Shwedagon, Mahamuni, and Kyaiktiyo.',
  },
  {
    phase: 5,
    title: 'Meditation Room',
    route: ROUTES.MEDITATION,
    status: 'complete',
    summary: 'Animated sanctuary space, procedural Web Audio ambient soundscapes, breathing guide, 5–60 minute timers, and session persistence.',
  },
  {
    phase: 6,
    title: 'Prayer Room & Digital Mala',
    route: ROUTES.PRAYER,
    status: 'complete',
    summary: 'Respectful Buddhist altar with virtual candle/incense offerings, chanting audio, translations, and interactive 108-bead mala.',
  },
  {
    phase: 7,
    title: 'Buddhist Figures & Daily Dhamma',
    route: ROUTES.HERITAGE,
    status: 'complete',
    summary: 'Verified biographies and teachings of three revered Myanmar Buddhist figures alongside bilingual Daily Dhamma reflections.',
  },
  {
    phase: 8,
    title: 'User Dashboard',
    route: ROUTES.DASHBOARD,
    status: 'complete',
    summary: 'Personal practice journal tracking meditation minutes, prayer history, mala rounds, favorite pagodas, and saved Dhamma.',
  },
  {
    phase: 9,
    title: 'Admin Dashboard',
    route: ROUTES.ADMIN,
    status: 'complete',
    summary: 'Role-protected content management for pagodas, Buddhist figures, Dhamma teachings, users, and sanctuary usage metrics.',
  },
  {
    phase: 10,
    title: 'Responsive Optimization & Release',
    route: ROUTES.HOME,
    status: 'complete',
    summary: 'Mobile touch tuning, 3D asset and frame-rate profiling, accessibility audit, and final production build verification.',
  },
];
