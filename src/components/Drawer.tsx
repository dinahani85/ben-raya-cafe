import { categories, productsIn } from '../data';
import { useDialog } from '../hooks/useDialog';
import { useLanguage } from '../i18n/LanguageContext';
import { navigate, type Route } from '../lib/router';
import { countLabel } from '../lib/format';
import { Logo, Tagline } from './Brand';
import { CategoryGlyph, Chevron, CloseIcon } from './Icons';
import { Socials } from './Socials';

export function Drawer({ open, onClose, route }: { open: boolean; onClose: () => void; route: Route }) {
  const { t, l, lang, other } = useLanguage();
  const ref = useDialog(open, onClose);
  const activeId = route.name === 'category' ? route.categoryId : null;

  const go = (r: Route) => {
    onClose();
    navigate(r);
  };

  return (
    <dialog ref={ref} className="drawer" aria-label={t('categories')}>
      <div className="drawer__panel">
        <div className="drawer__top">
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('close')}>
            <CloseIcon />
          </button>
        </div>

        <div className="drawer__brand">
          <Logo className="drawer__logo" />
          <Tagline />
        </div>

        <nav aria-label={t('categories')}>
          <ul className="drawer__list">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#/menu/${c.id}`}
                  className={`drawer__item accent-${c.accent}`}
                  aria-current={activeId === c.id ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go({ name: 'category', categoryId: c.id });
                  }}
                >
                  <span className="drawer__glyph">
                    <CategoryGlyph icon={c.icon} size={22} />
                  </span>
                  <span className="drawer__names">
                    <span>{l(c.name)}</span>
                    <span className="drawer__sub" lang={other}>
                      {c.name[other]}
                    </span>
                  </span>
                  <span className="drawer__count">
                    <span aria-hidden="true">{productsIn(c.id).length}</span>
                    <span className="sr-only">{countLabel(productsIn(c.id).length, lang)}</span>
                  </span>
                  <Chevron size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot">
          <Socials />
          <p className="drawer__lang-note" lang={lang}>{t('followSub')}</p>
        </div>
      </div>
    </dialog>
  );
}
