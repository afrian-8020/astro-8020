import { createImageUrlBuilder } from '@sanity/image-url';
import { dataset, projectId } from './client';

const builder = createImageUrlBuilder({ projectId, dataset });

/** An image as projected by IMAGE_FIELDS in queries.ts (nullable fields mirror the generated query types) */
export interface SanityImageSource {
	asset: { _id: string; width: number | null; height: number | null } | null;
	alt?: string | null;
	hotspot?: { x: number | null; y: number | null } | null;
}

/** Sanity CDN URL at `width` px (never upscaled), in the best format the browser supports */
export const imageUrl = (image: SanityImageSource, width: number, quality = 90) =>
	builder.image(image.asset!._id).width(width).fit('max').quality(quality).auto('format').url();

/** The editor's hotspot as a CSS object-position, so object-cover crops keep the subject in frame */
export const focalPoint = (image: SanityImageSource) =>
	image.hotspot?.x != null && image.hotspot.y != null
		? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
		: undefined;
