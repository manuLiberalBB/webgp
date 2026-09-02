import type { BannerContext } from '@/lib/contentful/banner/buildBannerContext';
import { resolveSectorHeroSubtitle } from '@/lib/contentful/sector/isSectorPage';
import type { FeaturedNewsItem } from '@/lib/news/types';

import { FeaturedNewsHero } from '@/components/news/FeaturedNewsHero';
import { HeroBanner } from '@/components/sections/shared/HeroBanner';

import { HomeHeroCarousel } from './HomeHeroCarousel';

type HomeHeroCarouselSectionProps = {
  featuredNewsHeroItem: FeaturedNewsItem;
  bannerContext: BannerContext;
};

export function HomeHeroCarouselSection({
  featuredNewsHeroItem,
  bannerContext,
}: HomeHeroCarouselSectionProps) {
  const slides = [
    <HeroBanner
      key="cms-hero"
      tag={bannerContext.tag}
      title={bannerContext.title}
      subtitle={resolveSectorHeroSubtitle(
        bannerContext.pagePath,
        bannerContext.subtitle,
      )}
      imageUrl={bannerContext.imageUrl}
      imageAlt={bannerContext.imageAlt}
      pagePath={bannerContext.pagePath}
      id={bannerContext.sectionId}
      priority={bannerContext.isAboveFold}
      embedded
      homeHeroStyle
    />,
    <FeaturedNewsHero
      key="featured-news"
      item={featuredNewsHeroItem}
      embedded
    />,
  ];

  return <HomeHeroCarousel slides={slides} />;
}
