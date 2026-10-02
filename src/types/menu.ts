/** Supported interface languages. Arabic is the primary (RTL) language. */
export type Lang = 'ar' | 'en';

/** Any text shown to visitors is provided in both languages. */
export type Localized = Record<Lang, string>;

/** Icons available for categories (see src/components/Icons.tsx). */
export type CategoryIcon =
  | 'hotCup'
  | 'icedCup'
  | 'glass'
  | 'teapot'
  | 'cake'
  | 'croissant'
  | 'iceCream'
  | 'beans'
  | 'frappe'
  | 'juice'
  | 'avocado'
  | 'cocktail'
  | 'soda'
  | 'shake'
  | 'jar';

/** Brand color used for a category card and its placeholder artwork. */
export type Accent = 'mocha' | 'olive' | 'raya' | 'espresso' | 'umber';

export type Badge = 'new' | 'popular' | 'signature';

export interface Subcategory {
  id: string;
  name: Localized;
}

export interface Category {
  /** Used in the URL: /#/menu/<id>. Lowercase, no spaces. */
  id: string;
  name: Localized;
  /** Short line under the title on the category page (optional). */
  description?: Localized;
  icon: CategoryIcon;
  accent: Accent;
  /** Cover photo path, e.g. "/images/categories/hot-coffee.webp" (optional). */
  cover?: string;
  /** Optional filter chips shown on the category page, in this order. */
  subcategories?: Subcategory[];
  /** Hide the category without deleting it. */
  hidden?: boolean;
  /** Show as a wide, highlighted card at the top of the menu. */
  featured?: boolean;
  /** Unit shown after every price in this category, e.g. { ar: 'كيلو', en: 'kg' }. */
  priceUnit?: Localized;
}

export interface ProductSize {
  id: string;
  label: Localized;
  price: number;
}

export interface Product {
  /** Unique across the whole menu. Used in the URL: /#/menu/<category>/<id>. */
  id: string;
  /** Must match a Category id. */
  category: string;
  /** Must match one of that category's subcategory ids (optional). */
  subcategory?: string;
  name: Localized;
  description?: Localized;
  /** Single price. Leave out if the product uses `sizes`. */
  price?: number;
  /** Sizes or variants, each with its own price. */
  sizes?: ProductSize[];
  /** Photo path, e.g. "/images/products/espresso.webp". Missing photos show branded artwork. */
  image?: string;
  badges?: Badge[];
  /** Set to false to show the item as "currently unavailable". */
  available?: boolean;
  /** Marks sample content. Remove (or set false) once the item is real. */
  placeholder?: boolean;
  /** Hide the product without deleting it. */
  hidden?: boolean;
}
