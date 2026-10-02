import type { Lang, Localized } from '../types/menu';

/**
 * ─────────────────────────────────────────────────────────────
 *  CAFÉ DETAILS — edit this file to change the café information,
 *  WhatsApp number, social links, and site-wide text.
 * ─────────────────────────────────────────────────────────────
 * Empty links ('') are shown but display a "coming soon" note when tapped.
 */

export type SocialId = 'instagram' | 'tiktok' | 'facebook' | 'location';

export interface SiteConfig {
  name: Localized;
  tagline: Localized;
  defaultLanguage: Lang;
  currency: Localized;
  hero: { title: Localized; subtitle: Localized; image: string };
  menuBanner: { title: Localized; subtitle: Localized; image: string };
  /** International format, digits only, no "+" — e.g. "201001234567". */
  whatsappNumber: string;
  /** Phone number shown in the footer; tapping it calls the café. */
  phone: { display: string; tel: string };
  whatsappGreeting: Localized;
  socials: { id: SocialId; label: Localized; url: string }[];
  location: { label: Localized; address?: Localized; mapsUrl: string };
  /** Opening hours lines (optional). Leave the array empty to hide. */
  hours: { days: Localized; time: string }[];
  /** Shows the "sample menu" notice while placeholder content is in use. */
  showSampleNotice: boolean;
  /** Show the "All" chip before a category's subcategory chips. */
  showAllChip: boolean;
  footerImage: string;
}

/** Google Maps link for the café (used by the location icon and the address line). */
const MAPS_URL = 'https://maps.app.goo.gl/LeCt3FvcWejjmqPM8?g_st=ic';

export const site: SiteConfig = {
  name: { ar: 'بن رايا', en: 'Ben Raya' },
  tagline: { ar: 'قهوة .. بن .. حكايات', en: 'Coffee, beans & stories' },
  defaultLanguage: 'ar',
  currency: { ar: 'EGP', en: 'EGP' },

  hero: {
    title: { ar: 'قهوة على مزاجك', en: 'Coffee, your way' },
    subtitle: { ar: 'اختر منيو بن رايا', en: 'Explore the Ben Raya menu' },
    image: '/images/hero/hero-cup.webp',
  },

  menuBanner: {
    title: { ar: 'منيو بن رايا', en: 'The Ben Raya menu' },
    subtitle: { ar: 'بن .. قهوة .. مشروبات', en: 'Coffee beans, coffee & drinks' },
    image: '/images/hero/menu-banner.webp',
  },

  // Opens https://wa.me/201002378848
  whatsappNumber: '201002378848',

  phone: { display: '01002378848', tel: 'tel:01002378848' },
  whatsappGreeting: {
    ar: 'أهلاً بن رايا، حابب أطلب:',
    en: 'Hi Ben Raya, I would like to order:',
  },

  // Instagram has no account yet: an empty url shows the "coming soon" note.
  socials: [
    { id: 'instagram', label: { ar: 'إنستجرام', en: 'Instagram' }, url: '' },
    { id: 'tiktok', label: { ar: 'تيك توك', en: 'TikTok' }, url: 'https://www.tiktok.com/@rayacafe266?_r=1&_t=ZS-9ADwyv24SFZ' },
    { id: 'facebook', label: { ar: 'فيسبوك', en: 'Facebook' }, url: 'https://www.facebook.com/share/1X1NAXk8Zk/?mibextid=wwXIfr' },
    { id: 'location', label: { ar: 'الموقع', en: 'Location' }, url: MAPS_URL },
  ],

  location: {
    label: { ar: 'بن رايا - قهوتك على مزاجك', en: 'Ben Raya, coffee your way' },
    // address: { ar: '...', en: '...' },
    mapsUrl: MAPS_URL,
  },

  hours: [],

  showSampleNotice: true,
  showAllChip: true,
  footerImage: '/images/hero/footer-cafe.webp',
};
