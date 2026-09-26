import { createClient } from '@sanity/client';

// Content is fetched at build time: the site is static, and a publish in the Studio triggers a rebuild
// (repository_dispatch in .github/workflows/deploy.yml). No token: the dataset is public, and only published content is read.
export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
	throw new Error('Missing PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET — copy .env.example to .env');
}

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion: '2026-09-01',
	// Builds read straight from the API so a rebuild right after publishing never gets stale CDN content
	useCdn: false,
	perspective: 'published',
});
