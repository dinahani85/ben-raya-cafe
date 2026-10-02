import { useEffect, useRef, useState } from 'react';
import { Drawer } from './components/Drawer';
import { Header } from './components/Header';
import { ProductSheet } from './components/ProductSheet';
import { SearchDialog } from './components/SearchDialog';
import { SiteFooter } from './components/SiteFooter';
import { useLanguage } from './i18n/LanguageContext';
import { useRoute } from './lib/router';
import { CategoryPage } from './pages/CategoryPage';
import { HomePage } from './pages/HomePage';

export default function App() {
  const route = useRoute();
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // "/" opens search (unless typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(el.tagName) && !document.querySelector('dialog[open]')) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isHome = route.name === 'home';

  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        {t('skipToMenu')}
      </a>

      <Header isHome={isHome} onOpenDrawer={() => setDrawerOpen(true)} onOpenSearch={() => setSearchOpen(true)} />

      <main id="main" ref={mainRef} tabIndex={-1} className={isHome ? 'is-home' : undefined}>
        {route.name === 'home' ? (
          <HomePage scrollToMenu={route.anchor === 'menu'} />
        ) : (
          <CategoryPage categoryId={route.categoryId} />
        )}
      </main>

      <SiteFooter ref={footerRef} />

      <ProductSheet route={route} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} route={route} />
    </>
  );
}
