# Noom Med landing page

Astro + Tailwind site, deployed to GitHub Pages: https://afrian-8020.github.io/astro-8020/

```sh
cp .env.example .env   # Sanity project id + dataset
npm install
npm run dev            # http://localhost:4321
npm run check          # safety check (also runs on GitHub before every deploy)
```

New here? Start with [src/components/README.md](src/components/README.md): how the site is built and where to change what.

## Content (Sanity)

All page copy and photos come from Sanity project `hnwfsxph` (dataset `production`), edited in the standalone
Studio at `../studio-afrian---astro-8020` (`npm run dev` there → http://localhost:3333).

Two documents in the Studio hold the copy: **Home Page** (every section of the page) and **Site Settings** (navigation bar
and footer, shared by every page).

- `src/sanity/queries.ts` — the GROQ queries (`HOME_PAGE_QUERY`, `SITE_SETTINGS_QUERY`)
- `src/sanity/content.ts` — helpers that stop the build with a clear message when a required field is empty
- `src/sanity/sanity.types.ts` — generated types; after changing the schema or a query, run `npm run typegen` in the Studio
- `src/components/ui/SanityImage.astro` — responsive images from the Sanity CDN; the editor's hotspot sets the crop

Content is fetched at build time, so the site updates when it's rebuilt. To rebuild automatically on publish, add a
Sanity webhook (sanity.io/manage → API → Webhooks):

- **URL:** `https://api.github.com/repos/afrian-8020/astro-8020/dispatches` · **Method:** POST
- **Trigger on:** create, update, delete · **Filter:** `_type in ["homePage", "siteSettings", "product", "article", "testimonial"]`
- **Drafts:** off · **Projection:** `{"event_type": "sanity-content"}`
- **HTTP headers:** `Authorization: Bearer <GitHub fine-grained token with Contents: read & write on this repo>`,
  `Accept: application/vnd.github+json`

You can also rebuild by hand from the repo's Actions tab ("Deploy to GitHub Pages" → Run workflow).
