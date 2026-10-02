import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { getCategory, searchProducts } from '../data';
import { useDialog } from '../hooks/useDialog';
import { useLanguage } from '../i18n/LanguageContext';
import { resultsLabel } from '../lib/format';
import { navigate } from '../lib/router';
import { CloseIcon, SearchIcon } from './Icons';
import { ProductPrices, ProductThumb } from './ProductCard';

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, l, lang, other } = useLanguage();
  const ref = useDialog(open, onClose);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const results = searchProducts(deferred);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <dialog ref={ref} className="search" aria-label={t('searchLabel')}>
      <div className="search__panel">
        <div className="search__bar">
          <SearchIcon className="search__icon" />
          <label htmlFor="menu-search" className="sr-only">
            {t('searchLabel')}
          </label>
          <input
            ref={inputRef}
            id="menu-search"
            type="search"
            autoComplete="off"
            enterKeyHint="search"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t('close')}>
            <CloseIcon />
          </button>
        </div>

        <div className="search__body">
          {!deferred.trim() ? (
            <p className="search__hint">{t('searchIdle')}</p>
          ) : results.length === 0 ? (
            <div className="empty empty--compact">
              <p className="empty__title">{t('searchEmptyTitle')}</p>
              <p className="empty__body">{t('searchEmptyBody')}</p>
            </div>
          ) : (
            <>
              <p className="search__count" aria-live="polite">
                {resultsLabel(results.length, lang)}
              </p>
              <ul className="search__results">
                {results.map((p) => {
                  const cat = getCategory(p.category)!;
                  return (
                    <li key={p.id}>
                      <a
                        className="search__result"
                        href={`#/menu/${p.category}/${p.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onClose();
                          navigate({ name: 'category', categoryId: p.category, productId: p.id });
                        }}
                      >
                        <ProductThumb product={p} category={cat} />
                        <span className="search__text">
                          <span className="search__name">{l(p.name)}</span>
                          <span className="search__meta">
                            <span lang={other}>{p.name[other]}</span>
                            <span aria-hidden="true"> / </span>
                            {l(cat.name)}
                          </span>
                        </span>
                        <ProductPrices product={p} unit={cat.priceUnit} className="search__prices" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
