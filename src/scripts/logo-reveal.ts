/*
 * Logo reveal: each letter of a `[data-logo-reveal]` logo is written in, one after another — no outline shows.
 * Each letter is masked by a thick, invisible brush that follows the letter's writing stroke
 * (`data-logo-stroke`: its centreline, in pen order — e.g. N = up, diagonal down, up); drawing the brush
 * uncovers the solid fill beneath it.
 * Plays once per logo, the first time it's revealed: the navbar logo on load, a footer logo when it first
 * scrolls into view. Masks are removed afterwards, leaving the plain logo. Skipped with reduced motion.
 * Letters are the `[data-logo-letter]` paths in src/assets/logo.svg.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reducedMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

const DRAW = { duration: 0.45, ease: 'power1.inOut' }; // writing time per letter
const STAGGER = 0.18; // letters overlap: the next starts when the previous is ~40% written
// Brush width in logo units (logo is 90 × 20): wider than the ~3.3-unit letter strokes so it uncovers them fully
// (the mask only reveals the letter's own fill, so a wide brush never spills outside the shape).
const BRUSH = 5.2;
const SVG_NS = 'http://www.w3.org/2000/svg';

let uid = 0;

if (!reducedMotion) {
	document.querySelectorAll<HTMLElement>('[data-logo-reveal]').forEach((logo) => {
		const svg = logo.querySelector('svg');
		const letters = [...logo.querySelectorAll<SVGPathElement>('[data-logo-letter]')];
		if (!svg || !letters.length) return;

		const defs = document.createElementNS(SVG_NS, 'defs');
		svg.prepend(defs);

		// One mask per letter: a white stroke along the same path, drawn from zero length
		const brushes = letters.map((letter) => {
			const id = `logo-reveal-${++uid}`;
			const mask = document.createElementNS(SVG_NS, 'mask');
			mask.setAttribute('id', id);
			mask.setAttribute('maskUnits', 'userSpaceOnUse');
			mask.setAttribute('x', '-10');
			mask.setAttribute('y', '-10');
			mask.setAttribute('width', '110');
			mask.setAttribute('height', '40');

			const brush = document.createElementNS(SVG_NS, 'path');
			brush.setAttribute('d', letter.dataset.logoStroke ?? letter.getAttribute('d')!);
			brush.setAttribute('fill', 'none');
			brush.setAttribute('stroke', 'white');
			brush.setAttribute('stroke-width', String(BRUSH));
			brush.setAttribute('stroke-linecap', 'round');
			brush.setAttribute('stroke-linejoin', 'round');
			const length = brush.getTotalLength();
			gsap.set(brush, { strokeDasharray: length, strokeDashoffset: length });

			mask.append(brush);
			defs.append(mask);
			letter.setAttribute('mask', `url(#${id})`);
			return brush;
		});

		const tl = gsap.timeline({
			paused: true,
			// Leave the plain logo behind once every letter is painted in
			onComplete: () => {
				letters.forEach((letter) => letter.removeAttribute('mask'));
				defs.remove();
			},
		});
		brushes.forEach((brush, i) => tl.to(brush, { strokeDashoffset: 0, ...DRAW }, i * STAGGER));

		if (logo.closest('footer')) {
			ScrollTrigger.create({ trigger: logo, start: 'top 95%', once: true, onEnter: () => tl.play() });
		} else {
			tl.play();
		}
	});
}
