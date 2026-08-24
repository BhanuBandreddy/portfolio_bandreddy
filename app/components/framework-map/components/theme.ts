/**
 * The one file that knows about the host repo's design system.
 *
 * Every colour and type style the map uses passes through here, under a
 * semantic name. Point these at the repo's own tokens and the map re-themes
 * with the app — including dark mode, because a CSS custom property changes
 * underneath a `var()` without anything re-rendering.
 *
 * Values are CSS colour *expressions*, not hex: `var(--your-token)` is the
 * point. They are used in SVG attributes as well as class names, which is why
 * they are strings here rather than Tailwind classes.
 *
 * The defaults below are a neutral palette that works on its own. Replacing
 * them is the whole adaptation step — nothing else in the map should ever need
 * to know what design system it is sitting in.
 */

export const paint = {
  /** The page under everything, and the top face of every building. */
  surface: 'var(--bg, #ffffff)',
  /** Hairlines: the floor grid, cell borders, the quiet edges. */
  border: 'var(--line, #eef1f6)',
  /** Building walls and inactive strokes. */
  structure: 'var(--muted, #a2a6ae)',

  inkPrimary: 'var(--ink, #22262e)',
  inkSecondary: 'var(--muted, #585b62)',
  inkTertiary: 'var(--muted, #82868e)',

  /** Selection, the active flow, the lit neighborhood. */
  accent: 'var(--acid, #1a7f37)',
  /** The accent at wash strength, for filled plates and chips. */
  accentWash: 'var(--panel, #eaf6ee)',
} as const

/**
 * Type. Three roles only: a title, running prose, and the mono label used for
 * codes, paths and chips. Anything a sentence goes in must not be the mono
 * one — monospace is for names, not for reading.
 */
export const type = {
  title: 'var(--serif, Georgia, "Times New Roman", serif)',
  body: 'var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)',
  mono: 'var(--font-geist-mono, ui-monospace, SFMono-Regular, monospace)',
} as const

/** The house motion curve, and the two durations the map uses. */
export const motion = {
  ease: 'cubic-bezier(0.32, 0.72, 0, 1)',
  /** Enter and exit. */
  base: 200,
  /** Hover, which should feel immediate. */
  hover: 150,
} as const

/** Joins class names, dropping anything falsy. Replace with the repo's own if it has one. */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ')
}
