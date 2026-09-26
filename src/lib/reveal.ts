/*
 * The `reveal` prop: how a section asks a component's text to fade in as the section scrolls into view.
 * Sections decide the timing; components only apply it. Off unless the section passes it.
 *
 *   reveal                          fade in 0.25s after the text before it
 *   reveal={{ delay: 0.08 }}        start this many seconds after the text before it
 *   reveal={{ group: 'features' }}  start together with the texts next to it in the same group
 *   reveal={{ start: true }}        start together with the section's first text
 *
 * Inside a section's own markup, add `data-reveal` to a text element instead.
 * The fade itself: src/scripts/reveal.ts
 */
export type Reveal = boolean | { delay?: number; group?: string; start?: boolean };

/**
 * The data-* attributes src/scripts/reveal.ts reads for a `reveal` prop.
 * `kind`: text fades line by line (default) · `block` fades as one piece (buttons) · `card` fades a whole card (desktop only)
 */
export const revealAttrs = (reveal: Reveal | undefined, kind?: 'block' | 'card') => {
	if (!reveal) return {};
	const timing = reveal === true ? {} : reveal;
	return {
		'data-reveal': kind ?? '',
		'data-reveal-delay': timing.delay,
		'data-reveal-group': timing.group,
		'data-reveal-start': timing.start ? '' : undefined,
	};
};
