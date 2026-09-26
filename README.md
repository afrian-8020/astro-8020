# Noom Med landing page

Astro + Tailwind site, deployed to GitHub Pages: https://afrian-8020.github.io/astro-8020/

```sh
cp .env.example .env   # Sanity project id + dataset
npm install
npm run dev            # http://localhost:4321
```

## Content (Sanity)

All page copy and photos come from Sanity project `hnwfsxph` (dataset `production`), edited in the standalone
Studio at `../studio-afrian---astro-8020` (`npm run dev` there → http://localhost:3333).

- `src/sanity/queries.ts` — the GROQ query for the page (`HOME_PAGE_QUERY`)
- `src/sanity/sanity.types.ts` — generated types; after changing the schema or a query, run `npm run typegen` in the Studio
- `src/components/ui/SanityImage.astro` — responsive images from the Sanity CDN; the editor's hotspot sets the crop

Content is fetched at build time, so the site updates when it's rebuilt. To rebuild automatically on publish, add a
Sanity webhook (sanity.io/manage → API → Webhooks):

- **URL:** `https://api.github.com/repos/afrian-8020/astro-8020/dispatches` · **Method:** POST
- **Trigger on:** create, update, delete · **Filter:** `_type in ["homePage", "product", "article", "testimonial"]`
- **Drafts:** off · **Projection:** `{"event_type": "sanity-content"}`
- **HTTP headers:** `Authorization: Bearer <GitHub fine-grained token with Contents: read & write on this repo>`,
  `Accept: application/vnd.github+json`

You can also rebuild by hand from the repo's Actions tab ("Deploy to GitHub Pages" → Run workflow).
