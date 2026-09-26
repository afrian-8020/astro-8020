/*
 * Shared motion switches.
 *
 * `reducedMotion` — the user asked the OS for less motion: skip all non-essential animation.
 * `richMotion`    — decorative, scroll-staged effects (section overlap, image reveals, chart
 *                   builds, count-ups). Desktop only (≥ 1024px, Tailwind `lg`) and never with reduced
 *                   motion. The text reveal and interactive transitions (accordions, carousel) run everywhere.
 *
 * Evaluated once on load; matches the `lg` breakpoint used in CSS (see "Stacked sections" in global.css).
 */
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const richMotion = !reducedMotion && window.matchMedia('(min-width: 64rem)').matches;

/** A mouse or trackpad is the main pointer: hover effects apply (touch taps shouldn't trigger them) */
export const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
