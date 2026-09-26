/*
 * When the animated charts play (src/components/patterns/charts): once, when 20% of the chart has
 * scrolled into view, and again whenever the pointer enters the card (`<figure>`) that holds it.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canHover } from './motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * `sync` redraws anything the timeline renders through onUpdate callbacks (counters, derived
 * geometry): restart() rewinds tweened values without firing those callbacks.
 */
export const playChart = (svg: SVGSVGElement, timeline: gsap.core.Timeline, sync?: () => void) => {
	ScrollTrigger.create({ trigger: svg, start: '20% bottom', once: true, onEnter: () => timeline.play() });
	if (!canHover) return;
	svg.closest('figure')?.addEventListener('mouseenter', () => {
		timeline.restart();
		sync?.();
	});
};
