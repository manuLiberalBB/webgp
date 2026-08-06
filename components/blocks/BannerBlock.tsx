import { HeroBanner } from '@/components/ui/HeroBanner';
import { QualiaBanner } from '@/components/ui/QualiaBanner';
import { StatisticsBanner } from '@/components/ui/StatisticsBanner';
import { RichText } from '@/components/ui/RichText';
import { CtaLinks } from '@/components/ui/CtaLinks';
import { resolveBannerCardItems } from '@/lib/contentful/banner/resolveBannerCardItems';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveStatisticItems } from '@/lib/contentful/statistic/resolveStatisticItems';
import {
  type BannerFields,
  isQualiaBannerContentfulName,
  isQueHacemosBannerContentfulName,
  isStatisticsBannerContentfulName,
  QUE_HACEMOS_SECTION_ID,
} from '@/lib/contentful/types/banner';
import { isCompactMobileHeroPage } from '@/lib/layout/compactMobileHeroPages';

import type { BlockComponent } from './registry';

export const BannerBlock: BlockComponent = ({ fields, pagePath }) => {
  const {
    contentfulName,
    tag,
    title,
    subtitle,
    backgroundImage,
    logo,
    body,
    items,
    urlList,
  } = fields as BannerFields;

  const imageUrl = getAssetUrl(backgroundImage);
  if (!imageUrl) return null;

  const imageAlt =
    (typeof backgroundImage.fields.title === 'string'
      ? backgroundImage.fields.title
      : undefined) ?? title ?? '';

  const logoUrl = logo ? getAssetUrl(logo) : undefined;
  const logoAlt =
    (typeof logo?.fields.title === 'string' ? logo.fields.title : undefined) ??
    'Qualia Seguros';

  const statistics = resolveStatisticItems(items);
  const qualiaCards = resolveBannerCardItems(items);
  const compactMobile = isCompactMobileHeroPage(pagePath);
  const isStatisticsBanner =
    statistics.length > 0 || isStatisticsBannerContentfulName(contentfulName);
  const isQualiaBanner =
    qualiaCards.length > 0 || isQualiaBannerContentfulName(contentfulName);

  if (isQualiaBanner && !isStatisticsBanner) {
    return (
      <QualiaBanner
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        logoUrl={logoUrl}
        logoAlt={logoAlt}
        cards={qualiaCards}
      />
    );
  }

  if (isStatisticsBanner) {
    return (
      <StatisticsBanner
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        statistics={statistics}
        urlList={urlList}
        compactMobile={compactMobile}
      />
    );
  }

  return (
    <div className="flex min-w-0 max-w-full flex-col overflow-x-clip">
      <HeroBanner
        tag={tag}
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        compactMobile={compactMobile}
        id={
          isQueHacemosBannerContentfulName(contentfulName)
            ? QUE_HACEMOS_SECTION_ID
            : undefined
        }
      />

      {body || urlList?.length ? (
        <div className="bg-surface mx-auto w-full max-w-content px-10 py-10 md:px-layout-x">
          {body ? <RichText document={body} className="rich-text-banner-body" /> : null}
          {urlList?.length ? <CtaLinks links={urlList} className="mt-8" /> : null}
        </div>
      ) : null}
    </div>
  );
};
