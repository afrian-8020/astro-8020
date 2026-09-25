/*
 * Stacked sections: a section marked `data-stack` slows down (and optionally dims) as it scrolls
 * out, while the next section scrolls at normal speed and slides up over it.
 *
 *   <section data-stack="0.8" data-stack-dim="0.1">
 *     data-stack      how far the section lags behind the scroll: 0 = normal speed, 0.5 = half speed, 0.8 = 20% speed
 *     data-stack-dim  opacity a black overlay grows to while it's covered (0 → value); omit for no dimming
 *
 * The effect starts when the marked section's bottom edge reaches the bottom of the viewport
 * (the next section begins to show) and ends when that edge reaches the top.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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

		// Keep the moving section on its own compositor layer so the drift doesn't repaint every frame
		section.style.willChange = 'transform';

		const tl = gsap.timeline({
			// scrub: 0.4 — a short catch-up smooths the drift instead of mirroring every scroll step 1:1
			scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: 0.4, invalidateOnRefresh: true },
		});
		tl.to(section, { y: () => window.innerHeight * lag, ease: 'none' }, 0);

		if (dim) {
			// Isolate the section so the overlay's z-index can't rise above the section covering it
			if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
			section.style.isolation = 'isolate';
			const overlay = document.createElement('div');
			overlay.setAttribute('aria-hidden', 'true');
			Object.assign(overlay.style, {
				position: 'absolute',
				inset: '0',
				zIndex: '10',
				background: 'var(--color-black)',
				opacity: '0',
				pointerEvents: 'none',
			});
			section.append(overlay);
			tl.to(overlay, { opacity: dim, ease: 'none' }, 0);
		}
	});
}
