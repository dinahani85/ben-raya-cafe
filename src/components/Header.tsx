import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { navigate } from '../lib/router';
import { Logo } from './Brand';
import { MenuIcon, SearchIcon } from './Icons';

interface Props {
  isHome: boolean;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
}

export function Header({ isHome, onOpenDrawer, onOpenSearch }: Props) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > (isHome ? window.innerHeight * 0.55 : 8));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  const showLogo = !isHome || scrolled;

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${isHome ? ' is-home' : ''}`}>
      <div className="site-header__inner">
        <div className="site-header__start">
          <button type="button" className="icon-btn" onClick={onOpenDrawer} aria-label={t('openMenu')} aria-haspopup="dialog">
            <MenuIcon />
          </button>
        </div>

        <a
          href="#/"
          className={`site-header__logo${showLogo ? ' is-visible' : ''}`}
          aria-hidden={!showLogo}
          tabIndex={showLogo ? 0 : -1}
          onClick={(e) => {
            e.preventDefault();
            navigate({ name: 'home' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Logo eager />
        </a>

        <div className="site-header__end">
          <button type="button" className="icon-btn" onClick={onOpenSearch} aria-label={t('searchLabel')} aria-haspopup="dialog">
            <SearchIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
