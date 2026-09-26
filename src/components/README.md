# How the site is built

The page is made of building blocks, from small to big, like LEGO:

| Folder | What's in it | Example | Can use |
|---|---|---|---|
| [`ui/`](ui/) | The smallest pieces. One job each. | A button, a badge | Nothing else from here |
| [`patterns/`](patterns/) | Pieces made from `ui/` pieces. | A product card, the FAQ item | `ui/`, other patterns |
| [`sections/`](sections/) | One full band of the page, top to bottom. | The hero, the FAQ section | `patterns/`, `ui/` |
| [`layout/`](layout/) | What appears on every page. | Navigation bar, footer | `patterns/`, `ui/` |

The page itself ([`src/pages/index.astro`](../pages/index.astro)) stacks the sections in order and fills them
with content from Sanity.

**Where does a new piece go?** Ask: is it a single element with one job? → `ui/`. Is it several pieces
working together, used inside a section? → `patterns/`. Is it a whole band of the page? → `sections/`.

## I want to change…

| …this | Where |
|---|---|
| Any words or photos | The Sanity Studio (http://localhost:3333), not the code. **Home Page** for the page, **Site Settings** for the navigation bar and footer. |
| Colors, fonts, text sizes | [`src/styles/global.css`](../styles/global.css) (the design tokens, matching Figma) |
| How a section is laid out | That section's file in [`sections/`](sections/) |
| How every button / card / FAQ item looks | That piece's file in [`ui/`](ui/) or [`patterns/`](patterns/). The change applies everywhere it's used. |
| Which sections the page shows, and their order | [`src/pages/index.astro`](../pages/index.astro) |
| When a section's text fades in | That section's file: each one describes its fade-in order at the top |
| How an animation moves (speed, easing) | [`src/scripts/`](../scripts/) (see its README) |

## Rules every piece follows

- **Content comes in, it isn't written inside.** Components receive their words and images as settings
  ("props"), so the same card can show any product. Copy lives in Sanity.
- **Every piece takes a `class`** for extra styling, and any normal HTML attribute (`id`, `aria-label`,
  `target`…), which lands on its outer element.
- **Sections decide the animation timing.** A piece that can fade in has a `reveal` setting, and the section
  switches it on: `<StatCard reveal>`, or with timing: `<ComparisonTable reveal={{ delay: 0.08 }}>`.
  In a section's own markup, `data-reveal` on a text does the same. Options: [`src/lib/reveal.ts`](../lib/reveal.ts).
- **Links are `{ href, label }`** everywhere (the `Link` type in [`src/lib/types.ts`](../lib/types.ts)).
- **Use design tokens**, not raw colors or pixel sizes, when one exists (`text-h2`, `bg-surface`, `text-ink`…).
- **Works without animation.** The HTML shows everything in its final state; scripts only add motion on top.
  People who turn on "reduce motion" on their device get no decorative animation, and tablets and phones get
  only the text fade-in.
