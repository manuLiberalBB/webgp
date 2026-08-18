import { isCompactMobileHeroPage } from '@/lib/layout/compactMobileHeroPages';
import { isInstitutionalHeroPage } from '@/lib/layout/institutionalHeroPages';

export const COMPACT_LANDING_HERO_ANGULAR_OVERLAY =
  'linear-gradient(1.91deg, rgba(0, 0, 0, 0.70) 41.78%, rgba(0, 0, 0, 0.25) 55.81%)';

export const COMPACT_LANDING_HERO_HORIZONTAL_OVERLAY =
  'linear-gradient(to right, rgba(0, 0, 0, 0.70) 26.923%, rgba(38, 38, 38, 0.53) 70.673%, rgba(102, 102, 102, 0.25) 100%)';

export const COMPACT_LANDING_HERO_OVERLAY = `${COMPACT_LANDING_HERO_HORIZONTAL_OVERLAY}, ${COMPACT_LANDING_HERO_ANGULAR_OVERLAY}`;

export function isCompactLandingHeroPage(pagePath?: string[]): boolean {
  if (isInstitutionalHeroPage(pagePath)) return false;

  return isCompactMobileHeroPage(pagePath);
}
