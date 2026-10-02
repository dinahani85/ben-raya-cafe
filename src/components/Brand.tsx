import { site } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';

/** The official Ben Raya logo. Files live in /public/images/brand/. */
export function Logo({ variant = 'dark', className = '', eager = false }: { variant?: 'dark' | 'light'; className?: string; eager?: boolean }) {
  const { lang } = useLanguage();
  return (
    <img
      className={`logo ${className}`}
      src={variant === 'light' ? '/images/brand/logo-light.png' : '/images/brand/logo.png'}
      alt={lang === 'ar' ? site.name.ar : `${site.name.en} Café`}
      width={640}
      height={625}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export function Tagline({ className = '' }: { className?: string }) {
  const { l } = useLanguage();
  return (
    <p className={`tagline ${className}`}>
      <span className="tagline__rule" aria-hidden="true" />
      {l(site.tagline)}
      <span className="tagline__rule" aria-hidden="true" />
    </p>
  );
}
