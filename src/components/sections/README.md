# sections — the bands of the page

Each file is one full-width band of the page. The page ([`src/pages/index.astro`](../../pages/index.astro)) stacks
them in this order and fills them with content from Sanity (Studio → Home Page, one tab per section):

| Section | What it is |
|---|---|
| `Hero` | The opening photo with the headline, button and three features |
| `ProductShowcase` | "Discover the right medication": the product carousel |
| `Comparison` | "Noom is more than medication": the comparison table |
| `HowItWorks` | The photo + step accordion; the next section slides up over it on desktop |
| `Science` | The three stat cards with animated charts |
| `Testimonial` | One testimonial card over a still background photo |
| `Articles` | The list of articles |
| `Cta` | The closing "Start your journey" photo with a button |
| `Faq` | Frequently asked questions and the legal footnotes |

The comment at the top of each section describes its fade-in order: that's the place to change timing.
Every section accepts an `id` (for links like `#faq`) and a `class`.
