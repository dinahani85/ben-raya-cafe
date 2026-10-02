import { site } from '../config/site';
import type { Lang, Product } from '../types/menu';
import { priceRange } from '../data';

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** "EGP 45". Latin digits are used in both languages, as in the design. */
export function formatPrice(value: number, lang: Lang): string {
  return `${site.currency[lang]} ${nf.format(value)}`;
}

/** Card price: the amount, plus whether it is a "from" price (sizes differ). */
export function cardPrice(p: Product, lang: Lang): { amount: string; from: boolean } | null {
  const r = priceRange(p);
  if (!r) return null;
  return { amount: formatPrice(r.min, lang), from: r.min !== r.max };
}

/** "7 أصناف" / "7 items", with correct Arabic number agreement. */
export function countLabel(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} ${n === 1 ? 'item' : 'items'}`;
  if (n === 1) return 'صنف واحد';
  if (n === 2) return 'صنفان';
  if (n >= 3 && n <= 10) return `${n} أصناف`;
  return `${n} صنف`;
}

export function resultsLabel(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} ${n === 1 ? 'result' : 'results'}`;
  if (n === 1) return 'نتيجة واحدة';
  if (n === 2) return 'نتيجتان';
  if (n >= 3 && n <= 10) return `${n} نتائج`;
  return `${n} نتيجة`;
}

/** WhatsApp chat link. A message is pre-filled only when one is passed. */
export function whatsappLink(message?: string): string | null {
  const n = site.whatsappNumber.replace(/\D/g, '');
  if (!n) return null;
  return message ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : `https://wa.me/${n}`;
}
