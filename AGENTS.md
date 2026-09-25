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
│   ├── sections/    # full page sections composed from patterns/ and ui/ (Hero, Comparison…)
│   └── layout/      # site chrome (Navbar, Footer)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── styles/
│   └── global.css   # Tailwind entry + design tokens
└── assets/
```

## Coding rules

- Astro components by default
- Do not use React unless interaction requires it
- Tailwind for layout and styling
- GSAP for complex animation
- Components should be reusable
- Use semantic HTML
- Mobile-first responsive implementation
- Avoid arbitrary pixel values when a token exists

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
