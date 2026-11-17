import { useEffect, useState } from 'react';
import { Bookmark, Globe } from 'lucide-react';
import { DHAMMA_CONTENTS_DATA } from '../data/dhammaData';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { practiceStorage } from '../utils/practiceStorage';
import type { DhammaContent } from '../types/sanctuary';

export default function DailyDhammaPage() {
  const { idToken } = useAuth();
  const { language, setLanguage } = useSanctuary();
  const t = getTranslations(language);

  const [dhammaList, setDhammaList] = useState<DhammaContent[]>(DHAMMA_CONTENTS_DATA);
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    practiceStorage.getSavedDhammaIds(),
  );
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;
    apiFetch<{
      dhamma: Array<{
        slug: string;
        publishDate: string;
        quoteEn: string;
        quoteMy: string;
        explanationEn: string;
        explanationMy?: string | null;
        reflectionPrompt: string;
        sourceAttribution: string;
        isDailyFeatured: boolean;
      }>;
    }>('/api/catalog')
      .then((res) => {
        if (cancelled || !res.dhamma?.length) return;
        setDhammaList(
          res.dhamma.map((d) => ({
            id: d.slug,
            publishDate: d.publishDate,
            quoteEn: d.quoteEn,
            quoteMy: d.quoteMy,
            explanationEn: d.explanationEn,
            explanationMy: d.explanationMy ?? undefined,
            reflectionPrompt: d.reflectionPrompt,
            sourceAttribution: d.sourceAttribution,
            isDailyFeatured: d.isDailyFeatured,
          })),
        );
      })
      .catch(() => {
        // Keep verified baseline dataset on network/catalog error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured =
    dhammaList.find((d) => d.isDailyFeatured) ?? dhammaList[0];
  const archive = dhammaList.filter((d) => d.id !== featured.id).filter((d) =>
    filterSavedOnly ? savedIds.includes(d.id) : true,
  );

  const handleToggleSave = (id: string) => {
    setSavedIds(practiceStorage.toggleSavedDhamma(id));
    if (idToken) {
      void apiFetch('/api/me/saved-dhamma', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({ slug: id }),
      }).catch((err) => console.error('Saved Dhamma sync error:', err));
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
            {t.dhamma.kicker}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-sanctuary-burgundy sm:text-5xl">
            {t.dhamma.title}
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
          className="inline-flex items-center gap-2 rounded-lg border border-sanctuary-brown/20 bg-sanctuary-parchment px-4 py-2 text-xs font-semibold text-sanctuary-burgundy hover:border-sanctuary-gold"
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          <span>{language === 'en' ? 'Primary: English (Show မြန်မာ)' : 'Primary: မြန်မာ (Show English)'}</span>
        </button>
      </div>

      {/* Featured Daily Dhamma Card */}
      <section className="mt-8 rounded-2xl border border-sanctuary-gold/35 bg-sanctuary-brown p-7 text-sanctuary-cream sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-sanctuary-gold-light">
          <span>
            {t.dhamma.featuredPrefix} · {featured.publishDate} · {featured.sourceAttribution}
          </span>
          <button
            type="button"
            onClick={() => handleToggleSave(featured.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              savedIds.includes(featured.id)
                ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                : 'border border-sanctuary-gold/35 text-sanctuary-cream hover:border-sanctuary-gold'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{savedIds.includes(featured.id) ? t.dhamma.saved : t.dhamma.saveTeaching}</span>
          </button>
        </div>

        <blockquote className="mt-5 font-display text-2xl leading-snug text-sanctuary-cream sm:text-3xl">
          “{language === 'my' ? featured.quoteMy : featured.quoteEn}”
        </blockquote>

        <p className="mt-4 font-myanmar text-sm leading-relaxed text-sanctuary-gold-light/90">
          {language === 'my' ? featured.quoteEn : featured.quoteMy}
        </p>

        <div className="mt-6 grid gap-6 border-t border-sanctuary-gold/20 pt-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
              {t.dhamma.meaningContext}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-sanctuary-parchment/90">
              {language === 'my' && featured.explanationMy
                ? featured.explanationMy
                : featured.explanationEn}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
              {t.dhamma.dailyReflection}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-sanctuary-parchment/90">
              {featured.reflectionPrompt}
            </p>
          </div>
        </div>
      </section>

      {/* Previous Teachings Archive */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sanctuary-brown/12 pb-3">
          <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
            {t.dhamma.archiveTitle}
          </h2>
          <div className="flex items-center gap-1 rounded-lg bg-sanctuary-parchment p-1">
            <button
              type="button"
              onClick={() => setFilterSavedOnly(false)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                !filterSavedOnly
                  ? 'bg-sanctuary-cream text-sanctuary-burgundy shadow-sm'
                  : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
              }`}
            >
              {t.dhamma.allTeachings}
            </button>
            <button
              type="button"
              onClick={() => setFilterSavedOnly(true)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filterSavedOnly
                  ? 'bg-sanctuary-cream text-sanctuary-burgundy shadow-sm'
                  : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
              }`}
            >
              {t.dhamma.savedFilter} ({savedIds.length})
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {archive.length === 0 ? (
            <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-8 text-center text-sm text-sanctuary-muted">
              {t.dhamma.emptySaved}
            </div>
          ) : (
            archive.map((item) => {
              const isSaved = savedIds.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sanctuary-muted">
                    <span>
                      {item.publishDate} · {item.sourceAttribution}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSave(item.id)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        isSaved
                          ? 'bg-sanctuary-gold/20 text-sanctuary-burgundy'
                          : 'text-sanctuary-muted hover:text-sanctuary-burgundy'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{isSaved ? t.dhamma.saved : t.dhamma.save}</span>
                    </button>
                  </div>

                  <p className="mt-3 font-display text-xl leading-snug text-sanctuary-charcoal">
                    “{language === 'my' ? item.quoteMy : item.quoteEn}”
                  </p>
                  <p className="mt-2 font-myanmar text-xs leading-relaxed text-sanctuary-muted">
                    {language === 'my' ? item.quoteEn : item.quoteMy}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
                    {language === 'my' && item.explanationMy ? item.explanationMy : item.explanationEn}
                  </p>
                </article>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
