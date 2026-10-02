import { useEffect, useRef } from 'react';
import { site } from '../config/site';
import { categories } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { Logo, Tagline } from '../components/Brand';
import { CategoryCard } from '../components/CategoryCard';
import { ChevronDown } from '../components/Icons';
import { BrushStroke, LeafDivider, Sprig } from '../components/Ornaments';
import { SampleNotice } from '../components/States';
import { SmartImage } from '../components/SmartImage';

export function HomePage({ scrollToMenu }: { scrollToMenu: boolean }) {
  const { t, l, other } = useLanguage();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollToMenu) menuRef.current?.scrollIntoView({ block: 'start' });
  }, [scrollToMenu]);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__texture" aria-hidden="true" />
        <Sprig className="hero__sprig hero__sprig--start" />
        <Sprig className="hero__sprig hero__sprig--end" />

        <div className="hero__inner">
          <div className="hero__brand-block">
            <h1 className="hero__brand">
              <Logo className="hero__logo" eager />
            </h1>
            <Tagline className="hero__tagline" />
          </div>

          <div className="hero__visual">
            <SmartImage src={site.hero.image} alt="" className="hero__img" eager fallback={null} />
          </div>

          <div className="hero__copy">
            <p id="hero-title" className="hero__title">
              <span className="hero__title-text">{l(site.hero.title)}</span>
              <BrushStroke className="hero__brush" />
            </p>
            <p className="hero__subtitle">{l(site.hero.subtitle)}</p>
            <button
              type="button"
              className="hero__cue"
              onClick={() => menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className="hero__cue-label">{t('viewMenu')}</span>
              <ChevronDown size={22} />
            </button>
          </div>
        </div>
      </section>

      <section ref={menuRef} id="menu" className="menu-home" aria-labelledby="menu-title">
        <div className="container">
          <div className="banner">
            <SmartImage src={site.menuBanner.image} alt="" className="banner__img" fallback={null} />
            <div className="banner__text">
              <h2 id="menu-title" className="banner__title">
                {l(site.menuBanner.title)}
              </h2>
              <p className="banner__sub">{l(site.menuBanner.subtitle)}</p>
            </div>
          </div>

          <ul className="cat-grid" aria-label={t('categories')}>
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </ul>

          <LeafDivider className="menu-home__divider" />
          <SampleNotice />
          <p className="sr-only" lang={other}>
            {site.name[other]}
          </p>
        </div>
      </section>
    </>
  );
}
