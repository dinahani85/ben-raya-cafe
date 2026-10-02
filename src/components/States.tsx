import type { ReactNode } from 'react';
import { site } from '../config/site';
import { hasPlaceholders } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { CategoryGlyph } from './Icons';

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="empty">
      <CategoryGlyph icon="beans" size={44} strokeWidth={1.1} className="empty__icon" />
      <p className="empty__title">{title}</p>
      <p className="empty__body">{body}</p>
      {action}
    </div>
  );
}

export function SampleNotice() {
  const { t } = useLanguage();
  if (!site.showSampleNotice || !hasPlaceholders) return null;
  return <p className="sample-notice">{t('sampleNotice')}</p>;
}
