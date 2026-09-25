/*
 * Count-up numbers: `<span data-count-from="10" data-count-to="70">70</span>`.
 * The markup holds the final value (for no-JS / reduced motion); scripts reset it to `from`, then count.
 *
 * Who starts a counter:
 *   (default)                 the text reveal, once the element containing it has revealed
 *   data-count-with="image"   the image reveal inside the same `[data-count-scope]`, when it starts
 */
import { gsap } from 'gsap';

export const COUNT = { duration: 1.4, ease: 'power2.out' };

/** Show the starting value (skipped if the counter already ran) */
export const resetCounters = (root: ParentNode) =>
	root.querySelectorAll<HTMLElement>('[data-count-to]').forEach((counter) => {
		if (!('countStarted' in counter.dataset)) counter.textContent = counter.dataset.countFrom ?? '0';
	});

/** Count up every counter in `root` matching `selector` that hasn't started yet */
export const countUp = (root: ParentNode, selector = '[data-count-to]') =>
	root.querySelectorAll<HTMLElement>(selector).forEach((counter) => {
		if ('countStarted' in counter.dataset) return;
		counter.dataset.countStarted = '';
		const value = { n: Number(counter.dataset.countFrom) || 0 };
		gsap.to(value, { n: Number(counter.dataset.countTo), ...COUNT, onUpdate: () => (counter.textContent = String(Math.round(value.n))) });
	});
