import { site } from '../config/site';
import { useLanguage } from '../i18n/LanguageContext';
import { whatsappLink } from '../lib/format';
import { ExternalLink } from './ExternalLink';
import { WhatsAppIcon } from './Icons';

interface Props {
  /** Extra lines appended to the greeting (e.g. the chosen item). */
  details?: string;
  label?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

export function WhatsAppButton({ details, label, variant = 'solid', className = '' }: Props) {
  const { t, l } = useLanguage();
  // Without item details the button opens the chat directly (https://wa.me/<number>).
  const message = details ? `${l(site.whatsappGreeting)}\n${details}` : undefined;
  return (
    <ExternalLink href={whatsappLink(message)} className={`wa-btn wa-btn--${variant} ${className}`}>
      <WhatsAppIcon size={22} />
      <span>{label ?? t('orderWhatsapp')}</span>
    </ExternalLink>
  );
}
