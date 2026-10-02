import type { Category } from '../types/menu';

/**
 * ─────────────────────────────────────────────────────────────
 *  MENU CATEGORIES — the order here is the order on the site.
 * ─────────────────────────────────────────────────────────────
 *  • Rename: change `name`.  • Reorder: move the block.
 *  • Remove: delete the block (or set `hidden: true`).
 *  • Add: copy a block and give it a new unique `id`.
 *  • featured: true  → wide highlighted card at the top of the menu.
 *  • priceUnit       → shown after every price in the category.
 *  accent: 'mocha' | 'olive' | 'raya' | 'espresso' | 'umber'
 *  icon:   'beans' | 'hotCup' | 'icedCup' | 'frappe' | 'teapot' | 'glass' | 'juice'
 *          'avocado' | 'cocktail' | 'soda' | 'shake' | 'jar' | 'cake' | 'croissant' | 'iceCream'
 */
export const categories: Category[] = [
  {
    id: 'coffee-beans',
    name: { ar: 'البن', en: 'Coffee Beans' },
    description: { ar: 'توليفات بن رايا، بن سادة وقهوة بالنكهات', en: 'Ben Raya blends, single-origin beans and flavored coffee' },
    icon: 'beans',
    accent: 'espresso',
    cover: '/images/categories/coffee-beans.webp',
    featured: true,
    priceUnit: { ar: 'كيلو', en: 'kg' }, // TODO: confirm the unit (or delete this line)
    subcategories: [
      { id: 'blends', name: { ar: 'توليفات', en: 'Blends' } },
      { id: 'single-origin', name: { ar: 'بن سادة', en: 'Single origin' } },
      { id: 'flavored', name: { ar: 'قهوة بالنكهات', en: 'Flavored coffee' } },
      { id: 'other', name: { ar: 'منتجات أخرى', en: 'More products' } },
    ],
  },
  {
    id: 'hot-coffee',
    name: { ar: 'مشروبات قهوة ساخنة', en: 'Hot Coffee' },
    icon: 'hotCup',
    accent: 'mocha',
    cover: '/images/categories/hot-coffee.webp',
    subcategories: [
      { id: 'turkish', name: { ar: 'تركي ونكهات', en: 'Turkish & flavored' } },
      { id: 'espresso', name: { ar: 'إسبريسو', en: 'Espresso' } },
      { id: 'instant', name: { ar: 'نسكافيه', en: 'Instant' } },
    ],
  },
  {
    id: 'iced-coffee',
    name: { ar: 'مشروبات القهوة المثلجة', en: 'Iced Coffee' },
    icon: 'icedCup',
    accent: 'olive',
    cover: '/images/categories/iced-coffee.webp',
  },
  {
    id: 'frappe',
    name: { ar: 'مشروبات الفرابيه', en: 'Frappé' },
    icon: 'frappe',
    accent: 'umber',
    cover: '/images/categories/frappe.webp',
  },
  {
    id: 'hot-drinks',
    name: { ar: 'مشروبات ساخنة', en: 'Hot Drinks' },
    icon: 'teapot',
    accent: 'raya',
    cover: '/images/categories/hot-drinks.webp',
    subcategories: [
      { id: 'tea', name: { ar: 'شاي', en: 'Tea' } },
      { id: 'herbs', name: { ar: 'أعشاب', en: 'Herbal' } },
      { id: 'winter', name: { ar: 'مشروبات شتوية', en: 'Winter warmers' } },
    ],
  },
  {
    id: 'iced-tea',
    name: { ar: 'مشروبات الشاي المثلج', en: 'Iced Tea' },
    icon: 'glass',
    accent: 'espresso',
    cover: '/images/categories/iced-tea.webp',
  },
  {
    id: 'fresh-juices',
    name: { ar: 'عصائر طازجة', en: 'Fresh Juices' },
    icon: 'juice',
    accent: 'olive',
    cover: '/images/categories/fresh-juices.webp',
  },
  {
    id: 'smoothies',
    name: { ar: 'سموزي كلاسيك', en: 'Classic Smoothies' },
    icon: 'shake',
    accent: 'raya',
    cover: '/images/categories/smoothies.webp',
  },
  {
    id: 'yogurt',
    name: { ar: 'مشروبات الزبادي', en: 'Yogurt Drinks' },
    icon: 'jar',
    accent: 'umber',
    cover: '/images/categories/yogurt.webp',
  },
  {
    id: 'avocado',
    name: { ar: 'مشروبات الأفوكادو', en: 'Avocado Drinks' },
    icon: 'avocado',
    accent: 'olive',
    cover: '/images/categories/avocado.webp',
  },
  {
    id: 'cocktails',
    name: { ar: 'كوكتيل', en: 'Cocktails' },
    icon: 'cocktail',
    accent: 'raya',
    cover: '/images/categories/cocktails.webp',
  },
  {
    id: 'soda-cocktails',
    name: { ar: 'كوكتيل صودا', en: 'Soda Cocktails' },
    icon: 'soda',
    accent: 'espresso',
    cover: '/images/categories/soda-cocktails.webp',
    subcategories: [
      { id: 'mojito', name: { ar: 'موخيتو', en: 'Mojitos' } },
      { id: 'soda', name: { ar: 'صودا', en: 'Sodas' } },
    ],
  },
  {
    id: 'milkshakes',
    name: { ar: 'ميلك شيك', en: 'Milkshakes' },
    icon: 'shake',
    accent: 'mocha',
    cover: '/images/categories/milkshakes.webp',
  },
];
