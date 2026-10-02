import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useToast } from '../lib/toast';

/**
 * A link to an outside service. If the URL hasn't been configured yet
 * it renders as a button that explains the link is coming soon.
 */
export function ExternalLink({
  href,
  className,
  children,
  label,
}: {
  href: string | null | undefined;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  const toast = useToast();
  const { t } = useLanguage();
  if (!href) {
    return (
      <button type="button" className={className} aria-label={label} onClick={() => toast(t('linkSoon'))}>
        {children}
      </button>
    );
  }
  const sameTab = /^(tel|mailto|sms):/i.test(href);
  return (
    <a
      className={className}
      href={href}
      target={sameTab ? undefined : '_blank'}
      rel={sameTab ? undefined : 'noopener noreferrer'}
      aria-label={label}
    >
      {children}
    </a>
  );
}
