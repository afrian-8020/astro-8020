/*
 * Line-by-line text reveal, one sequence per section.
 *
 * Mark text with `data-reveal` (in a section), or pass a component its `reveal` prop (src/lib/reveal.ts). When 20% of a section has entered the viewport, every marked element
 * inside it fades in line by line, in document order. Lines stay in place — no mask, no movement.
 *
 * Optional timing, per element:
 *   data-reveal-start         start together with the first element of the section
 *   data-reveal-delay="0.08"  start this many seconds after the previous element (default 0.25)
 *   data-reveal-group="name"  consecutive elements with the same group start together
 *
 * Blocks: `data-reveal="block"` (e.g. buttons) fades the element in as a whole, on the same timing.
 * Cards: `data-reveal="card"` fades the element in where it sits. Desktop only (motion.ts) —
 * elsewhere cards simply show.
 *
 * Counters (src/scripts/count.ts): a `[data-count-to]` element inside revealed text shows
 * `data-count-from` while it reveals, then counts up once that element has finished revealing —
 * unless it's marked `data-count-with="image"`, in which case the image reveal starts it.
 *
 * Text is hidden only while `data-reveal-pending` is on <html> (set inline in BaseLayout).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { countUp, resetCounters } from './count';
import { reducedMotion, richMotion } from './motion';

gsap.registerPlugin(ScrollTrigger, SplitText);

const LINE = { duration: 0.6, stagger: 0.1, ease: 'power2.out' };
const DEFAULT_DELAY = 0.25;
// Cards fade on an even in-out curve: an ease-out front-loads the change and reads as a pop, then a drag
const CARD = { duration: 1, ease: 'sine.inOut' };
const done = () => {
	document.documentElement.removeAttribute('data-reveal-pending');
	document.documentElement.dataset.revealReady = '';
};

const init = () => {
	if (reducedMotion) return done();

	document.querySelectorAll<HTMLElement>('main > section').forEach((section) => {
		// Skip text with no layout (hidden slides, rows hidden at this breakpoint) — there are no lines to split
		const targets = [...section.querySelectorAll<HTMLElement>('[data-reveal]')].filter(
			(el) => el.getClientRects().length > 0 && (richMotion || el.dataset.reveal !== 'card'),
		);
		if (!targets.length) return;

		// Counters start from their "from" value; set before splitting so the split (and its revert) keeps it
		targets.forEach(resetCounters);

		// Text splits into lines; blocks animate as one piece. Text holding an image-synced counter is
		// treated as a block too: splitting/reverting would swap out the counter node mid-count.
		const isCard = (el: HTMLElement) => el.dataset.reveal === 'card';
		const isBlock = (el: HTMLElement) => el.dataset.reveal === 'block' || isCard(el) || !!el.querySelector('[data-count-with]');
		const splits = targets.map((el) => (isBlock(el) ? null : SplitText.create(el, { type: 'lines' })));
		// Set the start state now (not on the next tick) so nothing flashes before it's hidden
		splits.forEach((split, i) =>
			// Cards get their own compositor layer while fading, so the browser blends them instead of repainting
			gsap.set(split ? split.lines : targets[i], { autoAlpha: 0, ...(isCard(targets[i]) && { willChange: 'opacity' }) }),
		);

		const tl = gsap.timeline({ paused: true });

		let previousStart = 0;
		splits.forEach((split, i) => {
			const el = targets[i];
			const group = el.dataset.revealGroup;
			const sameGroup = i > 0 && group !== undefined && targets[i - 1].dataset.revealGroup === group;
			const start =
				i === 0 || el.hasAttribute('data-reveal-start')
					? 0
					: sameGroup
						? previousStart
						: previousStart + (Number(el.dataset.revealDelay) || DEFAULT_DELAY);
			tl.to(
				split ? split.lines : el,
				{
					autoAlpha: 1,
					...(isCard(el) ? CARD : LINE),
					// As each element finishes: restore its original markup (so it reflows on resize), then run its counters
					onComplete: () => {
						split?.revert();
						if (isCard(el)) el.style.willChange = '';
						countUp(el, '[data-count-to]:not([data-count-with])');
					},
				},
				start,
			);
			previousStart = start;
		});

		ScrollTrigger.create({ trigger: section, start: '20% bottom', once: true, onEnter: () => tl.play() });
	});

	done();
};

// Split only after webfonts load, otherwise line breaks are measured with fallback metrics
document.fonts.ready.then(init);
