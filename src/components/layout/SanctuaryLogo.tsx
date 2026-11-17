import { useId } from 'react';

interface SanctuaryLogoProps {
  size?: 'nav' | 'footer';
  className?: string;
}

export function SanctuaryLogo({ size = 'nav', className = '' }: SanctuaryLogoProps) {
  const gradientId = useId();
  const isFooter = size === 'footer';
  const markSize = isFooter ? 'h-9 w-9' : 'h-8 w-8 sm:h-9 sm:w-9';
  const textSize = isFooter
    ? 'text-xl sm:text-2xl'
    : 'text-xl sm:text-2xl';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`${markSize} shrink-0`}
      >
        <defs>
          <linearGradient id={gradientId} x1="20" y1="5" x2="20" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f3d886" />
            <stop offset="55%" stopColor="#c99a32" />
            <stop offset="100%" stopColor="#a77b1d" />
          </linearGradient>
        </defs>

        {/* Heritage burgundy seal with hairline gold border */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          fill="#4a121b"
          stroke="#c99a32"
          strokeOpacity="0.65"
          strokeWidth="1.2"
        />

        {/* Burmese golden stupa spire & bell dome */}
        <circle cx="20" cy="6.6" r="1.35" fill="#f3d886" />
        <path
          d="M20 8.3L21.5 13.5H18.5L20 8.3Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M17.2 14.5H22.8L24.2 18.2H15.8L17.2 14.5Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M15.4 18.9C15.4 18.9 14.2 22.8 11.8 24.4H28.2C25.8 22.8 24.6 18.9 24.6 18.9H15.4Z"
          fill={`url(#${gradientId})`}
        />

        {/* Stepped terrace plinth */}
        <rect x="9.5" y="25.2" width="21" height="2" rx="1" fill={`url(#${gradientId})`} />

        {/* Three-petal lotus pedestal */}
        <path
          d="M20 33.4C22.4 33.4 24.4 31.6 24.7 29.2C23.1 28.6 21.3 29.4 20 31C18.7 29.4 16.9 28.6 15.3 29.2C15.6 31.6 17.6 33.4 20 33.4Z"
          fill="#e5c36c"
        />
        <path
          d="M10.8 28.9C12.8 28.9 14.8 30.1 15.6 32.1C13.1 32.1 11.2 30.8 10.8 28.9Z"
          fill="#c99a32"
          fillOpacity="0.88"
        />
        <path
          d="M29.2 28.9C27.2 28.9 25.2 30.1 24.4 32.1C26.9 32.1 28.8 30.8 29.2 28.9Z"
          fill="#c99a32"
          fillOpacity="0.88"
        />
      </svg>

      <span className={`font-display font-semibold tracking-tight text-sanctuary-burgundy ${textSize}`}>
        Myanmar Sanctuary
      </span>
    </span>
  );
}
