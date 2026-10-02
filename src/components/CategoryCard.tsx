import type { Category } from '../types/menu';
import { productsIn } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { navigate } from '../lib/router';
import { countLabel } from '../lib/format';
import { CategoryGlyph, Chevron } from './Icons';
import { SmartImage } from './SmartImage';

/** Category tile from the design: color panel with icon + names, photo at the far edge. */
export function CategoryCard({ category }: { category: Category }) {
  const { l, lang, other } = useLanguage();
  const count = productsIn(category.id).length;
  return (
    <li className={category.featured ? 'cat-grid__featured' : undefined}>
      <a
        href={`#/menu/${category.id}`}
        className={`cat-card accent-${category.accent}${category.featured ? ' cat-card--featured' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          navigate({ name: 'category', categoryId: category.id });
        }}
      >
        <span className="cat-card__media">
          <SmartImage
            src={category.cover}
            alt=""
            fallback={
              <span className="cat-card__pattern">
                <CategoryGlyph icon={category.icon} size={120} strokeWidth={0.8} />
              </span>
            }
          />
        </span>
        <span className="cat-card__body">
          <CategoryGlyph icon={category.icon} size={34} strokeWidth={1.3} className="cat-card__icon" />
          <span className="cat-card__title">{l(category.name)}</span>
          {category.featured && category.description && (
            <span className="cat-card__desc">{l(category.description)}</span>
          )}
          <span className="cat-card__sub">
            <span lang={other}>{category.name[other]}</span>
            <Chevron size={16} />
          </span>
          <span className="cat-card__count">
            {countLabel(count, lang)}
          </span>
        </span>
      </a>
    </li>
  );
}
