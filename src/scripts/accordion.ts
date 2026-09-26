/*
 * Open / close animation shared by the accordions (FAQ, "How it works" steps): the panel's height and
 * opacity ease between zero and their natural size. Instant when the user prefers reduced motion.
 */
import { gsap } from 'gsap';
import { reducedMotion } from './motion';

export const ACCORDION = { duration: reducedMotion ? 0 : 0.5, ease: 'power2.inOut' };

export const expandPanel = (panel: HTMLElement) =>
	gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, ...ACCORDION, overwrite: true });

export const collapsePanel = (panel: HTMLElement, onComplete?: () => void) =>
	gsap.to(panel, { height: 0, opacity: 0, ...ACCORDION, overwrite: true, onComplete });
