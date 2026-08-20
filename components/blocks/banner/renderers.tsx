import type { ReactNode } from 'react';

import { HeroBanner } from '@/components/sections/shared/HeroBanner';
import { QualiaBanner } from '@/components/sections/shared/QualiaBanner';
import { StatisticsBanner } from '@/components/sections/shared/StatisticsBanner';
import { RichText } from '@/components/cms/RichText';
import { CtaLinks } from '@/components/ui/CtaLinks';
import type { BannerContext } from '@/lib/contentful/banner/buildBannerContext';
import {
  BANNER_VARIANTS,
  type BannerVariant,
} from '@/lib/contentful/banner/bannerVariants';

function renderHeroBanner(ctx: BannerContext) {
  return (
    <div className="flex min-w-0 max-w-full flex-col overflow-x-clip">
      <HeroBanner
        tag={ctx.tag}
        title={ctx.title}
        subtitle={ctx.subtitle}
        imageUrl={ctx.imageUrl}
        imageAlt={ctx.imageAlt}
        compactMobile={ctx.compactMobile}
        pagePath={ctx.pagePath}
        id={ctx.sectionId}
        priority={ctx.isAboveFold}
      />

      {ctx.body || ctx.urlList?.length ? (
        <div className="bg-surface mx-auto w-full max-w-content px-6 py-10 md:px-layout-x">
          {ctx.body ? (
            <RichText document={ctx.body} className="rich-text-banner-body" />
          ) : null}
          {ctx.urlList?.length ? <CtaLinks links={ctx.urlList} className="mt-8" /> : null}
        </div>
      ) : null}
    </div>
  );
}

export const bannerRenderers: Record<BannerVariant, (ctx: BannerContext) => ReactNode> = {
  [BANNER_VARIANTS.HERO]: renderHeroBanner,

  [BANNER_VARIANTS.STATISTICS]: (ctx) => (
    <StatisticsBanner
      title={ctx.title}
      subtitle={ctx.subtitle}
      imageUrl={ctx.imageUrl}
      imageAlt={ctx.imageAlt}
      statistics={ctx.statistics}
      urlList={ctx.urlList}
      compactMobile={ctx.compactMobile}
      priority={ctx.isAboveFold}
    />
  ),

  [BANNER_VARIANTS.QUALIA]: (ctx) => (
    <QualiaBanner
      title={ctx.title}
      subtitle={ctx.subtitle}
      imageUrl={ctx.imageUrl}
      imageAlt={ctx.imageAlt}
      logoUrl={ctx.logoUrl}
      logoAlt={ctx.logoAlt}
      cards={ctx.qualiaCards}
      priority={ctx.isAboveFold}
    />
  ),
};
