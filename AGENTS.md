## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Project structure

```
src/
├── components/
│   ├── ui/          # primitives — single-purpose, no other components (Button, Badge, IconButton, Container…)
│   ├── patterns/    # composites built from ui/ (ProductCard, Carousel, ComparisonTable…)
│   │   └── charts/  # animated stat graphics for StatCard (DonutChart, CurveChart, BarChart)
│   ├── sections/    # full page sections composed from patterns/ and ui/ (Hero, Comparison…)
│   └── layout/      # site chrome (Navbar, Footer)
├── layouts/
│   └── BaseLayout.astro  # <head>, Navbar + Footer (content from Site Settings in Sanity)
├── pages/
│   └── index.astro  # stacks the sections, maps Home Page content from Sanity to props
├── lib/             # shared types (Link) and the `reveal` prop helper
├── scripts/         # motion: text/image reveal, accordion, charts, stacked sections, smooth scroll
├── sanity/          # client, GROQ queries, generated types, content helpers (need, link)
├── styles/
│   └── global.css   # Tailwind entry + design tokens
└── assets/
```

Each component folder and `src/scripts/` has a plain-language README (start at `src/components/README.md`).
Keep them up to date when adding, renaming or removing a component or script.

## Coding rules

- Astro components by default
- Do not use React unless interaction requires it
- Tailwind for layout and styling
- GSAP for complex animation
- Components should be reusable
- Use semantic HTML
- Mobile-first responsive implementation
- Avoid arbitrary pixel values when a token exists
- Write for non-technical maintainers: obvious placement, plain-language comments, one place per concern
- Every component takes `class` and passes other HTML attributes to its root (`...attrs`)
- Links are the shared `Link` type (`src/lib/types.ts`)
- Section titles use `patterns/SectionHeader.astro`
- Copy lives in Sanity, never hard-coded in components (Home Page for sections, Site Settings for Navbar/Footer)

## Animation rules

- Sections own reveal timing. Patterns and ui never hard-code `data-reveal*`; they expose a `reveal` prop
  (`src/lib/reveal.ts`) that the section sets. In a section's own markup, use `data-reveal` directly.
- Each section's top comment states its fade-in order; update it when the order changes.
- Import `reducedMotion`, `richMotion` and `canHover` from `src/scripts/motion.ts`; don't re-query media.
- Decorative motion is desktop-only (`richMotion`); the HTML must show the final state without JS.
- Check a refactor didn't change the page: `npm run check`, then compare screenshots before/after.

## Design tokens

Tokens live in `src/styles/global.css` (`@theme`) and mirror the Figma style guide:
https://www.figma.com/design/6xMf6H5neLYStir5reraE1/?node-id=26-822

- Prefer semantic colors (`surface`, `ink`, `border-subtle`…) over primitives (`teal-500`…)
- Tailwind's default color palette is removed; only design-system colors exist
- Type styles: `text-h1`–`text-h5`, `text-body-lg|body|body-sm|body-xs`, `text-quote`, `text-eyebrow`
- Headings use `font-display` (Queens Trial); body uses `font-sans` (BDO Grotesk)
- Layout width: wrap section content in `<Container>` — 1392px max content width on desktop (`max-w-content`), fluid with 16px / 24px (sm+) gutters below that

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
