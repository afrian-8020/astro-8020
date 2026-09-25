/*
 * Image reveal: when 20% of a `data-image-reveal` container is in view, a mask grows from zero to
 * full height (top → bottom) while the image inside settles from a zoom to 100%. Plays once.
 *
 *   <div class="relative overflow-hidden" data-image-reveal>
 *     <img … />               ← the first <img> inside is the one that zooms
 *   </div>
 *
 * Optional: data-image-reveal-scale="1.5" (starting zoom, default 1.5).
 * Counters marked `data-count-with="image"` inside the same `[data-count-scope]` start counting
 * the moment this reveal starts (see src/scripts/count.ts).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { countUp, resetCounters } from './count';

gsap.registerPlugin(ScrollTrigger);

const MASK = { duration: 1.1, ease: 'power2.inOut' };
const ZOOM = { duration: 1.4, ease: 'power2.out' };

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((media) => {
		const image = media.querySelector('img');
		const scale = Number(media.dataset.imageRevealScale) || 1.5;
		const scope = media.closest('[data-count-scope]');
		const synced = '[data-count-to][data-count-with="image"]';
		if (scope) scope.querySelectorAll(synced).forEach((counter) => resetCounters(counter.parentElement!));

		// Start hidden (zero-height mask, zoomed in)
		gsap.set(media, { clipPath: 'inset(0% 0% 100% 0%)' });
		if (image) gsap.set(image, { scale });

		const tl = gsap.timeline({ paused: true }).to(media, { clipPath: 'inset(0% 0% 0% 0%)', ...MASK }, 0);
		if (image) tl.to(image, { scale: 1, ...ZOOM }, 0);

		ScrollTrigger.create({
			trigger: media,
			start: '20% bottom',
			once: true,
			onEnter: () => {
				tl.play();
				if (scope) countUp(scope, synced);
			},
		});
	});
}
