/** Decorative brand ornaments drawn from the design reference. All aria-hidden. */

export function LeafDivider({ className = '' }: { className?: string }) {
  return (
    <svg className={`leaf-divider ${className}`} viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path d="M4 13c26 0 40-1 62-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M94 12c22 0 36 1 62 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M80 12c-5-6-14-8-20-4 6 0 11 2 14 6-4-1-9 0-12 3 6 1 13 0 18-5zM80 12c5-6 14-8 20-4-6 0-11 2-14 6 4-1 9 0 12 3-6 1-13 0-18-5z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The red brush stroke under the hero script line. */
export function BrushStroke({ className = '' }: { className?: string }) {
  return (
    <svg className={`brush ${className}`} viewBox="0 0 300 26" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        className="brush__path"
        d="M6 18C70 9 160 6 294 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
      <path className="brush__path brush__path--thin" d="M40 21c60-6 130-8 210-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" pathLength={1} />
    </svg>
  );
}

/** A sprig of leaves (olive + Raya red) used in corners, as in the design. */
export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 120 140" fill="none" aria-hidden="true">
      <path d="M10 136C34 104 52 70 60 22" stroke="var(--olive-700)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M58 30c-16-6-30 2-34 16 16 4 28-4 34-16z" fill="var(--olive-500)" opacity=".85" />
      <path d="M52 62c18-4 32 6 34 20-18 2-30-6-34-20z" fill="var(--raya-600)" opacity=".9" />
      <path d="M40 92c-18-2-30 8-30 22 18 0 28-8 30-22z" fill="var(--olive-600)" opacity=".85" />
      <path d="M60 22c4-10 12-16 22-18-2 12-10 18-22 18z" fill="var(--raya-700)" opacity=".9" />
    </svg>
  );
}
