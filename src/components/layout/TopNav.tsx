import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { ROUTES } from '../../config/navigation';
import { useAuth } from '../../context/AuthContext';
import { useSanctuary } from '../../context/SanctuaryContext';
import { getTranslations } from '../../i18n/translations';
import { SanctuaryLogo } from './SanctuaryLogo';

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const { language, setLanguage } = useSanctuary();
  const t = getTranslations(language);

  const navItems = [
    { label: t.nav.pagodas, to: ROUTES.PAGODAS },
    { label: t.nav.meditation, to: ROUTES.MEDITATION },
    { label: t.nav.prayerMala, to: ROUTES.PRAYER },
    { label: t.nav.heritage, to: ROUTES.HERITAGE },
    { label: t.nav.dhamma, to: ROUTES.DHAMMA },
  ];

  const ctaTarget = user ? ROUTES.DASHBOARD : ROUTES.AUTH;
  const ctaLabel = user ? t.nav.dashboard : t.nav.signIn;

  return (
    <header className="sticky top-0 z-40 border-b border-sanctuary-brown/12 bg-sanctuary-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link
          to={ROUTES.HOME}
          onClick={() => setMobileOpen(false)}
          aria-label="Myanmar Sanctuary Home"
          className="inline-flex items-center whitespace-nowrap shrink-0"
        >
          <SanctuaryLogo size="nav" />
        </Link>

        <nav aria-label="Primary Navigation" className="hidden items-center gap-5 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 py-1 ${
                  isActive
                    ? 'border-sanctuary-gold text-sanctuary-burgundy'
                    : 'border-transparent text-sanctuary-muted hover:border-sanctuary-gold/50 hover:text-sanctuary-charcoal'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Bilingual Language Switcher (English / Myanmar) */}
          <div
            role="group"
            aria-label="Website language switcher"
            className="hidden items-center rounded-lg border border-sanctuary-brown/15 bg-sanctuary-parchment/70 p-0.5 sm:inline-flex"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                language === 'en'
                  ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                  : 'text-sanctuary-muted hover:text-sanctuary-burgundy'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('my')}
              aria-pressed={language === 'my'}
              className={`rounded-md px-2.5 py-1 font-myanmar text-xs font-semibold whitespace-nowrap transition-colors ${
                language === 'my'
                  ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                  : 'text-sanctuary-muted hover:text-sanctuary-burgundy'
              }`}
            >
              မြန်မာ
            </button>
          </div>

          <Link
            to={ctaTarget}
            className="hidden rounded-lg bg-sanctuary-burgundy px-4 py-2 text-sm font-medium text-sanctuary-cream transition-colors hover:bg-sanctuary-burgundy-deep whitespace-nowrap shrink-0 sm:inline-flex"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sanctuary-brown/15 text-sanctuary-charcoal transition-colors hover:bg-sanctuary-parchment md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-sanctuary-brown/10 bg-sanctuary-cream px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sanctuary-parchment text-sanctuary-burgundy'
                      : 'text-sanctuary-charcoal hover:bg-sanctuary-parchment/70'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-sanctuary-brown/10 pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sanctuary-muted">
                <Globe className="h-3.5 w-3.5 text-sanctuary-saffron" aria-hidden="true" />
                <span>{language === 'my' ? 'ဘာသာစကား' : 'Language'}</span>
              </span>
              <div className="inline-flex rounded-lg border border-sanctuary-brown/15 bg-sanctuary-parchment/70 p-0.5">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    language === 'en'
                      ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                      : 'text-sanctuary-muted'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('my')}
                  className={`rounded-md px-3 py-1 font-myanmar text-xs font-semibold ${
                    language === 'my'
                      ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                      : 'text-sanctuary-muted'
                  }`}
                >
                  မြန်မာ
                </button>
              </div>
            </div>

            <Link
              to={ctaTarget}
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-sanctuary-burgundy px-4 py-2.5 text-sm font-medium text-sanctuary-cream"
            >
              {ctaLabel}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
