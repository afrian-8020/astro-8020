/*
 * Subtle smooth scrolling (Lenis), driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Lenis moves the native scroll position, so CSS scroll-driven animations (stacked sections, parallax,
 * footer reveal) and `position: fixed` / `sticky` elements all follow it.
 * Touch devices keep native scrolling; skipped entirely when the user prefers reduced motion.
 *
 * Other scripts import `lenis` to pause scrolling (e.g. while the mobile menu is open). It's null when inactive.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

export const lenis = reducedMotion ? null : new Lenis({ lerp: 0.1, autoRaf: false });

if (lenis) {
	lenis.on('scroll', ScrollTrigger.update);
	// Lenis runs on GSAP's clock. GSAP's default lag smoothing is kept on purpose: disabling it makes
	// animations jump to their end after a stall (slow first load, returning to a background tab).
	gsap.ticker.add((time) => lenis.raf(time * 1000));
}
