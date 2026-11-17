import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Expand, Map as MapIcon, X } from 'lucide-react';
import { PAGODA_HISTORY_ARCHIVE } from '../../data/pagodasData';
import { useSanctuary } from '../../context/SanctuaryContext';
import { getTranslations, PAGODA_TRANSLATIONS_MY } from '../../i18n/translations';
import { ResilientImage } from '../ui/ResilientImage';
import type { Pagoda } from '../../types/sanctuary';

interface PagodaHistorySectionProps {
  pagoda: Pagoda;
  variant?: 'editorial' | 'explorer';
  onExploreMap?: () => void;
}

export function PagodaHistorySection({
  pagoda,
  variant = 'editorial',
  onExploreMap,
}: PagodaHistorySectionProps) {
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const archive = PAGODA_HISTORY_ARCHIVE[pagoda.slug];
  const myArchive = PAGODA_TRANSLATIONS_MY[pagoda.slug];
  const isMy = language === 'my';

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [pagoda.slug]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % archive.gallery.length,
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + archive.gallery.length) % archive.gallery.length,
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, archive.gallery.length]);

  const isExplorer = variant === 'explorer';
  const activePhoto =
    lightboxIndex !== null ? archive.gallery[lightboxIndex] : null;

  const displayFacts = isMy ? myArchive.keyFacts : archive.keyFacts;
  const displayTimeline = isMy ? myArchive.timeline : archive.timeline;

  return (
    <section
      aria-label={`${pagoda.name} history and photograph archive`}
      className={
        isExplorer
          ? 'mx-auto max-w-6xl px-4 py-8 text-sanctuary-charcoal sm:px-6 sm:py-10'
          : ''
      }
    >
      <div
        className={`rounded-2xl border p-6 sm:p-10 ${
          isExplorer
            ? 'border-sanctuary-gold/30 bg-sanctuary-cream'
            : 'border-sanctuary-brown/12 bg-sanctuary-parchment/45'
        }`}
      >
        {/* Header & Primary Action */}
        <div className="flex flex-col justify-between gap-4 border-b border-sanctuary-brown/12 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
              {t.history.kickerPrefix} · {isMy ? myArchive.location : pagoda.location}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
              {isMy ? myArchive.name : pagoda.name}
            </h2>
            <p className="mt-1 font-myanmar text-sm text-sanctuary-saffron">
              {isMy ? pagoda.name : pagoda.nameMy}
            </p>
          </div>

          {onExploreMap ? (
            <button
              type="button"
              onClick={onExploreMap}
              className="inline-flex items-center gap-2 self-start rounded-lg bg-sanctuary-burgundy px-4 py-2.5 text-sm font-medium text-sanctuary-cream whitespace-nowrap shrink-0 transition-colors hover:bg-sanctuary-burgundy-deep"
            >
              <MapIcon className="h-4 w-4" aria-hidden="true" />
              <span>{t.history.walkInMap}</span>
            </button>
          ) : (
            <Link
              to={`/pagodas/${pagoda.slug}`}
              className="inline-flex items-center gap-2 self-start rounded-lg bg-sanctuary-burgundy px-4 py-2.5 text-sm font-medium text-sanctuary-cream whitespace-nowrap shrink-0 transition-colors hover:bg-sanctuary-burgundy-deep"
            >
              <span>{t.history.walkInMap}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Photographic Gallery Grid */}
        <div className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
              {t.history.archivalPhotos}
            </h3>
            <span className="text-xs text-sanctuary-muted">
              {t.history.inspectHint}
            </span>
          </div>

          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {archive.gallery.map((photo, index) => (
              <figure key={photo.src} className="group flex flex-col">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Inspect ${photo.alt}`}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-sanctuary-brown/12 bg-sanctuary-brown text-left"
                >
                  <ResilientImage
                    src={photo.src}
                    alt={photo.alt}
                    fallbackLabel={pagoda.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-md bg-sanctuary-lacquer/80 px-2.5 py-1 text-[11px] font-medium text-sanctuary-cream opacity-90 transition-opacity group-hover:opacity-100">
                    <Expand className="h-3 w-3" aria-hidden="true" />
                    <span>{t.history.enlarge}</span>
                  </span>
                </button>
                <figcaption className="mt-2.5 font-display text-sm leading-snug text-sanctuary-charcoal italic">
                  {isMy ? (myArchive.galleryCaptions[index] ?? photo.caption) : photo.caption}
                </figcaption>
                <span className="mt-0.5 text-xs text-sanctuary-muted">
                  {isMy ? (myArchive.gallerySettings[index] ?? photo.eraOrSetting) : photo.eraOrSetting}
                </span>
              </figure>
            ))}
          </div>
        </div>

        {/* Key Historical Facts Strip */}
        <dl className="mt-8 grid gap-4 border-y border-sanctuary-brown/12 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {displayFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium text-sanctuary-saffron">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-sanctuary-charcoal">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Narrative Chronicle + Timeline */}
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div>
              <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                {t.history.originTitle}
              </h3>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-sanctuary-charcoal">
                {isMy ? myArchive.originLegend : archive.originLegend}
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                {t.history.patronageTitle}
              </h3>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-sanctuary-charcoal">
                {isMy ? myArchive.royalPatronage : archive.royalPatronage}
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                {t.history.architectureTitle}
              </h3>
              <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-sanctuary-muted">
                {isMy ? myArchive.architecturalProfile : archive.architecturalProfile}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
              {t.history.timelineTitle}
            </h3>
            <ol className="mt-4 divide-y divide-sanctuary-brown/12 rounded-xl border border-sanctuary-brown/12 bg-sanctuary-cream">
              {displayTimeline.map((entry, idx) => (
                <li key={entry.title} className="p-4 sm:p-5">
                  <p className="text-xs font-medium text-sanctuary-saffron">
                    0{idx + 1} · {entry.period}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-semibold text-sanctuary-burgundy">
                    {entry.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-sanctuary-muted">
                    {entry.summary}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sanctuary-lacquer/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-sanctuary-gold/35 bg-sanctuary-lacquer p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 text-sanctuary-cream">
              <p className="text-xs font-medium text-sanctuary-gold-light">
                {isMy ? myArchive.name : pagoda.name} ·{' '}
                {t.history.photoCounter(lightboxIndex + 1, archive.gallery.length)}
              </p>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close photograph viewer"
                className="rounded-lg p-1.5 text-sanctuary-parchment hover:bg-sanctuary-cream/10 hover:text-sanctuary-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-sanctuary-brown">
              <ResilientImage
                src={activePhoto.src}
                alt={activePhoto.alt}
                fallbackLabel={pagoda.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-base text-sanctuary-cream italic">
                  {isMy
                    ? (myArchive.galleryCaptions[lightboxIndex] ?? activePhoto.caption)
                    : activePhoto.caption}
                </p>
                <p className="mt-0.5 text-xs text-sanctuary-gold-light">
                  {isMy
                    ? (myArchive.gallerySettings[lightboxIndex] ?? activePhoto.eraOrSetting)
                    : activePhoto.eraOrSetting}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex - 1 + archive.gallery.length) %
                        archive.gallery.length,
                    )
                  }
                  aria-label="Previous photograph"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sanctuary-gold/35 text-sanctuary-cream hover:bg-sanctuary-cream/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex + 1) % archive.gallery.length)
                  }
                  aria-label="Next photograph"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sanctuary-gold/35 text-sanctuary-cream hover:bg-sanctuary-cream/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
