import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { HeroImage } from '@/components/cms/AppImage';

import { BankingConnectSection } from '@/components/sections/banking/BankingConnectSection';
import { BankingSustainabilitySection } from '@/components/sections/banking/BankingSustainabilitySection';
import { FoundationsConoceCtaCard } from '@/components/sections/foundations/FoundationsConoceCtaCard';
import { FoundationsGridSection } from '@/components/sections/foundations/FoundationsGridSection';
import { ProgramsDevelopmentSection } from '@/components/sections/programs/ProgramsDevelopmentSection';
import { RegionalCommitmentSection } from '@/components/sections/regional/RegionalCommitmentSection';
import { ResourceCenterSection } from '@/components/sections/resources/ResourceCenterSection';
import { SectorsGridSection } from '@/components/sections/sectors/SectorsGridSection';
import { BorderedGridSection } from '@/components/sections/shared/BorderedGridSection';
import { CarouselSectionWithFetch } from '@/components/blocks/CarouselSectionWithFetch';
import { SectorCompaniesSectionWithFetch } from '@/components/blocks/SectorCompaniesSectionWithFetch';
import { HiringRoomCtaSection } from '@/components/sections/shared/HiringRoomCtaSection';
import { IconCardGridSection } from '@/components/sections/shared/IconCardGridSection';
import { ImageOverlayGridSection } from '@/components/sections/shared/ImageOverlayGridSection';
import { InPersonDynamicsSection } from '@/components/sections/shared/InPersonDynamicsSection';
import { LogoGridSection } from '@/components/sections/shared/LogoGridSection';
import { StrategicSectorsSection } from '@/components/sections/strategic-sectors/StrategicSectorsSection';
import { TalentCultureSection } from '@/components/sections/talent/TalentCultureSection';
import {
  NewsDetailMoreAboutGroupSectionWithFetch,
} from '@/components/news/NewsDetailMoreAboutGroupSectionWithFetch';
import { TalentCultureNewsSectionWithFetch } from '@/components/news/TalentCultureNewsSectionWithFetch';
import { YouMayAlsoLikeSection } from '@/components/news/YouMayAlsoLikeSection';
import { RichText } from '@/components/cms/RichText';
import { CtaLinks } from '@/components/ui/CtaLinks';
import { GridCard } from '@/components/ui/GridCard';
import { resolveFundacionesSectionItems } from '@/lib/contentful/foundations/resolveFundacionesSectionItems';
import { resolveCompanyLogoGridItems } from '@/lib/contentful/company/resolveCompanyLogoGridItems';
import type { GridSectionContext } from '@/lib/contentful/gridSection/buildGridSectionContext';
import {
  isGroupWideCommitmentLayout,
  resolveImageOverlayGridSectionProps,
} from '@/lib/contentful/gridSection/gridSectionHelpers';
import {
  GRID_SECTION_VARIANTS,
  type GridSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';
import { resolveResourceCenterItems } from '@/lib/contentful/resource/resolveResourceCenterItems';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import { resolveSectionVideo } from '@/lib/contentful/video/resolveSectionVideo';
import { resolveStatisticItems } from '@/lib/contentful/statistic/resolveStatisticItems';
import { mapNewsEntriesToFeaturedItems } from '@/lib/news/mapNewsEntriesFromItems';
import { cn } from '@/lib/utils';

import { GridSectionHeader } from './GridSectionHeader';

function renderImageOverlayGrid(ctx: GridSectionContext) {
  return (
    <ImageOverlayGridSection
      {...resolveImageOverlayGridSectionProps({
        title: ctx.title,
        subtitle: ctx.subtitle,
        cards: ctx.cards,
        pagePath: ctx.pagePath,
      })}
    />
  );
}

function renderCarousel(ctx: GridSectionContext, variant: GridSectionVariant) {
  const isBusinessEcosystem = variant === GRID_SECTION_VARIANTS.BUSINESS_ECOSYSTEM;

  return (
    <CarouselSectionWithFetch
      source="company"
      title={ctx.title}
      subtitle={ctx.subtitle}
      body={ctx.body}
      urlList={ctx.urlList}
      headerTextClassName={
        isBusinessEcosystem ? 'text-center md:text-left' : undefined
      }
      items={
        ctx.companyCarouselItems.length > 0 ? ctx.companyCarouselItems : undefined
      }
    />
  );
}

export const gridSectionRenderers: Record<
  GridSectionVariant,
  (ctx: GridSectionContext) => ReactNode
> = {
  [GRID_SECTION_VARIANTS.SECTORS_GRID]: (ctx) => (
    <SectorsGridSection subtitle={ctx.subtitle} items={ctx.sectorItems} />
  ),

  [GRID_SECTION_VARIANTS.LOGO_GRID]: (ctx) => (
    <LogoGridSection
      title={ctx.title}
      items={resolveCompanyLogoGridItems(ctx.items)}
    />
  ),

  [GRID_SECTION_VARIANTS.NEWS_DETAIL_MORE_ABOUT_GROUP]: (ctx) => (
    <Suspense fallback={null}>
      <NewsDetailMoreAboutGroupSectionWithFetch
        tag={ctx.tag}
        title={ctx.title}
      />
    </Suspense>
  ),

  [GRID_SECTION_VARIANTS.YOU_MAY_ALSO_LIKE]: (ctx) => {
    const newsItems = mapNewsEntriesToFeaturedItems(ctx.items, 3);

    if (newsItems.length === 0) return null;

    return (
      <YouMayAlsoLikeSection
        items={newsItems}
        title={ctx.title ?? 'También puede interesarte'}
      />
    );
  },

  [GRID_SECTION_VARIANTS.RESOURCE_CENTER]: (ctx) => (
    <ResourceCenterSection
      title={ctx.title}
      subtitle={ctx.subtitle}
      items={resolveResourceCenterItems(ctx.items)}
    />
  ),

  [GRID_SECTION_VARIANTS.SECTOR_COMPANIES]: (ctx) => (
    <SectorCompaniesSectionWithFetch
      pagePath={ctx.pagePath}
      tag={ctx.tag}
      title={ctx.title}
      subtitle={ctx.subtitle}
      urlList={ctx.urlList}
      contentItems={ctx.items}
    />
  ),

  [GRID_SECTION_VARIANTS.HIRING_ROOM_CTA]: (ctx) => {
    const ctaLink = ctx.urlList?.map(resolveNavLink).find(Boolean) ?? null;

    if (!ctaLink) return null;

    return (
      <HiringRoomCtaSection
        title={ctx.title}
        subtitle={ctx.subtitle}
        href={ctaLink.href}
        external={ctaLink.isExternal}
      />
    );
  },

  [GRID_SECTION_VARIANTS.IN_PERSON_DYNAMICS]: (ctx) => {
    const sectionVideo =
      resolveSectionVideo(ctx.urlList) ?? resolveSectionVideo(ctx.items);

    if (!sectionVideo) return null;

    const posterUrl = ctx.imageUrl ?? sectionVideo.posterUrl;
    if (!posterUrl) return null;

    return (
      <InPersonDynamicsSection
        title={ctx.title}
        subtitle={ctx.subtitle}
        posterUrl={posterUrl}
        posterAlt={ctx.imageAlt}
        videoEmbedUrl={sectionVideo.embedUrl}
        videoTitle={sectionVideo.title ?? ctx.title}
      />
    );
  },

  [GRID_SECTION_VARIANTS.FUNDACIONES_GRUPO_PETERSEN]: (ctx) => {
    const { images, ctaCard } = resolveFundacionesSectionItems(ctx.items);

    return (
      <FoundationsGridSection
        tag={ctx.tag}
        title={ctx.title}
        subtitle={ctx.subtitle}
        items={images}
        ctaCard={ctaCard}
        sectionId={ctx.sectionId}
      />
    );
  },

  [GRID_SECTION_VARIANTS.FUNDACIONES_CTA]: (ctx) => {
    const card = ctx.cards[0];
    if (!card) return null;

    return (
      <section className="bg-white px-6 pt-0 pb-10 md:px-layout-x md:pt-0 md:pb-section-y">
        <div className="mx-auto w-full max-w-content">
          <FoundationsConoceCtaCard fields={card} />
        </div>
      </section>
    );
  },

  [GRID_SECTION_VARIANTS.REGIONAL_ECONOMIES_COMMITMENT]: (ctx) => {
    const statistics = resolveStatisticItems(ctx.items);

    return (
      <RegionalCommitmentSection
        tag={ctx.tag}
        title={ctx.title}
        body={ctx.body!}
        imageUrl={ctx.imageUrl!}
        imageAlt={ctx.imageAlt}
        statistic={statistics[0]}
        imagePriority={ctx.isAboveFold}
      />
    );
  },

  [GRID_SECTION_VARIANTS.STRATEGIC_SECTORS]: (ctx) => (
    <StrategicSectorsSection
      title={ctx.title}
      subtitle={ctx.subtitle}
      items={ctx.strategicSectorItems}
    />
  ),

  [GRID_SECTION_VARIANTS.BUSINESS_ECOSYSTEM]: (ctx) =>
    renderCarousel(ctx, GRID_SECTION_VARIANTS.BUSINESS_ECOSYSTEM),

  [GRID_SECTION_VARIANTS.CAROUSEL]: (ctx) =>
    renderCarousel(ctx, GRID_SECTION_VARIANTS.CAROUSEL),

  [GRID_SECTION_VARIANTS.PROGRAMS_DEVELOPMENT]: (ctx) => (
    <ProgramsDevelopmentSection
      tag={ctx.tag}
      title={ctx.title}
      subtitle={ctx.subtitle}
      cards={ctx.cards}
      sectionId={ctx.sectionId}
    />
  ),

  [GRID_SECTION_VARIANTS.IMAGE_OVERLAY_GRID]: renderImageOverlayGrid,

  [GRID_SECTION_VARIANTS.BORDERED_GRID]: (ctx) => (
    <BorderedGridSection
      title={ctx.title}
      subtitle={ctx.subtitle}
      cards={ctx.cards}
    />
  ),

  [GRID_SECTION_VARIANTS.ICON_CARD_GRID]: (ctx) => (
    <IconCardGridSection
      title={ctx.title}
      subtitle={ctx.subtitle}
      cards={ctx.cards}
    />
  ),

  [GRID_SECTION_VARIANTS.BANKING_CONNECT]: (ctx) => (
    <BankingConnectSection
      title={ctx.title}
      body={ctx.body!}
      imageUrl={ctx.imageUrl!}
      imageAlt={ctx.imageAlt}
      imagePriority={ctx.isAboveFold}
    />
  ),

  [GRID_SECTION_VARIANTS.BANKING_SUSTAINABILITY]: (ctx) => (
    <BankingSustainabilitySection
      tag={ctx.tag}
      title={ctx.title}
      body={ctx.body!}
      imageUrl={ctx.imageUrl!}
      imageAlt={ctx.imageAlt}
      cards={ctx.cards}
      imagePriority={ctx.isAboveFold}
    />
  ),

  [GRID_SECTION_VARIANTS.TALENT_CULTURE]: (ctx) => (
    <>
      <TalentCultureSection
        title={ctx.title}
        subtitle={ctx.subtitle}
        imageUrl={ctx.imageUrl!}
        imageAlt={ctx.imageAlt}
        cards={ctx.cards}
        className="pb-0 md:pb-0"
        imagePriority={ctx.isAboveFold}
      />
      <Suspense fallback={null}>
        <TalentCultureNewsSectionWithFetch />
      </Suspense>
    </>
  ),

  [GRID_SECTION_VARIANTS.I3_INNOVATION]: () => null,
  [GRID_SECTION_VARIANTS.I3_CONVERSATIONS]: () => null,

  [GRID_SECTION_VARIANTS.DEFAULT]: (ctx) => {
    const imageOnLeft = isGroupWideCommitmentLayout(ctx.title, ctx.tag);

    return (
      <section
        className={cn(
          'relative w-full bg-white px-6 py-10 md:px-layout-x md:py-section-y',
          ctx.backgroundUrl && 'bg-cover bg-center',
        )}
        style={
          ctx.backgroundUrl
            ? { backgroundImage: `url(${ctx.backgroundUrl})` }
            : undefined
        }
      >
        <div className="relative mx-auto flex w-full max-w-content flex-col gap-10 md:gap-16">
          {ctx.hasSideImage ? (
            <div
              className={cn(
                'flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16',
                imageOnLeft && 'lg:flex-row-reverse',
              )}
            >
              <div className="flex w-full min-w-0 flex-col gap-6 lg:w-[499px] lg:shrink-0">
                <GridSectionHeader
                  tag={ctx.tag}
                  title={ctx.title}
                  subtitle={ctx.subtitle}
                  iconUrl={ctx.iconUrl}
                />

                {ctx.body ? (
                  <RichText document={ctx.body} className="grid-section-body" />
                ) : null}

                {ctx.urlList?.length ? <CtaLinks links={ctx.urlList} /> : null}
              </div>

              <div className="relative h-[412px] w-full min-w-0 flex-1 overflow-hidden rounded-lg">
                <HeroImage
                  src={ctx.imageUrl!}
                  alt={ctx.imageAlt}
                  fill
                  priority={ctx.isAboveFold}
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <>
              <GridSectionHeader
                tag={ctx.tag}
                title={ctx.title}
                subtitle={ctx.subtitle}
                iconUrl={ctx.iconUrl}
              />

              {ctx.body ? (
                <RichText document={ctx.body} className="grid-section-body" />
              ) : null}

              {ctx.hasCards ? (
                <div
                  className={cn(
                    'grid gap-10',
                    ctx.cards.length === 1
                      ? 'max-w-3xl'
                      : 'layout-md:grid-cols-2 layout-lg:grid-cols-3',
                  )}
                >
                  {ctx.cards.map((card, index) => (
                    <GridCard key={`${card.contentfulName}-${index}`} fields={card} />
                  ))}
                </div>
              ) : null}

              {ctx.urlList?.length ? <CtaLinks links={ctx.urlList} /> : null}
            </>
          )}
        </div>
      </section>
    );
  },
};
