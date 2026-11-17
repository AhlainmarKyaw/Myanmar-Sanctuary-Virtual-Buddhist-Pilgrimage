import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Globe, Layers, Shield } from 'lucide-react';
import { DEVELOPMENT_ROADMAP, ROUTES } from '../config/navigation';
import { useSanctuary } from '../context/SanctuaryContext';

const PALETTE_SWATCHES = [
  { name: 'Deep Burgundy', hex: '#4A121B', className: 'bg-sanctuary-burgundy' },
  { name: 'Lacquer Brown', hex: '#261610', className: 'bg-sanctuary-brown' },
  { name: 'Warm Gold', hex: '#C99A32', className: 'bg-sanctuary-gold' },
  { name: 'Soft Cream', hex: '#FBF7EE', className: 'bg-sanctuary-cream border border-sanctuary-brown/15' },
  { name: 'Muted Saffron', hex: '#C26427', className: 'bg-sanctuary-saffron' },
  { name: 'Subtle Charcoal', hex: '#1F1B18', className: 'bg-sanctuary-charcoal' },
];

export default function ArchitectureOverviewPage() {
  const { language, setLanguage, qualityTier, setQualityTier, webgl } = useSanctuary();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-brown p-8 text-sanctuary-cream sm:p-12">
        <p className="text-xs font-medium tracking-wider text-sanctuary-gold-light uppercase">
          Phase 1 · Project Setup &amp; Architecture
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-sanctuary-cream sm:text-5xl">
          Virtual Myanmar Buddhist Sanctuary
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-sanctuary-parchment/85">
          Architectural foundation established. Core routing, Myanmar Buddhist design tokens, Three.js / React Three Fiber dependencies, bilingual typography, and adaptive WebGL capability checks are active and ready for review.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={ROUTES.PAGODAS}
            className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-gold px-5 py-2.5 text-sm font-semibold text-sanctuary-lacquer transition-colors hover:bg-sanctuary-gold-light"
          >
            <span>Inspect Module Routes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'my' : 'en')}
            className="inline-flex items-center gap-2 rounded-lg border border-sanctuary-gold/35 px-4 py-2.5 text-sm font-medium text-sanctuary-cream transition-colors hover:bg-sanctuary-cream/10"
          >
            <Globe className="h-4 w-4 text-sanctuary-gold-light" aria-hidden="true" />
            <span>Language: {language === 'en' ? 'English' : 'မြန်မာ (Burmese)'}</span>
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-6">
          <div className="flex items-center gap-2.5 text-sanctuary-burgundy">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">3D WebGL Readiness</h2>
          </div>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-center justify-between border-b border-sanctuary-brown/10 pb-2">
              <dt className="text-sanctuary-muted">WebGL Support</dt>
              <dd className="font-medium text-sanctuary-charcoal">
                {webgl.supported ? 'Available' : 'Fallback Mode'}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-sanctuary-brown/10 pb-2">
              <dt className="text-sanctuary-muted">Renderer</dt>
              <dd className="max-w-[180px] truncate font-mono text-xs text-sanctuary-charcoal" title={webgl.rendererName}>
                {webgl.rendererName}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sanctuary-muted">Quality Tier</dt>
              <dd>
                <select
                  aria-label="Select 3D quality tier"
                  value={qualityTier}
                  onChange={(e) => setQualityTier(e.target.value as typeof qualityTier)}
                  className="rounded-md border border-sanctuary-brown/20 bg-sanctuary-cream px-2 py-1 text-xs font-medium text-sanctuary-charcoal"
                >
                  <option value="high">High (Hardware GPU)</option>
                  <option value="balanced">Balanced</option>
                  <option value="fallback">2D Fallback</option>
                </select>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-6">
          <div className="flex items-center gap-2.5 text-sanctuary-burgundy">
            <Layers className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">Modular Architecture</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
            Lazy-loaded feature routes isolate Three.js scenes (Shwedagon, Mahamuni, Kyaiktiyo) so only the active sacred site is loaded into memory.
          </p>
          <p className="mt-3 font-myanmar text-sm text-sanctuary-burgundy">
            မြန်မာ့ဗုဒ္ဓဘာသာ ယဉ်ကျေးမှုနှင့် တရားဘာဝနာ ခန်းမ
          </p>
        </div>

        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-6">
          <div className="flex items-center gap-2.5 text-sanctuary-burgundy">
            <Shield className="h-5 w-5" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold">Security &amp; Persistence</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
            TypeScript domain models map cleanly to the 10 relational database tables and role-based access rules planned for Phase 3.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs font-medium text-sanctuary-burgundy">
            <Link to={ROUTES.DASHBOARD} className="underline underline-offset-4 hover:text-sanctuary-gold-dark">
              User Dashboard Route
            </Link>
            <Link to={ROUTES.ADMIN} className="underline underline-offset-4 hover:text-sanctuary-gold-dark">
              Admin Route
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-sanctuary-brown/12 bg-sanctuary-cream p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
          Sanctuary Color Palette
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {PALETTE_SWATCHES.map((swatch) => (
            <div key={swatch.hex} className="space-y-2">
              <div className={`h-14 w-full rounded-lg ${swatch.className}`} />
              <div>
                <p className="text-xs font-semibold text-sanctuary-charcoal">{swatch.name}</p>
                <p className="font-mono text-xs text-sanctuary-muted">{swatch.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between border-b border-sanctuary-brown/12 pb-3">
          <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
            10-Phase Development Roadmap
          </h2>
          <span className="text-xs font-medium text-sanctuary-muted tabular-nums">
            10 Phases
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {DEVELOPMENT_ROADMAP.map((item) => (
            <Link
              key={item.phase}
              to={item.route}
              className="group rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/35 p-5 transition-colors hover:border-sanctuary-gold/60 hover:bg-sanctuary-parchment/75"
            >
              <div className="flex items-center justify-between gap-4 text-xs text-sanctuary-muted">
                <span className="font-medium text-sanctuary-burgundy">
                  Phase {String(item.phase).padStart(2, '0')}
                </span>
                <span className="font-medium">
                  {item.status === 'in-progress' ? 'Active Phase' : 'Scheduled'}
                </span>
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-sanctuary-charcoal group-hover:text-sanctuary-burgundy">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-sanctuary-muted">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
