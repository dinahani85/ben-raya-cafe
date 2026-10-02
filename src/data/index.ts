import { categories as allCategories } from './categories';
import { products as allProducts } from './products';
import type { Category, Lang, Product } from '../types/menu';

/** Visible categories, in display order. */
export const categories: Category[] = allCategories.filter((c) => !c.hidden);

const visibleCategoryIds = new Set(categories.map((c) => c.id));

/** Visible products whose category is visible. */
export const products: Product[] = allProducts.filter(
  (p) => !p.hidden && visibleCategoryIds.has(p.category),
);

export const hasPlaceholders = products.some((p) => p.placeholder);

export function getCategory(id: string | undefined): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

export function productsIn(categoryId: string, subcategoryId?: string): Product[] {
  return products.filter(
    (p) => p.category === categoryId && (!subcategoryId || p.subcategory === subcategoryId),
  );
}

/** Lowest and highest price of a product (equal for single-price items). */
export function priceRange(p: Product): { min: number; max: number } | null {
  if (p.sizes?.length) {
    const prices = p.sizes.map((s) => s.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }
  if (typeof p.price === 'number') return { min: p.price, max: p.price };
  return null;
}

/** Normalizes Arabic letter variants and diacritics so search is forgiving. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // tashkeel + tatweel
    .replace(/[\u0300-\u036f]/g, '') // latin accents
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .trim();
}

export function searchProducts(query: string): Product[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products
    .map((p) => {
      const cat = getCategory(p.category);
      const name = normalize(`${p.name.ar} ${p.name.en}`);
      const rest = normalize(
        [p.description?.ar, p.description?.en, cat?.name.ar, cat?.name.en].filter(Boolean).join(' '),
      );
      if (!terms.every((t) => name.includes(t) || rest.includes(t))) return null;
      const score = terms.reduce((s, t) => s + (name.startsWith(t) ? 3 : name.includes(t) ? 2 : 1), 0);
      return { p, score };
    })
    .filter((x): x is { p: Product; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export const pick = (text: Record<Lang, string> | undefined, lang: Lang) => (text ? text[lang] : '');

// Helpful warnings while editing the menu (development only).
if (import.meta.env.DEV) {
  const ids = new Set<string>();
  for (const p of allProducts) {
    if (ids.has(p.id)) console.warn(`[menu] Duplicate product id "${p.id}"`);
    ids.add(p.id);
    const cat = allCategories.find((c) => c.id === p.category);
    if (!cat) console.warn(`[menu] Product "${p.id}" uses unknown category "${p.category}"`);
    else if (p.subcategory && !cat.subcategories?.some((s) => s.id === p.subcategory))
      console.warn(`[menu] Product "${p.id}" uses unknown subcategory "${p.subcategory}"`);
    if (p.price === undefined && !p.sizes?.length) console.warn(`[menu] Product "${p.id}" has no price`);
  }
}
