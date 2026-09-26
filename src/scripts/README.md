# scripts — animations and motion

The motion on the site. Components switch these on with `data-*` markers or settings; the files here decide
how things move. Numbers like durations (seconds) and eases sit at the top of each file.

| File | What it does |
|---|---|
| `motion.ts` | The switches everything respects: "reduce motion" on the visitor's device, desktop-only effects, hover support |
| `reveal.ts` | Text fading in line by line as each section scrolls into view (timing set per section, see `src/lib/reveal.ts`) |
| `image-reveal.ts` | Photos appearing through a growing mask while they settle from a zoom |
| `count.ts` | Numbers counting up (the testimonial's "70lbs") |
| `accordion.ts` | The open / close movement shared by the FAQ and "How it works" |
| `chart-motion.ts` | When the Science charts play and replay |
| `stack.ts` | "How it works" slowing down and dimming while the next section slides over it |
| `logo-reveal.ts` | The logo drawing itself letter by letter |
| `smooth-scroll.ts` | Subtle smooth scrolling on desktop |

Parallax backgrounds, the stacked sections and the footer reveal are pure CSS, in
[`src/styles/global.css`](../styles/global.css).

Decorative effects only run on desktop (1024px and wider). Tablets and phones get the text fade-in, and nothing
decorative runs for visitors who turned on "reduce motion".
