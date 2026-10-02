import { useEffect, useState } from 'react';
import { getCategory, getProduct } from '../data';
import { useDialog } from '../hooks/useDialog';
import { useLanguage } from '../i18n/LanguageContext';
import { formatPrice } from '../lib/format';
import { goBackOr, type Route } from '../lib/router';
import { site } from '../config/site';
import { CloseIcon } from './Icons';
import { Badges, ProductThumb } from './ProductCard';

/**
 * Product details: bottom sheet on phones, centered dialog on larger screens.
 * It only shows information — name, description, and every option with its price.
 */
export function ProductSheet({ route }: { route: Route }) {
  const { l, t, lang, other } = useLanguage();
  const productId = route.name === 'category' ? route.productId : undefined;
  const product = getProduct(productId);
  const category = product ? getCategory(product.category) : undefined;
  const open = Boolean(product && category && route.name === 'category' && product.category === route.categoryId);

  // Keep the last product rendered while the dialog animates closed.
  const [shown, setShown] = useState(product);
  useEffect(() => {
    if (product) setShown(product);
  }, [product]);

  const close = () => {
    if (route.name === 'category') goBackOr({ name: 'category', categoryId: route.categoryId });
  };
  const ref = useDialog(open, close);

  const p = product ?? shown;
  const c = p ? getCategory(p.category) : undefined;
  const unavailable = p?.available === false;
  const unit = c?.priceUnit ? <span className="price__unit"> / {c.priceUnit[lang]}</span> : null;

  return (
    <dialog ref={ref} className="sheet" aria-labelledby="sheet-title">
      {p && c && (
        <article className="sheet__panel" tabIndex={-1} autoFocus>
          <button type="button" className="icon-btn sheet__close" onClick={close} aria-label={t('close')}>
            <CloseIcon />
          </button>
          <div className="sheet__media">
            <ProductThumb product={p} category={c} large />
          </div>
          <div className="sheet__content">
            <p className="sheet__category">{l(c.name)}</p>
            <h2 id="sheet-title" className="sheet__title">
              {l(p.name)}
            </h2>
            <p className="sheet__alt" lang={other}>
              {p.name[other]}
            </p>
            <Badges product={p} />
            {p.description && <p className="sheet__desc">{l(p.description)}</p>}

            <div className="sheet__prices">
              {unavailable ? (
                <p className="sheet__status">{t('unavailable')}</p>
              ) : p.sizes?.length ? (
                <ul className="price-list" aria-label={t('prices')}>
                  {p.sizes.map((s) => (
                    <li key={s.id} className="price-list__row">
                      <span className="price-list__label">{l(s.label)}</span>
                      <span className="price-list__amount">
                        <bdi dir="ltr">{formatPrice(s.price, lang)}</bdi>
                        {unit}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : p.price !== undefined ? (
                <p className="sheet__price">
                  <bdi dir="ltr">{formatPrice(p.price, lang)}</bdi>
                  {unit}
                </p>
              ) : null}
            </div>

            {p.placeholder && site.showSampleNotice && <p className="sheet__note">{t('sampleItem')}</p>}
          </div>
        </article>
      )}
    </dialog>
  );
}
