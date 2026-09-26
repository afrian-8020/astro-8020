/*
 * Helpers for turning Sanity content into component props.
 * Sanity marks every field as possibly empty; these make the build stop with a clear message
 * instead of quietly rendering a broken page.
 */
import type { Link } from '../lib/types';

/** The value, or stop the build naming the empty field (fill it in the Studio and publish) */
export function need<T>(value: T | null | undefined, field: string): T {
	if (value === null || value === undefined) throw new Error(`Sanity: "${field}" is empty — fill it in the Studio and publish`);
	return value;
}

/** A complete link, or undefined when its label or URL is missing (the component then leaves it out) */
export const link = (value: { label: string | null; href: string | null } | null | undefined): Link | undefined =>
	value?.label && value.href ? { label: value.label, href: value.href } : undefined;
