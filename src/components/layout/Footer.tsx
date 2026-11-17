import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { ROUTES } from '../../config/navigation';
import { useSanctuary } from '../../context/SanctuaryContext';
import { getTranslations } from '../../i18n/translations';
import { SanctuaryLogo } from './SanctuaryLogo';

export function Footer() {
  const { language, toggleLanguage } = useSanctuary();
  const t = getTranslations(language);

  return (
    <footer className="border-t border-sanctuary-brown/12 bg-sanctuary-parchment/60">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <div>
          <Link to={ROUTES.HOME} className="inline-flex items-center">
            <SanctuaryLogo size="footer" />
          </Link>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-sanctuary-muted">
            {t.footer.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-sanctuary-muted">
          <Link to={ROUTES.PAGODAS} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.pagodas}
          </Link>
          <Link to={ROUTES.MEDITATION} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.meditation}
          </Link>
          <Link to={ROUTES.PRAYER} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.prayerMala}
          </Link>
          <Link to={ROUTES.HERITAGE} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.heritage}
          </Link>
          <Link to={ROUTES.DHAMMA} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.dhamma}
          </Link>
          <Link to={ROUTES.DASHBOARD} className="hover:text-sanctuary-burgundy transition-colors">
            {t.footer.journal}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 rounded-md border border-sanctuary-brown/20 bg-sanctuary-cream px-2.5 py-1 text-xs font-semibold text-sanctuary-burgundy transition-colors hover:border-sanctuary-gold"
          >
            <Globe className="h-3.5 w-3.5 text-sanctuary-saffron" aria-hidden="true" />
            <span>{language === 'en' ? 'မြန်မာဘာသာ' : 'English'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
