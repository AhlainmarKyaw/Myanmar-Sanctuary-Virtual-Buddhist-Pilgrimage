import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../config/navigation';

interface PhasePlaceholderViewProps {
  phaseNumber: number;
  title: string;
  description: string;
  plannedCapabilities: string[];
}

export default function PhasePlaceholderView({
  phaseNumber,
  title,
  description,
  plannedCapabilities,
}: PhasePlaceholderViewProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link
        to={ROUTES.HOME}
        className="inline-flex items-center gap-2 text-sm font-medium text-sanctuary-burgundy hover:text-sanctuary-gold-dark"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span>Return to Sanctuary Architecture</span>
      </Link>

      <div className="mt-6 rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/60 p-8 sm:p-10">
        <p className="text-xs font-medium tracking-wider text-sanctuary-saffron uppercase">
          Scheduled for Phase {String(phaseNumber).padStart(2, '0')}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-sanctuary-muted">{description}</p>

        <div className="mt-8 border-t border-sanctuary-brown/12 pt-6">
          <h2 className="text-sm font-semibold text-sanctuary-charcoal">
            Planned Module Scope
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-sanctuary-muted">
            {plannedCapabilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sanctuary-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
