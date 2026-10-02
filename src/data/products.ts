import type { Localized, Product, ProductSize } from '../types/menu';

/**
 * ─────────────────────────────────────────────────────────────
 *  MENU ITEMS — every product on the site lives here.
 * ─────────────────────────────────────────────────────────────
 *  One line per product:
 *      group('id', 'الاسم بالعربي', 'English name', price)
 *      group('id', 'الاسم', 'Name', price, { description: d('وصف', 'Description') })
 *      group('id', 'الاسم', 'Name', shots(20, 35))         ← product with sizes
 *
 *  • Change a price: edit the number.
 *  • Add a product: copy a line and give it a new unique id (lowercase, no spaces).
 *  • Remove: delete the line.  Hide temporarily: add { hidden: true }.
 *  • Out of stock: add { available: false }.
 *  • Photo: add { image: '/images/products/name.webp' } and put the file in public/images/products/.
 *  • Badges: add { badges: ['popular'] } — 'new' | 'popular' | 'signature'.
 *  The order of lines is the order on the site.
 */

type Extra = Partial<Omit<Product, 'id' | 'category' | 'name'>>;

/** Creates a line-maker for one category (and optional subcategory). */
const group =
  (category: string, subcategory?: string) =>
  (id: string, ar: string, en: string, price: number | ProductSize[], extra: Extra = {}): Product => ({
    id,
    category,
    subcategory,
    name: { ar, en },
    ...(typeof price === 'number' ? { price } : { sizes: price }),
    ...extra,
  });

const d = (ar: string, en: string): Localized => ({ ar, en });

/** Single / double sizes (Turkish coffee, espresso, macchiato). */
const shots = (single: number, double: number): ProductSize[] => [
  { id: 'single', label: { ar: 'سنجل', en: 'Single' }, price: single },
  { id: 'double', label: { ar: 'دابل', en: 'Double' }, price: double },
];

// ── البن — Coffee beans ─────────────────────────────────────
const blend = group('coffee-beans', 'blends');
const origin = group('coffee-beans', 'single-origin');
const flavored = group('coffee-beans', 'flavored');
const beanOther = group('coffee-beans', 'other');

// ── Drinks ──────────────────────────────────────────────────
const turkish = group('hot-coffee', 'turkish');
const espresso = group('hot-coffee', 'espresso');
const instant = group('hot-coffee', 'instant');
const iced = group('iced-coffee');
const frappe = group('frappe');
const tea = group('hot-drinks', 'tea');
const herbs = group('hot-drinks', 'herbs');
const winter = group('hot-drinks', 'winter');
const icedTea = group('iced-tea');
const juice = group('fresh-juices');
const smoothie = group('smoothies');
const yogurt = group('yogurt');
const avocado = group('avocado');
const cocktail = group('cocktails');
const mojito = group('soda-cocktails', 'mojito');
const soda = group('soda-cocktails', 'soda');
const shake = group('milkshakes');

export const products: Product[] = [
  // ════ البن — Coffee beans ════
  blend('blend-brazilian-light', 'توليفة برازيلي فاتح', 'Brazilian Blend, Light', 580),
  blend('blend-brazilian-medium', 'توليفة برازيلي وسط', 'Brazilian Blend, Medium', 580),
  blend('blend-brazilian-dark', 'توليفة برازيلي غامق', 'Brazilian Blend, Dark', 600),
  blend('blend-amid-light', 'توليفة العميد فاتح', 'Al-Amid Blend, Light', 680),
  blend('blend-amid-medium', 'توليفة العميد وسط', 'Al-Amid Blend, Medium', 720),
  blend('blend-royal', 'توليفة ملكية', 'Royal Blend', 620),
  blend('blend-special', 'توليفة مخصوص', 'Special Blend', 660),
  origin('beans-brazilian-pure', 'برازيلي بيور', 'Pure Brazilian', 700),
  origin('beans-indian-arabica', 'بن هندي أرابيكا', 'Indian Arabica', 800),
  origin('beans-colombian-pure', 'بن كولومبي بيور', 'Pure Colombian', 920),
  origin('beans-espresso', 'إسبرسو', 'Espresso', 800),
  flavored('beans-mango', 'قهوة مانجو', 'Mango Coffee', 560),
  flavored('beans-apple', 'قهوة تفاح', 'Apple Coffee', 560),
  flavored('beans-french', 'قهوة فرنساوي', 'French Coffee', 520),
  flavored('beans-chocolate', 'قهوة شوكليت', 'Chocolate Coffee', 600),
  flavored('beans-hazelnut', 'قهوة بندق', 'Hazelnut Coffee', 580),
  flavored('beans-hazelnut-pieces', 'قهوة بندق قطع', 'Hazelnut Pieces Coffee', 680),
  flavored('beans-pistachio-pieces', 'قهوة فسدق قطع', 'Pistachio Pieces Coffee', 740),
  flavored('beans-almond-pieces', 'قهوة لوز قطع', 'Almond Pieces Coffee', 680),
  beanOther('beans-hot-chocolate', 'هوت شوكليت', 'Hot Chocolate', 540),
  beanOther('beans-nescafe-black', 'نسكافيه بلاك', 'Nescafé Black', 960),
  beanOther('beans-nescafe-gold', 'نسكافيه جولد', 'Nescafé Gold', 1360),
  beanOther('beans-karak-tea', 'شاي كرك', 'Karak Tea', 600),
  beanOther('beans-slimming', 'بن تخسيس', 'Slimming Coffee', 680),
  beanOther('beans-creamer', 'كريمر', 'Creamer', 360),

  // ════ مشروبات قهوة ساخنة — Hot coffee ════
  turkish('turkish-coffee', 'قهوة تركي', 'Turkish Coffee', shots(20, 35)),
  turkish('colombian-coffee', 'قهوة كولومبي', 'Colombian Coffee', 30),
  turkish('amid-coffee', 'قهوة عميد', 'Al-Amid Coffee', 25),
  turkish('ginseng-coffee', 'قهوة جينسينج', 'Ginseng Coffee', 35),
  turkish('french-coffee', 'قهوة فرنساوي', 'French Coffee', 40),
  turkish('hazelnut-coffee', 'قهوة بندق', 'Hazelnut Coffee', 40),
  turkish('hazelnut-pieces-coffee', 'قهوة بندق قطع', 'Hazelnut Pieces Coffee', 50),
  turkish('chocolate-coffee', 'قهوة شوكليت', 'Chocolate Coffee', 50),
  turkish('almond-coffee', 'قهوة لوز', 'Almond Coffee', 50),
  turkish('pistachio-pieces-coffee', 'قهوة بستاشيو قطع', 'Pistachio Pieces Coffee', 60),
  turkish('nutella-coffee', 'قهوة نوتيلا', 'Nutella Coffee', 60),
  turkish('apple-coffee', 'قهوة تفاح', 'Apple Coffee', 40),
  turkish('mango-coffee', 'قهوة منجا', 'Mango Coffee', 40),
  espresso('espresso', 'إسبريسو', 'Espresso', shots(35, 55)),
  espresso('macchiato', 'ميكاتو', 'Macchiato', shots(40, 60)),
  espresso('caffe-latte', 'كافيه لاتيه', 'Caffè Latte', 55),
  espresso('cappuccino', 'كابتشينو', 'Cappuccino', 60),
  espresso('cortado', 'كورتادو', 'Cortado', 50),
  espresso('flat-white', 'فلات وايت', 'Flat White', 60),
  espresso('affogato', 'إسبرسو أفوجاتو', 'Espresso Affogato', 70),
  espresso('mocha', 'موكا', 'Mocha', 65),
  espresso('spanish-latte', 'اسبانيش لاتيه', 'Spanish Latte', 70),
  espresso('american-coffee', 'امريكان كوفي', 'American Coffee', 60),
  instant('nescafe-black', 'نسكافيه بلاك', 'Nescafé Black', 25),
  instant('nescafe-milk', 'نسكافيه باللبن', 'Nescafé with Milk', 45),
  instant('nescafe-3in1', 'نسكافيه 3×1', 'Nescafé 3-in-1', 25),
  instant('coffee-mix', 'كوفي ميكس', 'Coffee Mix', 20),

  // ════ مشروبات القهوة المثلجة — Iced coffee ════
  iced('iced-latte', 'آيس لاتيه', 'Iced Latte', 60),
  iced('iced-cappuccino', 'آيس كابتشينو', 'Iced Cappuccino', 60),
  iced('iced-americano', 'آيس امريكان', 'Iced Americano', 50),
  iced('iced-mocha', 'آيس موكا', 'Iced Mocha', 65),
  iced('iced-spanish', 'آيس اسبانيش', 'Iced Spanish Latte', 65),
  iced('iced-matcha-latte', 'آيس لاتيه ماتشا', 'Iced Matcha Latte', 90),

  // ════ مشروبات الفرابيه — Frappé ════
  frappe('frappe-latte', 'فرابيه لاتيه', 'Latte Frappé', 60),
  frappe('frappuccino-classic', 'فرابتشينو كلاسيك', 'Classic Frappuccino', 65),
  frappe('frappe-mocha', 'فرابيه موكا', 'Mocha Frappé', 65),
  frappe('frappe-caramel', 'فرابيه كراميل', 'Caramel Frappé', 65),
  frappe('frappe-matcha', 'فرابيه ماتشا كلاسيك', 'Classic Matcha Frappé', 90),
  frappe('frappe-matcha-berry', 'فرابيه ماتشا توت', 'Matcha Berry Frappé', 110),
  frappe('frappe-matcha-strawberry', 'فرابيه ماتشا فراولة', 'Matcha Strawberry Frappé', 110),

  // ════ مشروبات ساخنة — Hot drinks ════
  tea('tea-loose', 'شاي كشري', 'Loose-Leaf Tea', 10),
  tea('tea-bag', 'شاي فتلة', 'Tea Bag', 15),
  tea('tea-green', 'شاي أخضر', 'Green Tea', 20),
  tea('tea-flavored', 'شاي نكهات', 'Flavored Tea', 20),
  tea('tea-karak', 'شاي كرك', 'Karak Tea', 50),
  herbs('anise', 'ينسون', 'Anise', 20),
  herbs('mint', 'نعناع', 'Mint', 20),
  herbs('hibiscus', 'كركديه', 'Hibiscus', 20),
  herbs('chamomile', 'بابونج', 'Chamomile', 20),
  herbs('cinnamon', 'قرفة', 'Cinnamon', 20),
  herbs('cinnamon-milk', 'قرفة لبن', 'Cinnamon with Milk', 40),
  herbs('ginger', 'جنزبيل', 'Ginger', 20),
  herbs('ginger-milk', 'جنزبيل لبن', 'Ginger with Milk', 50),
  herbs('herbal-mix', 'ميكس أعشاب', 'Herbal Mix', 35),
  winter('sahlab', 'سحلب', 'Sahlab', 55),
  winter('sahlab-candy', 'سحلب مع أي كاندي من اختيارك', 'Sahlab with Candy of Your Choice', 70),
  winter('sahlab-fruit', 'سحلب فواكه', 'Fruit Sahlab', 70),
  winter('hot-cider', 'هوت سيدر', 'Hot Cider', 40),
  winter('hot-chocolate-classic', 'هوت شوكليت كلاسيك', 'Classic Hot Chocolate', 50),
  winter('hot-chocolate-nutella', 'هوت شوكليت نوتيلا', 'Nutella Hot Chocolate', 70),
  winter('hot-chocolate-italian', 'هوت شوكليت إيطالي', 'Italian Hot Chocolate', 80),
  winter('hummus-sham', 'حمص شام', 'Hummus Sham', 40),
  winter('belila', 'بليلة', 'Belila', 40),

  // ════ مشروبات الشاي المثلج — Iced tea ════
  icedTea('iced-tea-peach', 'آيس تي بيتش', 'Peach Iced Tea', 50, { description: d('خوخ وشاي أحمر', 'Peach and black tea') }),
  icedTea('iced-tea-passion', 'آيس تي باشون', 'Passion Iced Tea', 50, { description: d('باشون فروت وشاي أخضر', 'Passion fruit and green tea') }),
  icedTea('iced-tea-toasted', 'آيس تي توستيد', 'Toasted Iced Tea', 60, { description: d('ليمون نعناع وشاي أخضر', 'Lemon, mint and green tea') }),
  icedTea('iced-tea-blueberry', 'آيس تي بلو بيري', 'Blueberry Iced Tea', 60, { description: d('بلوبيري وشاي أحمر', 'Blueberry and black tea') }),
  icedTea('iced-tea-green-lantern', 'آيس تي جرين لانتر', 'Green Lantern Iced Tea', 60, { description: d('شاي أخضر وكيوي', 'Green tea and kiwi') }),

  // ════ عصائر طازجة — Fresh juices ════
  juice('juice-mango', 'مانجو', 'Mango', 55),
  juice('juice-strawberry', 'فراولة', 'Strawberry', 45),
  juice('juice-guava', 'جوافة', 'Guava', 45),
  juice('juice-orange', 'برتقال', 'Orange', 45),
  juice('juice-lemon', 'ليمون', 'Lemon', 35),
  juice('juice-lemon-mint', 'ليمون نعناع', 'Lemon Mint', 40),
  juice('juice-peach', 'خوخ', 'Peach', 45),
  juice('juice-watermelon', 'بطيخ', 'Watermelon', 45),
  juice('juice-kiwi', 'كيوي', 'Kiwi', 60),
  juice('juice-cantaloupe', 'كانتلوب', 'Cantaloupe', 45),
  juice('juice-banana-milk', 'موز باللبن', 'Banana with Milk', 50),
  juice('juice-dates-milk', 'بلح باللبن', 'Dates with Milk', 50),

  // ════ سموزي كلاسيك — Classic smoothies ════
  smoothie('smoothie-mango', 'مانجو', 'Mango', 65),
  smoothie('smoothie-strawberry', 'فراولة', 'Strawberry', 65),
  smoothie('smoothie-lemon', 'ليمون', 'Lemon', 45),
  smoothie('smoothie-lemon-mint', 'ليمون نعناع', 'Lemon Mint', 50),
  smoothie('smoothie-watermelon', 'سموزي بطيخ', 'Watermelon Smoothie', 50),
  smoothie('smoothie-cantaloupe', 'سموزي كانتلوب', 'Cantaloupe Smoothie', 50),
  smoothie('smoothie-blueberry', 'سموزي بلو بيري', 'Blueberry Smoothie', 60),
  smoothie('smoothie-raspberry', 'سموزي راز بيري', 'Raspberry Smoothie', 60),
  smoothie('smoothie-kiwi', 'سموزي كيوي', 'Kiwi Smoothie', 80),
  smoothie('smoothie-peach', 'سموزي خوخ', 'Peach Smoothie', 60),

  // ════ مشروبات الزبادي — Yogurt drinks ════
  yogurt('yogurt-classic', 'زبادي كلاسيك', 'Classic Yogurt', 40),
  yogurt('yogurt-berry', 'زبادي توت', 'Berry Yogurt', 50),
  yogurt('yogurt-mango', 'زبادي مانجو', 'Mango Yogurt', 50),
  yogurt('yogurt-strawberry', 'زبادي فراولة', 'Strawberry Yogurt', 50),
  yogurt('yogurt-fruit-mix', 'زبادي ميكس فواكه', 'Mixed Fruit Yogurt', 70),

  // ════ مشروبات الأفوكادو — Avocado drinks ════
  avocado('avocado-classic', 'أفوكادو كلاسيك', 'Classic Avocado', 60, {
    description: d('ميكس بين طعم الأفوكادو وآيس كريم الفانيليا والعسل', 'Avocado with vanilla ice cream and honey'),
  }),
  avocado('avocado-super', 'أفوكادو سوبر', 'Super Avocado', 75, {
    description: d('خليط ما بين عصير الأفوكادو والمكسرات المميزة', 'Avocado juice blended with premium nuts'),
  }),
  avocado('avocado-essawy', 'أفوكادو عيسوي', 'Avocado Essawy', 80, {
    description: d('خليط بين عصير الأفوكادو والمانجو', 'Avocado and mango juice'),
  }),
  avocado('avocado-milano', 'أفوكادو ميلانو', 'Avocado Milano', 80, {
    description: d('أفوكادو بالإسبريسو', 'Avocado with espresso'),
  }),
  avocado('avocado-raya', 'أفوكادو رايا', 'Avocado Raya', 100, {
    description: d('خليط بين الأفوكادو والكيوي والمكسرات والكراميل', 'Avocado, kiwi, nuts and caramel'),
  }),

  // ════ كوكتيل — Cocktails ════
  cocktail('cocktail-florida', 'فلوريدا', 'Florida', 55, { description: d('جوافة، مانجو، فراولة', 'Guava, mango and strawberry') }),
  cocktail('cocktail-kiwi-mango', 'كيوي مانجو', 'Kiwi Mango', 70, { description: d('كيوي، مانجو وآيس كريم فانيليا', 'Kiwi, mango and vanilla ice cream') }),
  cocktail('cocktail-trabdent', 'ترابدنت', 'Trabdent', 65, { description: d('بطيخ وفراولة ونعناع', 'Watermelon, strawberry and mint') }),
  cocktail('cocktail-mango-cantaloupe', 'مانجا كانتلوب', 'Mango Cantaloupe', 70, { description: d('مانجا، كانتلوب وآيس كريم فانيليا', 'Mango, cantaloupe and vanilla ice cream') }),
  cocktail('cocktail-strawberry-cream', 'فراولة قشطة', 'Strawberry Cream', 75, { description: d('فراولة، آيس كريم فانيليا وحليب مكثف', 'Strawberry, vanilla ice cream and condensed milk') }),
  cocktail('cocktail-mango-cream', 'مانجو كريم', 'Mango Cream', 75, { description: d('مانجو، حليب مكثف وآيس كريم فانيليا', 'Mango, condensed milk and vanilla ice cream') }),
  cocktail('cocktail-tornado', 'تورنيد', 'Tornado', 80, { description: d('بلح، موز، فول سوداني وآيس كريم فانيليا', 'Dates, banana, peanuts and vanilla ice cream') }),
  cocktail('cocktail-pina-colada', 'بينا كولادا', 'Piña Colada', 60, { description: d('أناناس وجوز الهند', 'Pineapple and coconut') }),
  cocktail('cocktail-summer-time', 'سامر تايم', 'Summer Time', 60, { description: d('كانتلوب وبطيخ', 'Cantaloupe and watermelon') }),
  cocktail('cocktail-mango-berry', 'مانجو بيري', 'Mango Berry', 70, { description: d('مانجا وبلوبيري', 'Mango and blueberry') }),

  // ════ كوكتيل صودا — Soda cocktails ════
  mojito('mojito', 'موخيتو', 'Mojito', 55),
  mojito('mojito-berry', 'موخيتو توت', 'Berry Mojito', 50),
  mojito('mojito-passion', 'موخيتو باشون', 'Passion Mojito', 55),
  mojito('mojito-kiwi', 'موخيتو كيوي', 'Kiwi Mojito', 60),
  mojito('mojito-bowl', 'موخيتو بول', 'Mojito Bowl', 110),
  soda('soda-sunshine', 'صن شاين', 'Sunshine', 45),
  soda('soda-sunrise', 'صن رايز', 'Sunrise', 45),
  soda('soda-cherry-cola', 'شيري كولا', 'Cherry Cola', 55),
  soda('soda-blue-hawaii', 'بلو هاواي', 'Blue Hawaii', 55),
  soda('soda-hammerhead', 'هامر هيد', 'Hammerhead', 100),

  // ════ ميلك شيك — Milkshakes ════
  shake('shake-vanilla', 'ميلك شيك فانيليا', 'Vanilla Milkshake', 60),
  shake('shake-caramel', 'ميلك شيك كراميل', 'Caramel Milkshake', 70),
  shake('shake-chocolate', 'ميلك شيك شوكولاتة', 'Chocolate Milkshake', 60),
  shake('shake-mango', 'ميلك مانجا', 'Mango Milkshake', 60),
  shake('shake-strawberry', 'ميلك فراولة', 'Strawberry Milkshake', 60),
  shake('shake-blueberry', 'ميلك بلو بيري', 'Blueberry Milkshake', 70),
  shake('shake-nutella', 'ميلك نوتيلا', 'Nutella Milkshake', 75),
  shake('shake-oreo', 'أوريو', 'Oreo Milkshake', 65),
];
