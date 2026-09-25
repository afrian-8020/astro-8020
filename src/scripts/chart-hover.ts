/*
 * Replays a chart's animation when the pointer enters the card (`<figure>`) that holds it.
 * Pointer devices only — touch taps shouldn't restart animations.
 */
import type { gsap } from 'gsap';

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * `sync` redraws anything the timeline renders through onUpdate callbacks (counters, derived
 * geometry): restart() rewinds tweened values without firing those callbacks.
 */
export const replayOnHover = (svg: SVGSVGElement, timeline: gsap.core.Timeline, sync?: () => void) => {
	if (!canHover) return;
	svg.closest('figure')?.addEventListener('mouseenter', () => {
		timeline.restart();
		sync?.();
	});
};
