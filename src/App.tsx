import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { TopNav } from './components/layout/TopNav';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LoadingState } from './components/ui/LoadingState';
import { ROUTES } from './config/navigation';
import { AuthProvider } from './context/AuthContext';
import { SanctuaryProvider } from './context/SanctuaryContext';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const PagodaSelectionPage = lazy(() => import('./pages/PagodaSelectionPage'));
const PagodaExplorerPage = lazy(() => import('./pages/PagodaExplorerPage'));
const MeditationRoomPage = lazy(() => import('./pages/MeditationRoomPage'));
const PrayerRoomPage = lazy(() => import('./pages/PrayerRoomPage'));
const HeritageFiguresPage = lazy(() => import('./pages/HeritageFiguresPage'));
const DailyDhammaPage = lazy(() => import('./pages/DailyDhammaPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  return (
    <ErrorBoundary fallbackTitle="Virtual Myanmar Buddhist Sanctuary encountered an error">
      <SanctuaryProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="flex min-h-screen flex-col bg-sanctuary-cream text-sanctuary-charcoal">
              {mapsQuotaExceeded && (
                <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-xs text-amber-900 shadow-sm md:text-sm">
                  <span>
                    Google Maps Platform quota reached. If you are the app owner, visit{' '}
                    <a
                      href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-amber-950 underline hover:text-amber-800"
                    >
                      maps developer site
                    </a>{' '}
                    for instructions to update your account.
                  </span>
                </div>
              )}
              <TopNav />
              <main className="flex-1">
                <Suspense fallback={<LoadingState />}>
                  <Routes>
                    <Route path={ROUTES.HOME} element={<LandingPage />} />
                    <Route path={ROUTES.PAGODAS} element={<PagodaSelectionPage />} />
                    <Route path={ROUTES.PAGODA_DETAIL} element={<PagodaExplorerPage />} />
                    <Route path={ROUTES.MEDITATION} element={<MeditationRoomPage />} />
                    <Route path={ROUTES.PRAYER} element={<PrayerRoomPage initialTab="altar" />} />
                    <Route path={ROUTES.MALA} element={<PrayerRoomPage initialTab="mala" />} />
                    <Route path={ROUTES.HERITAGE} element={<HeritageFiguresPage />} />
                    <Route path={ROUTES.DHAMMA} element={<DailyDhammaPage />} />
                    <Route path={ROUTES.AUTH} element={<AuthPage />} />
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                    <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
                    <Route path="*" element={<LandingPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </SanctuaryProvider>
    </ErrorBoundary>
  );
}
