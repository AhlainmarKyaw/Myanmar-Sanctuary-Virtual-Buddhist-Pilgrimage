import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  Map as MapIcon,
  X,
} from 'lucide-react';
import { ROUTES } from '../config/navigation';
import { PAGODA_TOUR_MEDIA, PAGODAS_DATA } from '../data/pagodasData';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations, PAGODA_TRANSLATIONS_MY } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { PagodaHistorySection } from '../components/pagodas/PagodaHistorySection';
import { PagodaStreetViewExperience } from '../components/pagodas/PagodaStreetViewExperience';
import { practiceStorage } from '../utils/practiceStorage';
import type { PagodaPointOfInterest } from '../types/sanctuary';

type ExplorerMode = 'split' | 'streetview' | 'history';

export default function PagodaExplorerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { idToken } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const isMy = language === 'my';

  const pagoda = useMemo(
    () => PAGODAS_DATA.find((p) => p.slug === slug) ?? PAGODAS_DATA[0],
    [slug],
  );
  const tourMedia = PAGODA_TOUR_MEDIA[pagoda.slug];
  const myText = PAGODA_TRANSLATIONS_MY[pagoda.slug];

  const initialTabParam = searchParams.get('tab');
  const [mode, setMode] = useState<ExplorerMode>(() =>
    initialTabParam === 'history' ? 'history' : 'split',
  );
  const [selectedPoi, setSelectedPoi] = useState<PagodaPointOfInterest | null>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() =>
    practiceStorage.getFavoritePagodas().includes(pagoda.slug),
  );

  // Sync mode when query param changes
  useEffect(() => {
    if (searchParams.get('tab') === 'history') {
      setMode('history');
    }
  }, [searchParams]);

  const handleModeChange = (nextMode: ExplorerMode) => {
    setMode(nextMode);
    if (nextMode === 'history') {
      setSearchParams({ tab: 'history' }, { replace: true });
    } else if (searchParams.has('tab')) {
      setSearchParams({}, { replace: true });
    }
  };

  // Record visit & reset selections when pagoda changes
  useEffect(() => {
    practiceStorage.recordPagodaVisit(pagoda.slug);
    if (idToken) {
      void apiFetch('/api/me/pagoda-visit', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({ slug: pagoda.slug }),
      }).catch((err) => console.error('Pagoda visit sync error:', err));
    }
    setSelectedPoi(null);
    setIsFavorite(practiceStorage.getFavoritePagodas().includes(pagoda.slug));
  }, [pagoda.slug, idToken]);

  // Keyboard 'H' shortcut to toggle bottom Historical Highlights bar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h' && !(e.target instanceof HTMLInputElement)) {
        setControlsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSelectPoi = useCallback((poi: PagodaPointOfInterest) => {
    setSelectedPoi((prev) => (prev?.id === poi.id ? null : poi));
  }, []);

  const handleToggleFavorite = () => {
    const next = practiceStorage.toggleFavoritePagoda(pagoda.slug);
    setIsFavorite(next.includes(pagoda.slug));
    if (idToken) {
      void apiFetch('/api/me/favorite-pagoda', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({ slug: pagoda.slug }),
      }).catch((err) => console.error('Favorite pagoda sync error:', err));
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-65px)] min-h-[640px] w-full flex-col overflow-hidden bg-sanctuary-lacquer text-sanctuary-cream">
      {/* Dedicated Non-Overlapping Explorer Header */}
      <header className="z-20 flex flex-wrap items-center justify-between gap-3 border-b border-sanctuary-gold/25 bg-sanctuary-lacquer px-4 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={ROUTES.PAGODAS}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sanctuary-gold-light hover:text-sanctuary-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.pagodas.allPagodas}</span>
          </Link>
          <span className="text-sanctuary-gold/40" aria-hidden="true">
            |
          </span>
          <div>
            <h1 className="font-display text-lg leading-tight font-semibold text-sanctuary-cream sm:text-xl">
              {isMy ? myText.name : pagoda.name}
            </h1>
            <p className="font-myanmar text-xs text-sanctuary-gold-light">
              {isMy ? pagoda.name : pagoda.nameMy}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher: Map+StreetView, Full 360° Walk, or History & Photos */}
          <div
            role="tablist"
            aria-label="Pagoda exploration mode"
            className="inline-flex rounded-lg border border-sanctuary-gold/30 bg-sanctuary-brown p-0.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'split'}
              onClick={() => handleModeChange('split')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                mode === 'split'
                  ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                  : 'text-sanctuary-parchment hover:text-sanctuary-cream'
              }`}
            >
              <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.pagodas.mapAndStreetView}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'streetview'}
              onClick={() => handleModeChange('streetview')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                mode === 'streetview'
                  ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                  : 'text-sanctuary-parchment hover:text-sanctuary-cream'
              }`}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.pagodas.walk360}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'history'}
              onClick={() => handleModeChange('history')}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                mode === 'history'
                  ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                  : 'text-sanctuary-parchment hover:text-sanctuary-cream'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.pagodas.historyAndPhotos}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              isFavorite
                ? 'border-sanctuary-gold bg-sanctuary-gold text-sanctuary-lacquer'
                : 'border-sanctuary-gold/30 bg-sanctuary-brown text-sanctuary-cream hover:border-sanctuary-gold'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isFavorite ? t.pagodas.favorited : t.pagodas.favorite}</span>
          </button>
        </div>
      </header>

      {/* Main Viewport: Google Maps + Pegman Street View OR Pagoda History Archive */}
      <div className="relative min-h-0 flex-1">
        {mode === 'history' ? (
          <div className="h-full overflow-y-auto bg-sanctuary-cream">
            <PagodaHistorySection
              pagoda={pagoda}
              variant="explorer"
              onExploreMap={() => handleModeChange('split')}
            />
          </div>
        ) : (
          <PagodaStreetViewExperience
            pagoda={pagoda}
            tourMedia={tourMedia}
            viewMode={mode}
          />
        )}

        {/* Selected Point of Interest Information Drawer */}
        {mode !== 'history' && selectedPoi && (
          <aside
            aria-label="Sacred Point of Interest Information"
            className="absolute right-4 bottom-20 left-4 z-20 mx-auto max-w-lg rounded-xl border border-sanctuary-gold/35 bg-sanctuary-lacquer/95 p-5 shadow-xl sm:right-6 sm:left-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {selectedPoi.historicalPeriod && (
                  <p className="text-xs font-medium text-sanctuary-gold-light">
                    {selectedPoi.historicalPeriod}
                  </p>
                )}
                <h2 className="mt-1 font-display text-2xl font-semibold text-sanctuary-cream">
                  {isMy && selectedPoi.titleMy ? selectedPoi.titleMy : selectedPoi.title}
                </h2>
                {selectedPoi.titleMy && (
                  <p className="mt-0.5 font-myanmar text-xs text-sanctuary-gold-light/90">
                    {isMy ? selectedPoi.title : selectedPoi.titleMy}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoi(null)}
                aria-label="Close information panel"
                className="rounded-lg p-1.5 text-sanctuary-parchment/80 hover:bg-sanctuary-cream/10 hover:text-sanctuary-cream"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-sanctuary-parchment/90">
              {selectedPoi.description}
            </p>
          </aside>
        )}

        {/* Collapsible Sacred Highlights Dock */}
        {mode !== 'history' && (
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex flex-col items-center px-3">
            <button
              type="button"
              onClick={() => setControlsCollapsed((prev) => !prev)}
              className="pointer-events-auto mb-1 inline-flex items-center gap-1.5 rounded-t-lg border border-b-0 border-sanctuary-gold/30 bg-sanctuary-lacquer/95 px-3 py-1 text-[11px] font-medium text-sanctuary-gold-light hover:text-sanctuary-cream"
            >
              {controlsCollapsed ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.pagodas.showHighlights}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.pagodas.hideHighlights}</span>
                </>
              )}
            </button>

            {!controlsCollapsed && (
              <div className="pointer-events-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 rounded-xl border border-sanctuary-gold/30 bg-sanctuary-lacquer/95 px-4 py-2.5 shadow-lg">
                <span className="text-xs font-medium text-sanctuary-gold-light">
                  {t.pagodas.sacredHighlights}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {pagoda.pointsOfInterest.map((poi) => (
                    <button
                      key={poi.id}
                      type="button"
                      onClick={() => handleSelectPoi(poi)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedPoi?.id === poi.id
                          ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                          : 'bg-sanctuary-brown text-sanctuary-parchment hover:bg-sanctuary-burgundy'
                      }`}
                    >
                      {isMy && poi.titleMy ? poi.titleMy : poi.title.split('&')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
