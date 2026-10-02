import { useEffect, useMemo, useState } from 'react';
import { site } from '../config/site';
import { categories, getCategory, productsIn } from '../data';
import { useLanguage } from '../i18n/LanguageContext';
import { navigate } from '../lib/router';
import { ArrowBack, CategoryGlyph } from '../components/Icons';
import { ProductCard } from '../components/ProductCard';
import { EmptyState, SampleNotice } from '../components/States';
import type { Category } from '../types/menu';

export function CategoryPage({ categoryId }: { categoryId: string }) {
  const { t } = useLanguage();
  const category = getCategory(categoryId);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [categoryId]);

  if (!category) {
    return (
      <div className="container category-missing">
        <EmptyState
          title={t('notFoundTitle')}
          body={t('notFoundBody')}
          action={
            <a className="btn" href="#/menu" onClick={(e) => { e.preventDefault(); navigate({ name: 'home', anchor: 'menu' }); }}>
              {t('backToMenu')}
            </a>
          }
        />
      </div>
    );
  }
  return <CategoryView key={category.id} category={category} />;
}

function CategoryView({ category }: { category: Category }) {
  const { t, l, other } = useLanguage();
  const subs = category.subcategories ?? [];
  const withAll = site.showAllChip || subs.length === 0;
  const [filter, setFilter] = useState<string | null>(withAll ? null : subs[0]?.id ?? null);

  const items = useMemo(() => productsIn(category.id, filter ?? undefined), [category.id, filter]);

  /** With "All" selected, group items under their subcategory headings. */
  const groups = useMemo(() => {
    if (filter || subs.length === 0) return [{ id: 'all', title: '', items }];
    const g = subs
      .map((s) => ({ id: s.id, title: l(s.name), items: items.filter((p) => p.subcategory === s.id) }))
      .filter((x) => x.items.length);
    const loose = items.filter((p) => !p.subcategory || !subs.some((s) => s.id === p.subcategory));
    if (loose.length) g.push({ id: 'other', title: '', items: loose });
    return g;
  }, [filter, subs, items, l]);

  return (
    <div className={`category accent-${category.accent}`}>
      <div className="container category__layout">
        <aside className="category__aside" aria-label={t('categories')}>
          <nav>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#/menu/${c.id}`}
                    aria-current={c.id === category.id ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ name: 'category', categoryId: c.id });
                    }}
                  >
                    <CategoryGlyph icon={c.icon} size={20} />
                    <span>{l(c.name)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="category__main">
          <div className="page-head">
            <a
              href="#/menu"
              className="icon-btn page-head__back"
              aria-label={t('backToMenu')}
              onClick={(e) => {
                e.preventDefault();
                navigate({ name: 'home', anchor: 'menu' });
              }}
            >
              <ArrowBack />
            </a>
            <div className="page-head__titles">
              <h1 className="page-head__title">{l(category.name)}</h1>
              <p className="page-head__sub" lang={other}>
                {category.name[other]}
              </p>
            </div>
            <span className="page-head__icon" aria-hidden="true">
              <CategoryGlyph icon={category.icon} size={28} strokeWidth={1.4} />
            </span>
          </div>
          {category.description && <p className="category__desc">{l(category.description)}</p>}

          {subs.length > 0 && (
            <div className="chips" role="group" aria-label={l(category.name)}>
              {withAll && (
                <button type="button" className="chip" aria-pressed={filter === null} onClick={() => setFilter(null)}>
                  {t('all')}
                </button>
              )}
              {subs.map((s) => (
                <button key={s.id} type="button" className="chip" aria-pressed={filter === s.id} onClick={() => setFilter(s.id)}>
                  {l(s.name)}
                </button>
              ))}
            </div>
          )}

          {items.length === 0 ? (
            <EmptyState title={t('emptyCategoryTitle')} body={t('emptyCategoryBody')} />
          ) : (
            <div className="product-groups" key={filter ?? 'all'}>
              {groups.map((g) => (
                <section key={g.id} className="product-group" aria-label={g.title || undefined}>
                  {g.title && <h2 className="product-group__title">{g.title}</h2>}
                  <ul className="product-list">
                    {g.items.map((p) => (
                      <ProductCard key={p.id} product={p} category={category} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
          <SampleNotice />
        </div>
      </div>
    </div>
  );
}
