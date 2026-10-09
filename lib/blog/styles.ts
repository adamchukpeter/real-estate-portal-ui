/**
 * Shared interaction styles for the Blog. Every state keeps its text readable:
 * hover/selected backgrounds are light tints paired with dark text, or solid
 * brand fills paired with the brand foreground.
 */

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-colors ${focusRing}`

/** Primary action: solid brand fill. */
export const brandButton = `${buttonBase} h-11 bg-brand-strong text-brand-foreground hover:bg-brand-strong/90 disabled:cursor-not-allowed disabled:opacity-50`

/** Secondary action: white surface, border, orange hover. */
export const outlineButton = `${buttonBase} h-11 border border-border bg-card text-foreground hover:border-brand hover:bg-brand/5 hover:text-brand-strong`

/** Small orange eyebrow label used across the homepage sections. */
export const eyebrow = 'text-xs font-semibold uppercase tracking-widest text-brand-strong'
