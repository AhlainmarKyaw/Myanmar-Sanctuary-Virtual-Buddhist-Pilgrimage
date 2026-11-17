import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Compass, Flame, Sparkles } from 'lucide-react';
import { ROUTES } from '../config/navigation';
import { PAGODA_IMAGES, PAGODAS_DATA } from '../data/pagodasData';
import { DHAMMA_CONTENTS_DATA } from '../data/dhammaData';
import { ResilientImage } from '../components/ui/ResilientImage';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations, PAGODA_TRANSLATIONS_MY } from '../i18n/translations';

const HERO_IMAGE = '/src/assets/images/hero_shwedagon_sanctuary_1794906334149.jpg';
const HERITAGE_IMAGE = '/src/assets/images/heritage_myanmar_courtyard_1794906334224.jpg';

export default function LandingPage() {
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const featuredDhamma = DHAMMA_CONTENTS_DATA[0];

  return (
    <div className="bg-sanctuary-cream text-sanctuary-charcoal">
      {/* Full-Screen Golden Pagoda Hero */}
      <section className="relative flex min-h-[calc(100vh-65px)] items-end overflow-hidden bg-sanctuary-lacquer">
        <div className="absolute inset-0">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Shwedagon Pagoda illuminated in golden hour light"
            fallbackLabel="Shwedagon Golden Sanctuary"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-sanctuary-lacquer/95 via-sanctuary-lacquer/55 to-sanctuary-lacquer/25"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium tracking-[0.18em] text-sanctuary-gold-light uppercase">
              {t.landing.heroKicker}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-sanctuary-cream sm:text-6xl">
              {t.landing.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-sanctuary-parchment/90 sm:text-lg">
              {t.landing.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={ROUTES.PAGODAS}
                className="inline-flex items-center gap-2.5 rounded-lg bg-sanctuary-gold px-6 py-3 text-sm font-semibold text-sanctuary-lacquer transition-colors hover:bg-sanctuary-gold-light"
              >
                <span>{t.landing.enterSanctuary}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={ROUTES.MEDITATION}
                className="inline-flex items-center gap-2 rounded-lg border border-sanctuary-cream/30 bg-sanctuary-lacquer/45 px-5 py-3 text-sm font-medium text-sanctuary-cream transition-colors hover:border-sanctuary-gold-light/60 hover:bg-sanctuary-lacquer/70"
              >
                <span>{t.landing.beginMeditation}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Purpose & Sanctuary Ethos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 border-b border-sanctuary-brown/12 pb-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
              {t.landing.purposeKicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
              {t.landing.purposeTitle}
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-sanctuary-muted lg:col-span-7">
            <p>{t.landing.purposeP1}</p>
            <p>{t.landing.purposeP2}</p>
          </div>
        </div>

        {/* Featured Pagodas */}
        <div className="pt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
                {t.landing.pagodasKicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
                {t.landing.pagodasTitle}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to={`${ROUTES.HERITAGE}?section=pagodas`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-sanctuary-muted hover:text-sanctuary-burgundy"
              >
                <span>{t.landing.readPagodaHistories}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to={ROUTES.PAGODAS}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
              >
                <span>{t.landing.viewAllTours}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PAGODAS_DATA.map((pagoda) => {
              const myText = PAGODA_TRANSLATIONS_MY[pagoda.slug];
              return (
                <Link
                  key={pagoda.id}
                  to={`/pagodas/${pagoda.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/45 transition-colors hover:border-sanctuary-gold/60 hover:bg-sanctuary-parchment/80"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-sanctuary-brown">
                    <ResilientImage
                      src={PAGODA_IMAGES[pagoda.slug]}
                      alt={`${pagoda.name} in ${pagoda.location}`}
                      fallbackLabel={pagoda.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-sanctuary-muted">
                      {language === 'my' ? myText.location : pagoda.location} ·{' '}
                      {pagoda.pointsOfInterest.length} {t.landing.pointsOfInterest}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-sanctuary-burgundy">
                      {language === 'my' ? myText.name : pagoda.name}
                    </h3>
                    <p className="mt-0.5 font-myanmar text-sm text-sanctuary-saffron">
                      {language === 'my' ? pagoda.name : pagoda.nameMy}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-sanctuary-muted">
                      {language === 'my' ? myText.summary : pagoda.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy group-hover:text-sanctuary-gold-dark">
                      <span>{t.landing.walkMapStreetView}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meditation, Prayer & Digital Mala Practices */}
      <section className="border-y border-sanctuary-brown/12 bg-sanctuary-parchment/55">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
              {t.landing.mindfulnessKicker}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
              {t.landing.mindfulnessTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="flex flex-col justify-between rounded-xl border border-sanctuary-brown/12 bg-sanctuary-cream p-7">
              <div>
                <Compass className="h-6 w-6 text-sanctuary-burgundy" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-sanctuary-charcoal">
                  {t.landing.meditationTitle}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sanctuary-muted">
                  {t.landing.meditationDesc}
                </p>
              </div>
              <Link
                to={ROUTES.MEDITATION}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
              >
                <span>{t.landing.openMeditation}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-sanctuary-brown/12 bg-sanctuary-cream p-7">
              <div>
                <Flame className="h-6 w-6 text-sanctuary-saffron" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-sanctuary-charcoal">
                  {t.landing.prayerTitle}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sanctuary-muted">
                  {t.landing.prayerDesc}
                </p>
              </div>
              <Link
                to={ROUTES.PRAYER}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
              >
                <span>{t.landing.visitPrayer}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-sanctuary-brown/12 bg-sanctuary-cream p-7">
              <div>
                <Sparkles className="h-6 w-6 text-sanctuary-gold-dark" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl font-semibold text-sanctuary-charcoal">
                  {t.landing.malaTitle}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sanctuary-muted">
                  {t.landing.malaDesc}
                </p>
              </div>
              <Link
                to={ROUTES.MALA}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
              >
                <span>{t.landing.practiceMala}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Myanmar Buddhist Heritage & Daily Dhamma */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="overflow-hidden rounded-xl border border-sanctuary-brown/12 bg-sanctuary-brown lg:col-span-6">
            <ResilientImage
              src={HERITAGE_IMAGE}
              alt="Traditional Myanmar Buddhist monastery courtyard in morning light"
              fallbackLabel="Myanmar Buddhist Heritage"
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/45 p-8 lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
                {t.landing.heritageKicker}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy">
                {t.landing.heritageTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
                {t.landing.heritageDesc}
              </p>

              <div className="mt-6 rounded-lg border border-sanctuary-brown/10 bg-sanctuary-cream p-5">
                <p className="text-xs font-medium text-sanctuary-saffron">
                  {t.landing.todaysDhamma} · {featuredDhamma.sourceAttribution}
                </p>
                <p className="mt-2 font-display text-xl leading-snug text-sanctuary-charcoal">
                  “{language === 'my' ? featuredDhamma.quoteMy : featuredDhamma.quoteEn}”
                </p>
                <p className="mt-2 font-myanmar text-xs leading-relaxed text-sanctuary-muted">
                  {language === 'my' ? featuredDhamma.quoteEn : featuredDhamma.quoteMy}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to={ROUTES.HERITAGE}
                className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream transition-colors hover:bg-sanctuary-burgundy-deep"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>{t.landing.exploreFigures}</span>
              </Link>
              <Link
                to={ROUTES.DHAMMA}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
              >
                <span>{t.landing.readDhamma}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
