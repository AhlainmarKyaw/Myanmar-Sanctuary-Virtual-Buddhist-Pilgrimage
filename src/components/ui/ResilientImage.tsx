import { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'h-full w-full object-cover',
  fallbackLabel,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-sanctuary-brown via-sanctuary-burgundy to-sanctuary-lacquer p-6 text-center text-sanctuary-cream"
      >
        <Compass className="h-7 w-7 text-sanctuary-gold-light" aria-hidden="true" />
        <span className="font-display text-lg font-medium">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
