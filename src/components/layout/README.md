# layout — on every page

| Piece | What it is |
|---|---|
| `Navbar` | The top bar: logo, menu links, button, and the mobile menu. On the home page it starts see-through over the hero and turns white once you scroll past it. |
| `Footer` | Link columns, legal links, social icons and the copyright line |

Their words and links come from Sanity (Studio → **Site Settings**). They're placed on every page by
[`src/layouts/BaseLayout.astro`](../../layouts/BaseLayout.astro), which also fetches that content.
