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
import { richMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

const MASK = { duration: 1.1, ease: 'power2.inOut' };
const ZOOM = { duration: 1.4, ease: 'power2.out' };
const HIDDEN = 'inset(0% 0% 100% 0%)';
const SHOWN = 'inset(0% 0% 0% 0%)';

/**
 * The same reveal on demand (e.g. swapping photos): `mask` grows top → bottom while `image` settles from
 * `scale` to 100%. Returns the timeline; `onComplete` runs when the mask is fully open.
 */
export const playImageReveal = (mask: Element, image: Element | null, scale = 1.5, onComplete?: () => void) => {
	const tl = gsap.timeline({ onComplete });
	tl.fromTo(mask, { clipPath: HIDDEN }, { clipPath: SHOWN, ...MASK, overwrite: true }, 0);
	if (image) tl.fromTo(image, { scale }, { scale: 1, ...ZOOM, overwrite: true }, 0);
	return tl;
};

// Desktop only (see motion.ts) — elsewhere images simply show
if (richMotion) {
	document.querySelectorAll<HTMLElement>('[data-image-reveal]').forEach((media) => {
		const image = media.querySelector('img');
		const scale = Number(media.dataset.imageRevealScale) || 1.5;
		const scope = media.closest('[data-count-scope]');
		const synced = '[data-count-to][data-count-with="image"]';
		if (scope) scope.querySelectorAll(synced).forEach((counter) => resetCounters(counter.parentElement!));

		// Start hidden (zero-height mask, zoomed in)
		gsap.set(media, { clipPath: HIDDEN });
		if (image) gsap.set(image, { scale });

		const tl = gsap.timeline({ paused: true }).to(media, { clipPath: SHOWN, ...MASK }, 0);
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
