/*
 * Stacked sections: a section marked `data-stack` slows down (and optionally dims) as it scrolls
 * out, while the next section scrolls at normal speed and slides up over it.
 *
 *   <section data-stack="0.5" data-stack-dim="0.4">
 *     data-stack      how far the section lags behind the scroll: 0 = normal speed, 0.5 = half speed, 0.8 = 20% speed
 *     data-stack-dim  opacity a black overlay grows to while it's covered (0 → value); omit for no dimming
 *
 * The effect starts when the marked section's bottom edge reaches the bottom of the viewport
 * (the next section begins to show) and ends when that edge reaches the top.
 *
 * Motion runs as a CSS scroll-driven animation where supported (see "Stacked sections" in
 * global.css): the compositor moves it in the same frame as the scroll, so it can't lag or jitter.
 * This script only sets it up — plus a GSAP fallback for browsers without scroll timelines.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { richMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const cssScrollTimelines = CSS.supports('animation-timeline: view()');

// Desktop only (see motion.ts); the CSS version is gated by the same breakpoint
if (richMotion) {
	document.querySelectorAll<HTMLElement>('[data-stack]').forEach((section) => {
		// Next content section — skip <script>/<style> tags components can leave between sections
		let next = section.nextElementSibling as HTMLElement | null;
		while (next && ['SCRIPT', 'STYLE', 'TEMPLATE'].includes(next.tagName)) next = next.nextElementSibling as HTMLElement | null;
		if (!next) return;

		// The next section must paint above the one it covers
		next.style.position ||= 'relative';
		next.style.zIndex = '1';

		const lag = clamp01(Number(section.dataset.stack) || 0.5);
		const dim = clamp01(Number(section.dataset.stackDim) || 0);
		section.style.setProperty('--stack-lag', String(lag));
		section.style.setProperty('--stack-dim', String(dim));

		let overlay: HTMLElement | null = null;
		if (dim) {
			// Isolate the section so the overlay's z-index can't rise above the section covering it
			if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
			section.style.isolation = 'isolate';
			overlay = document.createElement('div');
			overlay.setAttribute('aria-hidden', 'true');
			overlay.dataset.stackOverlay = '';
			Object.assign(overlay.style, {
				position: 'absolute',
				inset: '0',
				zIndex: '10',
				background: 'var(--color-black)',
				opacity: '0',
				pointerEvents: 'none',
			});
			section.append(overlay);
		}

		// CSS drives it from here (global.css keys off [data-stack] / [data-stack-overlay])
		if (cssScrollTimelines) return;

		// Fallback: tie the drift directly to scroll (no catch-up smoothing, which reads as floaty)
		section.style.willChange = 'transform';
		const tl = gsap.timeline({
			scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
		});
		tl.to(section, { y: () => window.innerHeight * lag, ease: 'none' }, 0);
		if (overlay) tl.to(overlay, { opacity: dim, ease: 'none' }, 0);
	});
}
