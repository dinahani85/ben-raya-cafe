import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { site } from '../config/site';
import type { Lang, Localized } from '../types/menu';
import { strings, type StringKey } from './strings';

interface LanguageValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  setLang: (l: Lang) => void;
  /** Interface label lookup. */
  t: (key: StringKey) => string;
  /** Pick the current language from a Localized value. */
  l: (text?: Localized) => string;
  /** The other language (for secondary names). */
  other: Lang;
}

const LanguageContext = createContext<LanguageValue | null>(null);
const STORAGE_KEY = 'benraya.lang';

/**
 * The language switcher was removed, so the site always opens in the default
 * language (site.defaultLanguage). Any choice saved by an older version is cleared.
 */
function initialLang(): Lang {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  return site.defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar' ? `${site.name.ar} | ${site.name.en} — المنيو` : `${site.name.en} Café — Menu`;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      setLang,
      t: (key) => strings[key][lang],
      l: (text) => (text ? text[lang] : ''),
      other: lang === 'ar' ? 'en' : 'ar',
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
