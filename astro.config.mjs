// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this repo from /astro-8020/. Only apply that base when building in GitHub Actions,
// so local dev stays at the root. Link to internal pages via import.meta.env.BASE_URL.
const onGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: 'https://afrian-8020.github.io',
  base: onGitHubPages ? '/astro-8020/' : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});
