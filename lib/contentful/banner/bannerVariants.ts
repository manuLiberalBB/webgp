/**
 * Stable slugs for banner entries.
 * Set `bannerVariant` in Contentful to one of these values.
 */
export const BANNER_VARIANTS = {
  HERO: 'hero',
  STATISTICS: 'statistics',
  QUALIA: 'qualia',
} as const;

export type BannerVariant = (typeof BANNER_VARIANTS)[keyof typeof BANNER_VARIANTS];

const KNOWN_VARIANTS = new Set<string>(Object.values(BANNER_VARIANTS));

export function normalizeBannerVariant(value?: string): BannerVariant | undefined {
  const normalized = value?.trim().toLowerCase();

  if (!normalized || !KNOWN_VARIANTS.has(normalized)) {
    return undefined;
  }

  return normalized as BannerVariant;
}

export function isKnownBannerVariant(value?: string): value is BannerVariant {
  return normalizeBannerVariant(value) !== undefined;
}
