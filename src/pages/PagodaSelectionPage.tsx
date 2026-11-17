import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, BookOpen, MapPin } from 'lucide-react';
import { PAGODA_IMAGES, PAGODAS_DATA } from '../data/pagodasData';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations, PAGODA_TRANSLATIONS_MY } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { PagodaHistorySection } from '../components/pagodas/PagodaHistorySection';
import { ResilientImage } from '../components/ui/ResilientImage';
import { practiceStorage } from '../utils/practiceStorage';
import type { PagodaSlug } from '../types/sanctuary';

export default function PagodaSelectionPage() {
  const { idToken } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const isMy = language === 'my';

  const [favorites, setFavorites] = useState<PagodaSlug[]>(() =>
    practiceStorage.getFavoritePagodas(),
  );
  const [selectedHistorySlug, setSelectedHistorySlug] = useState<PagodaSlug>('shwedagon');

  const handleToggleFavorite = (slug: PagodaSlug) => {
    setFavorites(practiceStorage.toggleFavoritePagoda(slug));
    if (idToken) {
      void apiFetch('/api/me/favorite-pagoda', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({ slug }),
      }).catch((err) => console.error('Favorite sync error:', err));
    }
  };

  const activeHistoryPagoda =
    PAGODAS_DATA.find((p) => p.slug === selectedHistorySlug) ?? PAGODAS_DATA[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
          {t.pagodas.kicker}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-sanctuary-burgundy sm:text-5xl">
          {t.pagodas.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-sanctuary-muted">
          {t.pagodas.subtitle}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {PAGODAS_DATA.map((pagoda) => {
          const isFav = favorites.includes(pagoda.slug);
          const myText = PAGODA_TRANSLATIONS_MY[pagoda.slug];
          return (
            <article
              key={pagoda.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/45"
            >
              <div className="aspect-[4/3] overflow-hidden bg-sanctuary-brown">
                <ResilientImage
                  src={PAGODA_IMAGES[pagoda.slug]}
                  alt={`${pagoda.name} in ${pagoda.location}`}
                  fallbackLabel={pagoda.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3 text-xs text-sanctuary-muted">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-sanctuary-saffron" aria-hidden="true" />
                    <span>{isMy ? myText.location : pagoda.location}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleFavorite(pagoda.slug)}
                    aria-label={
                      isFav
                        ? `Remove ${pagoda.name} from favorites`
                        : `Save ${pagoda.name} to favorites`
                    }
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                      isFav
                        ? 'bg-sanctuary-gold/20 text-sanctuary-burgundy'
                        : 'text-sanctuary-muted hover:text-sanctuary-burgundy'
                    }`}
                  >
                    <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{isFav ? t.pagodas.saved : t.pagodas.save}</span>
                  </button>
                </div>

                <h2 className="mt-2 font-display text-2xl font-semibold text-sanctuary-burgundy">
                  {isMy ? myText.name : pagoda.name}
                </h2>
                <p className="mt-0.5 font-myanmar text-sm text-sanctuary-saffron">
                  {isMy ? pagoda.name : pagoda.nameMy}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-sanctuary-muted">
                  {isMy ? myText.historicalSignificance : pagoda.historicalSignificance}
                </p>

                <div className="mt-5 border-t border-sanctuary-brown/10 pt-4 text-xs text-sanctuary-muted">
                  {t.pagodas.highlightsMeta} · {pagoda.pointsOfInterest.length}{' '}
                  {t.landing.pointsOfInterest}
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    to={`/pagodas/${pagoda.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream transition-colors hover:bg-sanctuary-burgundy-deep"
                  >
                    <span>{t.pagodas.visitInPerson}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to={`/pagodas/${pagoda.slug}?tab=history`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-4 py-2 text-xs font-medium text-sanctuary-burgundy transition-colors hover:border-sanctuary-gold"
                  >
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.pagodas.readHistoryPhotos}</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Dedicated Pagodas History & Visual Archive */}
      <div id="pagodas-history" className="mt-16 border-t border-sanctuary-brown/12 pt-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
              {t.pagodas.archiveKicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
              {t.pagodas.archiveTitle}
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Select pagoda history"
            className="inline-flex flex-wrap gap-1 rounded-lg border border-sanctuary-brown/15 bg-sanctuary-parchment/70 p-1"
          >
            {PAGODAS_DATA.map((p) => {
              const active = p.slug === selectedHistorySlug;
              const label = isMy
                ? PAGODA_TRANSLATIONS_MY[p.slug].name
                : p.name.split('(')[0].trim();
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedHistorySlug(p.slug)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                      : 'text-sanctuary-charcoal hover:bg-sanctuary-cream'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <PagodaHistorySection pagoda={activeHistoryPagoda} variant="editorial" />
        </div>
      </div>
    </div>
  );
}
