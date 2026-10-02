import { useState, type ReactNode } from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  /** Rendered when there is no src or the image fails to load. */
  fallback: ReactNode;
  eager?: boolean;
  sizes?: string;
}

/** Image with a loading shimmer and a graceful fallback. */
export function SmartImage({ src, alt, className = '', fallback, eager = false }: Props) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');
  if (!src || state === 'error') return <>{fallback}</>;
  return (
    <span className={`smart-img ${className} is-${state}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
      />
    </span>
  );
}
