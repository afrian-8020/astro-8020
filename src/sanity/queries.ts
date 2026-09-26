import { defineQuery } from 'groq';

// Every image carries what SanityImage needs: dimensions (for width/height and srcset), alt text and the hotspot
const IMAGE_FIELDS = /* groq */ `{
	"asset": asset->{ _id, url, "width": metadata.dimensions.width, "height": metadata.dimensions.height, "lqip": metadata.lqip },
	alt,
	hotspot { x, y }
}`;

const LINK_FIELDS = /* groq */ `{ label, href }`;

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "homePage"][0]{
	hero {
		badge, heading, description,
		cta ${LINK_FIELDS},
		image ${IMAGE_FIELDS},
		benefits[] { _key, title, description }
	},
	productShowcase {
		heading, description,
		browseLink ${LINK_FIELDS},
		products[]->{
			_id, name, registered,
			tags[] { _key, label, kind },
			image ${IMAGE_FIELDS},
			disclosure ${LINK_FIELDS},
			primaryCta ${LINK_FIELDS},
			secondaryCta ${LINK_FIELDS}
		}
	},
	comparison {
		heading, description, alternativeLabel,
		features[] { _key, feature, includedWithNoom, includedWithAlternative },
		ctaText,
		cta ${LINK_FIELDS}
	},
	howItWorks {
		eyebrow, heading,
		steps[] { _key, title, description, image ${IMAGE_FIELDS} }
	},
	science {
		heading, description,
		stats[] { _key, caption, chart, figure, figureLabel, baselineLabel, highlightLabel }
	},
	testimonialSection {
		background ${IMAGE_FIELDS},
		testimonial->{ author, quote, portrait ${IMAGE_FIELDS}, result { value, label, countFrom } }
	},
	articlesSection {
		heading, description,
		moreLink ${LINK_FIELDS},
		articles[]->{ _id, title, url, publishedAt, image ${IMAGE_FIELDS} }
	},
	callToAction {
		heading, description,
		cta ${LINK_FIELDS},
		image ${IMAGE_FIELDS}
	},
	faq {
		heading,
		questions[] { _key, question, answer },
		footnotes
	},
	seo { title, description }
}`);

// Navigation bar and footer, shared by every page
export const SITE_SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
	navigation {
		links[] { _key, label, href, hasMenu },
		cta ${LINK_FIELDS}
	},
	footer {
		columns[] { _key, title, links[] { _key, label, href } },
		legalLinks[] { _key, label, href },
		socialLinks[] { _key, platform, href },
		copyright
	}
}`);
