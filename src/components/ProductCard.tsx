import type { Category, Product } from '../types/menu';
import { useLanguage } from '../i18n/LanguageContext';
import { formatPrice } from '../lib/format';
import type { Localized } from '../types/menu';
import { navigate } from '../lib/router';
import { ProductArt } from './ProductArt';
import { SmartImage } from './SmartImage';

export function ProductThumb({ product, category, large = false }: { product: Product; category: Category; large?: boolean }) {
  const { l } = useLanguage();
  return (
    <span className={`thumb${large ? ' thumb--large' : ''}`}>
      <SmartImage
        src={product.image}
        alt={l(product.name)}
        fallback={<ProductArt icon={category.icon} accent={category.accent} large={large} />}
        eager={large}
      />
    </span>
  );
}

export function Badges({ product }: { product: Product }) {
  const { t } = useLanguage();
  if (!product.badges?.length && !product.placeholder) return null;
  return (
    <span className="badges">
      {product.badges?.map((b) => (
        <span key={b} className={`badge badge--${b}`}>
          {t(`badge_${b}`)}
        </span>
      ))}
      {product.placeholder && <span className="badge badge--sample">{t('sample')}</span>}
    </span>
  );
}

/**
 * All prices of a product, shown right on the card.
 * Single-price items show one amount; items with sizes list every size with its own price.
 * Amounts are wrapped in <bdi> so they stay correctly ordered in RTL and LTR.
 */
export function ProductPrices({ product, unit, className = '' }: { product: Product; unit?: Localized; className?: string }) {
  const { l, lang } = useLanguage();
  const unitLabel = unit ? <span className="price__unit"> / {unit[lang]}</span> : null;

  if (product.sizes?.length) {
    return (
      <span className={`prices ${className}`}>
        {product.sizes.map((s) => (
          <span key={s.id} className="prices__row">
            <span className="prices__label">{l(s.label)}</span>
            <span className="price">
              <bdi dir="ltr">{formatPrice(s.price, lang)}</bdi>
              {unitLabel}
            </span>
          </span>
        ))}
      </span>
    );
  }
  if (typeof product.price !== 'number') return null;
  return (
    <span className={`prices ${className}`}>
      <span className="price">
        <bdi dir="ltr">{formatPrice(product.price, lang)}</bdi>
        {unitLabel}
      </span>
    </span>
  );
}

/** One menu row: photo, names, description, and the price(s) — visible without opening the item. */
export function ProductCard({ product, category }: { product: Product; category: Category }) {
  const { l, t, other } = useLanguage();
  const unavailable = product.available === false;
  return (
    <li className={`product${unavailable ? ' is-unavailable' : ''}`}>
      <a
        href={`#/menu/${category.id}/${product.id}`}
        className="product__link"
        onClick={(e) => {
          e.preventDefault();
          navigate({ name: 'category', categoryId: category.id, productId: product.id });
        }}
      >
        <ProductThumb product={product} category={category} />
        <span className="product__body">
          <span className="product__name">{l(product.name)}</span>
          <span className="product__alt" lang={other}>
            {product.name[other]}
          </span>
          {product.description && <span className="product__desc">{l(product.description)}</span>}
          <Badges product={product} />
        </span>
        <span className="product__end">
          {unavailable ? (
            <span className="product__status">{t('unavailable')}</span>
          ) : (
            <ProductPrices product={product} unit={category.priceUnit} />
          )}
        </span>
      </a>
    </li>
  );
}
