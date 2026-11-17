import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, Landmark, Quote, Users } from 'lucide-react';
import { BUDDHIST_FIGURES_DATA } from '../data/figuresData';
import { PAGODAS_DATA } from '../data/pagodasData';
import { PagodaHistorySection } from '../components/pagodas/PagodaHistorySection';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations, PAGODA_TRANSLATIONS_MY } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import type { BuddhistFigure, PagodaSlug } from '../types/sanctuary';

type HeritageSection = 'figures' | 'pagodas';

export default function HeritageFiguresPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const isMy = language === 'my';

  const [figures, setFigures] = useState<BuddhistFigure[]>(BUDDHIST_FIGURES_DATA);
  const [selectedSlug, setSelectedSlug] = useState(BUDDHIST_FIGURES_DATA[0].slug);
  const [section, setSection] = useState<HeritageSection>(() =>
    searchParams.get('section') === 'pagodas' ? 'pagodas' : 'figures',
  );
  const [selectedPagodaSlug, setSelectedPagodaSlug] = useState<PagodaSlug>('shwedagon');

  useEffect(() => {
    if (searchParams.get('section') === 'pagodas') {
      setSection('pagodas');
    }
  }, [searchParams]);

  const handleSectionChange = (next: HeritageSection) => {
    setSection(next);
    if (next === 'pagodas') {
      setSearchParams({ section: 'pagodas' }, { replace: true });
    } else if (searchParams.has('section')) {
      setSearchParams({}, { replace: true });
    }
  };

  useEffect(() => {
    let cancelled = false;
    apiFetch<{
      figures: Array<{
        id: number;
        slug: string;
        name: string;
        nameMy: string | null;
        era: string;
        titleOrRole: string;
        biography: string;
        historicalBackground: string;
        keyTeachingsJson: string[];
        contributionsJson: string[];
        verifiedQuotationsJson: Array<{ text: string; source: string }>;
        displayOrder: number;
        isActive: boolean;
      }>;
    }>('/api/catalog')
      .then((res) => {
        if (cancelled || !res.figures?.length) return;
        const mapped: BuddhistFigure[] = res.figures.map((f) => ({
          id: String(f.id),
          slug: f.slug,
          name: f.name,
          nameMy: f.nameMy ?? undefined,
          era: f.era,
          titleOrRole: f.titleOrRole,
          biography: f.biography,
          historicalBackground: f.historicalBackground,
          keyTeachings: Array.isArray(f.keyTeachingsJson) ? f.keyTeachingsJson : [],
          contributions: Array.isArray(f.contributionsJson) ? f.contributionsJson : [],
          verifiedQuotations: Array.isArray(f.verifiedQuotationsJson)
            ? f.verifiedQuotationsJson
            : [],
          displayOrder: f.displayOrder,
          isActive: f.isActive,
        }));
        setFigures(mapped);
        setSelectedSlug((prev) =>
          mapped.some((m) => m.slug === prev) ? prev : mapped[0].slug,
        );
      })
      .catch(() => {
        // Keep verified baseline figures
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeFigure =
    figures.find((f) => f.slug === selectedSlug) ?? figures[0];
  const activePagoda =
    PAGODAS_DATA.find((p) => p.slug === selectedPagodaSlug) ?? PAGODAS_DATA[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
            {t.heritage.kicker}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-sanctuary-burgundy sm:text-5xl">
            {section === 'figures'
              ? t.heritage.titleFigures
              : t.heritage.titlePagodas}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-sanctuary-muted">
            {section === 'figures'
              ? t.heritage.descFigures
              : t.heritage.descPagodas}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Heritage archive section"
          className="inline-flex self-start rounded-lg border border-sanctuary-brown/15 bg-sanctuary-parchment/70 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={section === 'figures'}
            onClick={() => handleSectionChange('figures')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              section === 'figures'
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-charcoal hover:bg-sanctuary-cream'
            }`}
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.heritage.tabFigures}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={section === 'pagodas'}
            onClick={() => handleSectionChange('pagodas')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
              section === 'pagodas'
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-charcoal hover:bg-sanctuary-cream'
            }`}
          >
            <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.heritage.tabPagodas}</span>
          </button>
        </div>
      </div>

      {section === 'pagodas' ? (
        <div className="mt-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {PAGODAS_DATA.map((pagoda, idx) => {
              const isSelected = pagoda.slug === selectedPagodaSlug;
              const myText = PAGODA_TRANSLATIONS_MY[pagoda.slug];
              return (
                <button
                  key={pagoda.id}
                  type="button"
                  onClick={() => setSelectedPagodaSlug(pagoda.slug)}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    isSelected
                      ? 'border-sanctuary-gold bg-sanctuary-burgundy text-sanctuary-cream'
                      : 'border-sanctuary-brown/12 bg-sanctuary-parchment/50 text-sanctuary-charcoal hover:border-sanctuary-gold/60'
                  }`}
                >
                  <p
                    className={`text-xs font-medium ${
                      isSelected ? 'text-sanctuary-gold-light' : 'text-sanctuary-saffron'
                    }`}
                  >
                    0{idx + 1}. {isMy ? myText.location : pagoda.location}
                  </p>
                  <h2 className="mt-1.5 font-display text-xl font-semibold">
                    {isMy ? myText.name : pagoda.name.split('(')[0].trim()}
                  </h2>
                  <p
                    className={`mt-1 font-myanmar text-xs ${
                      isSelected ? 'text-sanctuary-parchment/85' : 'text-sanctuary-muted'
                    }`}
                  >
                    {isMy ? pagoda.name : pagoda.nameMy}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <PagodaHistorySection pagoda={activePagoda} variant="editorial" />
          </div>
        </div>
      ) : (
        <>
          {/* Figure Selection Tabs */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {figures.map((figure, idx) => {
              const isSelected = figure.slug === activeFigure.slug;
              return (
                <button
                  key={figure.id}
                  type="button"
                  onClick={() => setSelectedSlug(figure.slug)}
                  className={`rounded-xl border p-5 text-left transition-colors ${
                    isSelected
                      ? 'border-sanctuary-gold bg-sanctuary-burgundy text-sanctuary-cream'
                      : 'border-sanctuary-brown/12 bg-sanctuary-parchment/50 text-sanctuary-charcoal hover:border-sanctuary-gold/60'
                  }`}
                >
                  <p
                    className={`text-xs font-medium ${
                      isSelected ? 'text-sanctuary-gold-light' : 'text-sanctuary-saffron'
                    }`}
                  >
                    0{idx + 1}. {figure.era}
                  </p>
                  <h2 className="mt-1.5 font-display text-xl font-semibold">
                    {isMy && figure.nameMy
                      ? figure.nameMy
                      : figure.name.split('(')[0].trim()}
                  </h2>
                  {figure.nameMy && (
                    <p
                      className={`mt-1 font-myanmar text-xs ${
                        isSelected ? 'text-sanctuary-parchment/85' : 'text-sanctuary-muted'
                      }`}
                    >
                      {isMy ? figure.name.split('(')[0].trim() : figure.nameMy}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Figure Monograph */}
          <article className="mt-8 rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/45 p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="flex flex-col items-center justify-center rounded-xl border border-sanctuary-gold/35 bg-sanctuary-brown p-8 text-center text-sanctuary-cream">
                  <svg viewBox="0 0 120 120" className="h-24 w-24" aria-hidden="true">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#c99a32" strokeWidth="1.5" strokeOpacity="0.6" />
                    <circle cx="60" cy="60" r="44" fill="none" stroke="#c99a32" strokeWidth="0.8" strokeOpacity="0.35" />
                    <circle cx="60" cy="60" r="26" fill="none" stroke="#e5c36c" strokeWidth="2.2" />
                    <circle cx="60" cy="60" r="6" fill="#e5c36c" />
                    {Array.from({ length: 8 }).map((_, i) => {
                      const angle = (i * Math.PI) / 4;
                      return (
                        <line
                          key={i}
                          x1="60"
                          y1="60"
                          x2={60 + Math.cos(angle) * 26}
                          y2={60 + Math.sin(angle) * 26}
                          stroke="#e5c36c"
                          strokeWidth="1.6"
                        />
                      );
                    })}
                  </svg>
                  <p className="mt-5 font-display text-2xl font-semibold text-sanctuary-cream">
                    {isMy && activeFigure.nameMy ? activeFigure.nameMy : activeFigure.name}
                  </p>
                  {activeFigure.nameMy && (
                    <p className="mt-1 font-myanmar text-xs text-sanctuary-gold-light">
                      {isMy ? activeFigure.name : activeFigure.nameMy}
                    </p>
                  )}
                  <p className="mt-3 text-xs font-medium text-sanctuary-parchment/80">
                    {activeFigure.titleOrRole} · {activeFigure.era}
                  </p>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                    {t.heritage.bioTitle}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-sanctuary-charcoal">
                    {activeFigure.biography}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
                    {activeFigure.historicalBackground}
                  </p>
                </div>

                <div className="grid gap-6 border-t border-sanctuary-brown/12 pt-6 sm:grid-cols-2">
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.heritage.teachingsTitle}</span>
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sanctuary-charcoal">
                      {activeFigure.keyTeachings.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sanctuary-gold" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
                      {t.heritage.contributionsTitle}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sanctuary-charcoal">
                      {activeFigure.contributions.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sanctuary-burgundy" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 border-t border-sanctuary-brown/12 pt-6">
                  <h4 className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
                    {t.heritage.quotesTitle}
                  </h4>
                  {activeFigure.verifiedQuotations.map((quote) => (
                    <blockquote
                      key={quote.source}
                      className="rounded-xl border border-sanctuary-brown/10 bg-sanctuary-cream p-5"
                    >
                      <Quote className="h-4 w-4 text-sanctuary-gold-dark" aria-hidden="true" />
                      <p className="mt-2 font-display text-xl leading-snug text-sanctuary-charcoal">
                        “{quote.text}”
                      </p>
                      <footer className="mt-2.5 text-xs font-medium text-sanctuary-muted">
                        {t.heritage.sourceLabel}: {quote.source}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </div>
  );
}
