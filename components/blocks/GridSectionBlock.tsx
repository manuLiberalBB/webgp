import Image from 'next/image';
import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import { Suspense } from 'react';

import { Badge } from '@/components/ui/Badge';
import { BankingConnectSection } from '@/components/ui/BankingConnectSection';
import { BankingSustainabilitySection } from '@/components/ui/BankingSustainabilitySection';
import { CtaLinks } from '@/components/ui/CtaLinks';
import { BorderedGridSection } from '@/components/ui/BorderedGridSection';
import { FoundationsConoceCtaCard } from '@/components/ui/FoundationsConoceCtaCard';
import { FoundationsGridSection } from '@/components/ui/FoundationsGridSection';
import { GridCard } from '@/components/ui/GridCard';
import { IconCardGridSection } from '@/components/ui/IconCardGridSection';
import { ImageOverlayGridSection } from '@/components/ui/ImageOverlayGridSection';
import { HiringRoomCtaSection } from '@/components/ui/HiringRoomCtaSection';
import { InPersonDynamicsSection } from '@/components/ui/InPersonDynamicsSection';
import { LogoGridSection } from '@/components/ui/LogoGridSection';
import {
  NewsDetailMoreAboutGroupSection,
  resolveNewsDetailMoreAboutGroupCards,
} from '@/components/ui/NewsDetailMoreAboutGroupSection';
import { RegionalCommitmentSection } from '@/components/ui/RegionalCommitmentSection';
import { ResourceCenterSection } from '@/components/ui/ResourceCenterSection';
import { ProgramsDevelopmentSection } from '@/components/ui/ProgramsDevelopmentSection';
import { SectorsGridSection } from '@/components/ui/SectorsGridSection';
import { StrategicSectorsSection } from '@/components/ui/StrategicSectorsSection';
import { TalentCultureSection } from '@/components/ui/TalentCultureSection';
import { RichText } from '@/components/ui/RichText';
import { resolveFundacionesSectionItems } from '@/lib/contentful/foundations/resolveFundacionesSectionItems';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { getAssetDimensions } from '@/lib/contentful/getAssetDimensions';
import { resolveCompanyLogoGridItems } from '@/lib/contentful/company/resolveCompanyLogoGridItems';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import { resolveSectionVideo } from '@/lib/contentful/video/resolveSectionVideo';
import { resolveSectorGridItems } from '@/lib/contentful/sector/resolveSectorGridItems';
import { resolveStatisticItems } from '@/lib/contentful/statistic/resolveStatisticItems';
import { resolveStrategicSectorGridItems } from '@/lib/contentful/strategicSector/resolveStrategicSectorGridItems';
import { isSectorPage } from '@/lib/contentful/sector/isSectorPage';
import type { CardFields } from '@/lib/contentful/types/card';
import {
  type GridSectionFields,
  isCommunityCommitmentSectionContentfulName,
  isFundacionesCtaSectionContentfulName,
  isFundacionesGrupoPetersenSectionContentfulName,
  isGroupWideCommitmentSectionContentfulName,
  isHiringRoomCtaSectionContentfulName,
  isInPersonDynamicsSectionContentfulName,
  isLogoGridSectionContentfulName,
  isNewsDetailMoreAboutGroupSectionContentfulName,
  isProgramsDevelopmentSectionContentfulName,
  isRegionalEconomiesCommitmentSectionContentfulName,
  isRegionalPresenceSectionContentfulName,
  isBankingConnectSectionContentfulName,
  isBankingSustainabilitySectionContentfulName,
  isBusinessEcosystemSectionContentfulName,
  isComoGeneramosImpactoSectionContentfulName,
  isResourceCenterSectionContentfulName,
  isSectorCompaniesSectionContentfulName,
  isStrategicSectorsSectionContentfulName,
  isTalentCultureSectionContentfulName,
  resolveGridSectionCardStyle,
} from '@/lib/contentful/types/gridSection';
import { isSectorsGridSectionContentfulName } from '@/lib/contentful/types/sectorsGridSection';
import {
  hasNewsEntries,
  mapNewsEntriesToFeaturedItems,
} from '@/lib/news/mapNewsEntriesFromItems';
import { cn } from '@/lib/utils';
import { resolveGridSectionAnchorId } from '@/lib/navigation/resolveGridSectionAnchorId';

import { resolveResourceCenterItems } from '@/lib/contentful/resource/resolveResourceCenterItems';

import { TalentCultureNewsSectionWithFetch } from '@/components/news/TalentCultureNewsSectionWithFetch';
import { YouMayAlsoLikeSection } from '@/components/news/YouMayAlsoLikeSection';

import type { BlockComponentProps } from './registry';
import { CarouselSectionWithFetch } from './CarouselSectionWithFetch';
import { SectorCompaniesSectionWithFetch } from './SectorCompaniesSectionWithFetch';

function GridSectionHeader({
  tag,
  title,
  subtitle,
  iconUrl,
}: {
  tag?: string;
  title?: string;
  subtitle?: string;
  iconUrl?: string;
}) {
  if (!tag && !title && !subtitle && !iconUrl) return null;

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      {tag || iconUrl ? (
        <div className="flex items-center gap-3">
          {iconUrl ? (
            <div className="relative size-8 shrink-0">
              <Image src={iconUrl} alt="" fill className="object-contain" />
            </div>
          ) : null}
          {tag ? <Badge>{tag}</Badge> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 md:gap-6">
        {title ? (
          <h2 className="text-heading text-[2.25rem] leading-tight font-normal tracking-[-0.72px] md:text-5xl md:leading-[3.75rem] md:tracking-[-0.96px]">
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p className="text-body text-lg leading-7 md:text-xl">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

function resolveCardEntries(items?: Entry[]): CardFields[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? []
  );
}

function isImageOverlayGrid(cards: CardFields[]): boolean {
  if (cards.length === 0) return false;

  return cards.every((card) => Boolean(card.image && getAssetUrl(card.image)));
}

function isNewsListingPage(pagePath?: string[]) {
  return pagePath?.length === 1 && pagePath[0] === 'noticias';
}

function resolveImageOverlayGridSectionProps({
  contentfulName,
  title,
  subtitle,
  cards,
  pagePath,
}: {
  contentfulName: string;
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  pagePath?: string[];
}) {
  const isRegionalPresence = isRegionalPresenceSectionContentfulName(contentfulName);
  const isImpactOnNewsPage =
    isNewsListingPage(pagePath) &&
    isComoGeneramosImpactoSectionContentfulName(contentfulName, title);

  return {
    title,
    subtitle,
    cards,
    headerAlign:
      isRegionalPresence || isImpactOnNewsPage ? ('left' as const) : ('center' as const),
    cardLayout:
      isRegionalPresence && cards.length === 5
        ? ('three-two' as const)
        : ('default' as const),
  };
}

function isTalentCultureSection(
  cards: CardFields[],
  contentfulName: string | undefined,
  body: Document | undefined,
): boolean {
  if (body) return false;

  if (isTalentCultureSectionContentfulName(contentfulName)) return true;

  if (cards.length === 0) return false;

  return cards.every(
    (card) =>
      Boolean(card.icon && getAssetUrl(card.icon)) &&
      Boolean(card.title) &&
      Boolean(card.description) &&
      !card.image,
  );
}

function isBorderedCardGrid(
  cards: CardFields[],
  {
    subtitle,
    body,
    contentfulName,
  }: { subtitle?: string; body?: Document; contentfulName?: string },
): boolean {
  if (isCommunityCommitmentSectionContentfulName(contentfulName)) return false;

  if (!subtitle || body) return false;

  return (
    cards.length > 0 &&
    cards.every(
      (card) =>
        Boolean(card.image && getAssetUrl(card.image)) &&
        Boolean(card.title) &&
        Boolean(card.description),
    )
  );
}

function isSectorCompaniesSection(
  pagePath: string[] | undefined,
  contentfulName: string | undefined,
  {
    hasSideImage,
    hasCards,
    body,
    urlList,
  }: {
    hasSideImage: boolean;
    hasCards: boolean;
    body?: Document;
    urlList?: Entry[];
  },
): boolean {
  if (hasSideImage || hasCards) return false;

  if (isSectorCompaniesSectionContentfulName(contentfulName)) return true;

  if (isResourceCenterSectionContentfulName(contentfulName)) return false;

  if (!isSectorPage(pagePath)) return false;

  return !body && !urlList?.length;
}

function isCarouselSection(
  pagePath: string[] | undefined,
  {
    hasSideImage,
    hasCards,
    body,
    urlList,
    hasCompanyItems,
    contentfulName,
  }: {
    hasSideImage: boolean;
    hasCards: boolean;
    body?: Document;
    urlList?: Entry[];
    hasCompanyItems: boolean;
    contentfulName?: string;
  },
): boolean {
  if (hasSideImage || hasCards || isSectorPage(pagePath)) return false;

  if (isBusinessEcosystemSectionContentfulName(contentfulName)) return true;

  return Boolean(body || urlList?.length || hasCompanyItems);
}

export function GridSectionBlock({ fields, pagePath }: BlockComponentProps) {
  const {
    contentfulName,
    tag,
    title,
    subtitle,
    icon,
    body,
    items,
    urlList,
    image,
    backgroundImage,
    cardStyle,
  } = fields as GridSectionFields;

  const imageUrl = image ? getAssetUrl(image) : undefined;
  const imageAlt =
    (typeof image?.fields.title === 'string' ? image.fields.title : undefined) ??
    title ??
    '';
  const backgroundUrl = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  const iconUrl = icon ? getAssetUrl(icon) : undefined;
  const cards = resolveCardEntries(items);
  const resolvedCardStyle = resolveGridSectionCardStyle(cardStyle);
  const sectionId = resolveGridSectionAnchorId({ contentfulName, tag, title });
  const sectorItems = resolveSectorGridItems(items);
  const strategicSectorItems = resolveStrategicSectorGridItems(items);
  const hasSideImage = Boolean(imageUrl);
  const hasCards = cards.length > 0;
  const hasNewsItems = hasNewsEntries(items);
  const companyCarouselItems = resolveCompanyLogoGridItems(items);
  const sectionContext = {
    hasSideImage,
    hasCards,
    subtitle,
    body,
    urlList,
    hasCompanyItems: companyCarouselItems.length > 0,
    contentfulName,
  };
  const isSectorsGridSection = isSectorsGridSectionContentfulName(contentfulName);

  if (!hasSideImage && isSectorsGridSection) {
    return <SectorsGridSection subtitle={subtitle} items={sectorItems} />;
  }

  if (!hasSideImage && isLogoGridSectionContentfulName(contentfulName)) {
    const companyItems = resolveCompanyLogoGridItems(items);

    return <LogoGridSection title={title} items={companyItems} />;
  }

  if (isNewsDetailMoreAboutGroupSectionContentfulName(contentfulName) && hasCards) {
    return (
      <NewsDetailMoreAboutGroupSection
        tag={tag}
        title={title}
        cards={resolveNewsDetailMoreAboutGroupCards(items)}
      />
    );
  }

  if (hasNewsItems && !hasSideImage && !hasCards) {
    const newsItems = mapNewsEntriesToFeaturedItems(items, 3);

    if (newsItems.length > 0) {
      return (
        <YouMayAlsoLikeSection
          items={newsItems}
          title={title ?? 'También puede interesarte'}
        />
      );
    }
  }

  if (isResourceCenterSectionContentfulName(contentfulName)) {
    const resourceItems = resolveResourceCenterItems(items);

    return (
      <ResourceCenterSection
        title={title}
        subtitle={subtitle}
        items={resourceItems}
      />
    );
  }

  if (isSectorCompaniesSection(pagePath, contentfulName, sectionContext)) {
    return (
      <SectorCompaniesSectionWithFetch
        pagePath={pagePath}
        tag={tag}
        title={title}
        subtitle={subtitle}
        urlList={urlList}
        contentItems={items}
      />
    );
  }

  if (isHiringRoomCtaSectionContentfulName(contentfulName)) {
    const ctaLink = urlList?.map(resolveNavLink).find(Boolean) ?? null;

    if (!ctaLink) return null;

    return (
      <HiringRoomCtaSection
        title={title}
        subtitle={subtitle}
        href={ctaLink.href}
        external={ctaLink.isExternal}
      />
    );
  }

  if (isInPersonDynamicsSectionContentfulName(contentfulName)) {
    const sectionVideo =
      resolveSectionVideo(urlList) ?? resolveSectionVideo(items);

    if (!sectionVideo) return null;

    const posterUrl = imageUrl ?? sectionVideo.posterUrl;
    if (!posterUrl) return null;

    return (
      <InPersonDynamicsSection
        title={title}
        subtitle={subtitle}
        posterUrl={posterUrl}
        posterAlt={imageAlt}
        videoEmbedUrl={sectionVideo.embedUrl}
        videoTitle={sectionVideo.title ?? title}
      />
    );
  }

  if (
    isFundacionesGrupoPetersenSectionContentfulName(contentfulName, title)
  ) {
    const { images, ctaCard } = resolveFundacionesSectionItems(items);

    return (
      <FoundationsGridSection
        tag={tag}
        title={title}
        subtitle={subtitle}
        items={images}
        ctaCard={ctaCard}
        sectionId={sectionId}
      />
    );
  }

  if (isFundacionesCtaSectionContentfulName(contentfulName) && cards[0]) {
    return (
      <section className="bg-white px-10 py-10 md:px-layout-x md:py-section-y">
        <div className="mx-auto w-full max-w-content">
          <FoundationsConoceCtaCard fields={cards[0]} />
        </div>
      </section>
    );
  }

  if (
    isRegionalEconomiesCommitmentSectionContentfulName(contentfulName) &&
    imageUrl &&
    body
  ) {
    const statistics = resolveStatisticItems(items);

    return (
      <RegionalCommitmentSection
        tag={tag}
        title={title}
        body={body}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        statistic={statistics[0]}
      />
    );
  }

  if (
    isStrategicSectorsSectionContentfulName(contentfulName) &&
    strategicSectorItems.length > 0
  ) {
    return (
      <StrategicSectorsSection
        title={title}
        subtitle={subtitle}
        items={strategicSectorItems}
      />
    );
  }

  if (isCarouselSection(pagePath, sectionContext)) {
    return (
      <CarouselSectionWithFetch
        source="company"
        title={title}
        subtitle={subtitle}
        body={body}
        urlList={urlList}
        headerTextClassName={
          isBusinessEcosystemSectionContentfulName(contentfulName)
            ? 'text-center md:text-left'
            : undefined
        }
        companyVariant={
          isBusinessEcosystemSectionContentfulName(contentfulName) ? 'cards' : undefined
        }
        items={
          isBusinessEcosystemSectionContentfulName(contentfulName)
            ? companyCarouselItems
            : companyCarouselItems.length > 0
              ? companyCarouselItems
              : undefined
        }
      />
    );
  }

  if (hasCards && !hasSideImage && resolvedCardStyle) {
    if (isProgramsDevelopmentSectionContentfulName(contentfulName, title)) {
      return (
        <ProgramsDevelopmentSection
          tag={tag}
          title={title}
          subtitle={subtitle}
          cards={cards}
          sectionId={sectionId}
        />
      );
    }

    switch (resolvedCardStyle) {
      case 'ImageOverlayCard':
        return (
          <ImageOverlayGridSection
            {...resolveImageOverlayGridSectionProps({
              contentfulName,
              title,
              subtitle,
              cards,
              pagePath,
            })}
          />
        );
      case 'FeatureCard':
        return (
          <BorderedGridSection title={title} subtitle={subtitle} cards={cards} />
        );
      case 'IconCard':
        return (
          <IconCardGridSection title={title} subtitle={subtitle} cards={cards} />
        );
    }
  }

  if (hasCards && !hasSideImage && isImageOverlayGrid(cards)) {
    return (
      <ImageOverlayGridSection
        {...resolveImageOverlayGridSectionProps({
          contentfulName,
          title,
          subtitle,
          cards,
          pagePath,
        })}
      />
    );
  }

  if (hasCards && !hasSideImage && isBorderedCardGrid(cards, { subtitle, body, contentfulName })) {
    return (
      <BorderedGridSection title={title} subtitle={subtitle} cards={cards} />
    );
  }

  if (
    hasSideImage &&
    body &&
    isBankingConnectSectionContentfulName(contentfulName)
  ) {
    return (
      <BankingConnectSection
        title={title}
        body={body}
        imageUrl={imageUrl!}
        imageAlt={imageAlt}
      />
    );
  }

  if (
    hasSideImage &&
    body &&
    hasCards &&
    isBankingSustainabilitySectionContentfulName(contentfulName)
  ) {
    return (
      <BankingSustainabilitySection
        tag={tag}
        title={title}
        body={body}
        imageUrl={imageUrl!}
        imageAlt={imageAlt}
        cards={cards}
      />
    );
  }

  if (hasSideImage && isTalentCultureSection(cards, contentfulName, body)) {
    return (
      <>
        <TalentCultureSection
          title={title}
          subtitle={subtitle}
          imageUrl={imageUrl!}
          imageAlt={imageAlt}
          cards={cards}
          className="pb-0 md:pb-0"
        />
        <Suspense fallback={null}>
          <TalentCultureNewsSectionWithFetch />
        </Suspense>
      </>
    );
  }

  const sideImageDimensions = image
    ? getAssetDimensions(image, { width: 720, height: 412 })
    : null;
  const imageOnLeft = isGroupWideCommitmentSectionContentfulName(
    contentfulName,
    title,
    tag,
  );

  return (
    <section
      className={cn(
        'relative w-full bg-white px-10 py-10 md:px-layout-x md:py-section-y',
        backgroundUrl && 'bg-cover bg-center',
      )}
      style={
        backgroundUrl
          ? { backgroundImage: `url(${backgroundUrl})` }
          : undefined
      }
    >
      <div className="relative mx-auto flex w-full max-w-content flex-col gap-10 md:gap-16">
        {hasSideImage ? (
          <div
            className={cn(
              'flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16',
              imageOnLeft && 'lg:flex-row-reverse',
            )}
          >
            <div className="flex w-full min-w-0 flex-col gap-6 lg:w-[499px] lg:shrink-0">
              <GridSectionHeader
                tag={tag}
                title={title}
                subtitle={subtitle}
                iconUrl={iconUrl}
              />

              {body ? (
                <RichText document={body} className="grid-section-body" />
              ) : null}

              {urlList?.length ? <CtaLinks links={urlList} /> : null}
            </div>

            <div className="flex h-[412px] w-full min-w-0 flex-1 items-center">
              <Image
                src={imageUrl!}
                alt={imageAlt}
                width={sideImageDimensions?.width ?? 720}
                height={sideImageDimensions?.height ?? 412}
                sizes="(min-width: 1024px) 720px, 100vw"
                className="max-h-[412px] w-full rounded-[8px] object-contain"
              />
            </div>
          </div>
        ) : (
          <>
            <GridSectionHeader
              tag={tag}
              title={title}
              subtitle={subtitle}
              iconUrl={iconUrl}
            />

            {body ? <RichText document={body} className="grid-section-body" /> : null}

            {hasCards ? (
              <div
                className={cn(
                  'grid gap-10',
                  cards.length === 1
                    ? 'max-w-3xl'
                    : 'md:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {cards.map((card, index) => (
                  <GridCard key={`${card.contentfulName}-${index}`} fields={card} />
                ))}
              </div>
            ) : null}

            {urlList?.length ? <CtaLinks links={urlList} /> : null}
          </>
        )}
      </div>
    </section>
  );
}
