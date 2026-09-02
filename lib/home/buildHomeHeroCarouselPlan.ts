import type { Entry } from 'contentful';

import { buildBannerContext } from '@/lib/contentful/banner/buildBannerContext';
import { BANNER_VARIANTS } from '@/lib/contentful/banner/bannerVariants';
import { isHomePage } from '@/lib/layout/isHomePage';

import { resolveHomeFeaturedNewsHeroItem } from './resolveHomeFeaturedNewsHeroItem';

export type HomeHeroCarouselPlan = {
  carouselInsertIndex: number;
  bannerIndex: number;
  featuredNewsIndex: number;
  bannerEntry: Entry;
  featuredNewsEntry: Entry;
  bannerContext: NonNullable<ReturnType<typeof buildBannerContext>>;
  featuredNewsHeroItem: NonNullable<
    ReturnType<typeof resolveHomeFeaturedNewsHeroItem>
  >;
};

export function buildHomeHeroCarouselPlan(
  content: Entry[],
  pagePath?: string[],
): HomeHeroCarouselPlan | null {
  if (!isHomePage(pagePath)) return null;

  const bannerIndex = content.findIndex(
    (entry) => entry.sys.contentType?.sys.id === 'banner',
  );
  const featuredNewsIndex = content.findIndex(
    (entry) => entry.sys.contentType?.sys.id === 'featuredNews',
  );

  if (bannerIndex === -1 || featuredNewsIndex === -1) return null;

  const bannerEntry = content[bannerIndex];
  const featuredNewsEntry = content[featuredNewsIndex];

  const bannerContext = buildBannerContext({
    fields: bannerEntry.fields as Record<string, unknown>,
    pagePath,
    isAboveFold: true,
  });

  if (!bannerContext) return null;

  const bannerVariant = bannerContext.bannerVariant ?? BANNER_VARIANTS.HERO;
  if (bannerVariant !== BANNER_VARIANTS.HERO) return null;

  const featuredNewsHeroItem = resolveHomeFeaturedNewsHeroItem(featuredNewsEntry);
  if (!featuredNewsHeroItem) return null;

  return {
    carouselInsertIndex: Math.min(bannerIndex, featuredNewsIndex),
    bannerIndex,
    featuredNewsIndex,
    bannerEntry,
    featuredNewsEntry,
    bannerContext,
    featuredNewsHeroItem,
  };
}
