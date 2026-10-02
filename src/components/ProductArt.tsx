import type { Accent, CategoryIcon } from '../types/menu';
import { CategoryGlyph } from './Icons';

/** Branded artwork shown when a product or category has no photo yet. */
export function ProductArt({ icon, accent, large = false }: { icon: CategoryIcon; accent: Accent; large?: boolean }) {
  return (
    <div className={`art art--${accent}${large ? ' art--large' : ''}`} aria-hidden="true">
      <span className="art__ring" />
      <CategoryGlyph icon={icon} className="art__glyph" size={large ? 72 : 30} strokeWidth={large ? 1.1 : 1.4} />
    </div>
  );
}
