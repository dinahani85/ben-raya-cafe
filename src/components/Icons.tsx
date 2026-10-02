import type { SVGProps } from 'react';
import type { CategoryIcon } from '../types/menu';

type P = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h11M4 17h16" />
  </Svg>
);
export const SearchIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Svg>
);
export const CloseIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
/** Points toward the "back" direction; flipped in RTL via the .flip-rtl class. */
export const ArrowBack = (p: P) => (
  <Svg {...p} className={`flip-rtl ${p.className ?? ''}`}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
/** Points toward the reading direction's "forward". */
export const Chevron = (p: P) => (
  <Svg {...p} className={`flip-rtl ${p.className ?? ''}`}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);
export const ChevronDown = (p: P) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const PinIcon = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
    <circle cx="12" cy="10" r="2.3" />
  </Svg>
);
export const PhoneIcon = (p: P) => (
  <Svg {...p}>
    <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 4.6 4.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />
  </Svg>
);
export const ClockIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const WhatsAppIcon = (p: P) => (
  <Svg {...p}>
    <path d="M3.8 20.2 5 16.1A8.6 8.6 0 1 1 8 19.1z" />
    <path
      d="M9.1 8.2c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .6.5.9 1.5 1.9 2.4 2.4.2.1.4.1.6 0l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.7-.6.9-.6.3-1.6.6-3-.1-1.6-.8-3.3-2.5-4-4.1-.6-1.4-.4-2.3-.1-2.9z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);
export const InstagramIcon = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </Svg>
);
export const TikTokIcon = (p: P) => (
  <Svg {...p}>
    <path
      d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.7 1.7-3 3.4-2.5V9.7c-3.5-.5-6.5 2.2-6.5 5.6 0 3.3 2.8 5.7 5.7 5.7 3.1 0 5.7-2.6 5.7-5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3s-1.9.1-3.2-1.5z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);
/** Solid map pin, matching the solid social glyphs (Facebook, TikTok). */
export const MapPinIcon = (p: P) => (
  <Svg {...p}>
    <path
      d="M12 2.5a7 7 0 0 0-7 7c0 5.2 6.1 11.3 6.4 11.6a.85.85 0 0 0 1.2 0C12.9 20.8 19 14.7 19 9.5a7 7 0 0 0-7-7zm0 9.8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z"
      fill="currentColor"
      stroke="none"
      fillRule="evenodd"
    />
  </Svg>
);
export const FacebookIcon = (p: P) => (
  <Svg {...p}>
    <path
      d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"
      fill="currentColor"
      stroke="none"
    />
  </Svg>
);

/* ── Category icons ─────────────────────────────────────────── */
const categoryPaths: Record<CategoryIcon, JSX.Element> = {
  hotCup: (
    <>
      <path d="M4.5 10.5h11v3.7a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
      <path d="M15.5 11.5h1.3a2.4 2.4 0 0 1 0 4.8h-1.6" />
      <path d="M3.5 21h14" />
      <path d="M8 3.3c-.7.9.7 1.8 0 2.8M10.5 3c-.8 1 .8 2.1 0 3.1M13 3.3c-.7.9.7 1.8 0 2.8" />
    </>
  ),
  icedCup: (
    <>
      <path d="M6.5 8h11l-1.3 12a1 1 0 0 1-1 .9H8.8a1 1 0 0 1-1-.9z" />
      <path d="M5.5 8h13" />
      <path d="M7.5 8l.6-2.2h7.8l.6 2.2" />
      <path d="M13.5 2.5 12.6 8" />
      <path d="M9.6 12.5h1.9v1.9H9.6zM12.4 15h1.9v1.9h-1.9z" />
    </>
  ),
  glass: (
    <>
      <path d="M6.5 6h11l-1.6 14.1a1 1 0 0 1-1 .9H9.1a1 1 0 0 1-1-.9z" />
      <path d="M7 10.5h10" />
      <circle cx="17.5" cy="5.5" r="2.6" />
      <path d="M15.3 6.9 19.7 4" />
    </>
  ),
  teapot: (
    <>
      <path d="M6 10.5h10v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5z" />
      <path d="M16 12l3.2-1.8.4 1.2-3.2 3.3" />
      <path d="M6 12H4.8a1.7 1.7 0 0 0 0 3.4h1.6" />
      <path d="M8.2 10.5c0-1.9 1.3-3 2.8-3s2.8 1.1 2.8 3" />
      <circle cx="11" cy="5.6" r="1" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20.5V13l15.5-5.5v13z" />
      <path d="M4 16.5l15.5-5" />
      <path d="M15.8 6.5c.8-1 .3-2.2 1-3.2" />
    </>
  ),
  croissant: (
    <>
      <path d="M3.5 15c1.6-5.2 5.6-8.5 8.5-8.5s6.9 3.3 8.5 8.5" />
      <path d="M3.5 15c2 1.6 4.8 2.5 8.5 2.5s6.5-.9 8.5-2.5" />
      <path d="M8.7 7.8l1 9.4M15.3 7.8l-1 9.4M12 6.5v11" />
    </>
  ),
  iceCream: (
    <>
      <path d="M7.4 11.5 12 21.5l4.6-10" />
      <path d="M6.5 11.5a5.5 5.5 0 0 1 11 0z" />
      <path d="M9 14.5l4.8-1.8M10.2 17.5l3.2-1.2" />
    </>
  ),
  beans: (
    <>
      <ellipse cx="9" cy="13" rx="4.2" ry="6" transform="rotate(-25 9 13)" />
      <path d="M7.2 8.2c2 2.4.4 7-.6 9.6" />
      <ellipse cx="16.3" cy="9.5" rx="3.2" ry="4.6" transform="rotate(30 16.3 9.5)" />
      <path d="M17.8 5.9c-1.8 1.6-2 5.2-3 7.2" />
    </>
  ),
  frappe: (
    <>
      <path d="M7 10h10l-1.3 10.1a1 1 0 0 1-1 .9H9.3a1 1 0 0 1-1-.9z" />
      <path d="M6 10h12" />
      <path d="M7.5 10a4.5 4.5 0 0 1 9 0" />
      <path d="M13 5.6 14.6 2" />
      <path d="M8.7 14h6.6" />
    </>
  ),
  juice: (
    <>
      <path d="M6 8h9l-1.4 12.1a1 1 0 0 1-1 .9H8.4a1 1 0 0 1-1-.9z" />
      <path d="M6.6 12.5h7.8" />
      <path d="M11.5 8 13.5 3h2" />
      <circle cx="17.5" cy="8.5" r="2.8" />
      <path d="M17.5 5.7v5.6M14.7 8.5h5.6" />
    </>
  ),
  avocado: (
    <>
      <path d="M12 3c-2.2 0-3.4 2.4-4.2 5.2C6.9 11 5.5 12.8 5.5 15.5A6.5 6.5 0 0 0 12 21a6.5 6.5 0 0 0 6.5-5.5c0-2.7-1.4-4.5-2.3-7.3C15.4 5.4 14.2 3 12 3z" />
      <circle cx="12" cy="15" r="2.8" />
    </>
  ),
  cocktail: (
    <>
      <path d="M5.5 5h11v1.5a5.5 5.5 0 0 1-11 0z" />
      <path d="M11 12v8M7.5 20.5h7" />
      <circle cx="17.5" cy="5" r="2.4" />
      <path d="M8 3.5 9.5 7" />
    </>
  ),
  soda: (
    <>
      <path d="M7.5 3.5h9l-1.2 16.6a1 1 0 0 1-1 .9H9.7a1 1 0 0 1-1-.9z" />
      <path d="M8 8h8" />
      <circle cx="11" cy="12" r=".9" />
      <circle cx="13.3" cy="15" r=".9" />
      <circle cx="11.4" cy="17.7" r=".9" />
    </>
  ),
  shake: (
    <>
      <path d="M7 10h10l-1.2 10.1a1 1 0 0 1-1 .9H9.2a1 1 0 0 1-1-.9z" />
      <path d="M6.5 10c0-2 1.6-3 3-3 .5-1.5 1.6-2 2.5-2s2 .5 2.5 2c1.4 0 3 1 3 3" />
      <path d="M14 5.2 15.6 1.6" />
    </>
  ),
  jar: (
    <>
      <path d="M7 7.5h10V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
      <path d="M6 4h12v3.5H6z" />
      <path d="M7 12h10" />
    </>
  ),
};

export function CategoryGlyph({ icon, ...p }: P & { icon: CategoryIcon }) {
  return <Svg {...p}>{categoryPaths[icon]}</Svg>;
}
