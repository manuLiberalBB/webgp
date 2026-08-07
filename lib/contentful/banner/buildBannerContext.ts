import type { Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import type { BlockComponentProps } from '@/components/blocks/registry';
import { resolveBannerCardItems } from '@/lib/contentful/banner/resolveBannerCardItems';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveStatisticItems } from '@/lib/contentful/statistic/resolveStatisticItems';
import type { CardFields } from '@/lib/contentful/types/card';
import {
  normalizeBannerVariant,
  type BannerVariant,
} from '@/lib/contentful/banner/bannerVariants';
import type { BannerFields } from '@/lib/contentful/types/banner';
import { isCompactMobileHeroPage } from '@/lib/layout/compactMobileHeroPages';
import type { StatisticItem } from '@/lib/contentful/types/statistic';

export type BannerContext = {
  fields: BannerFields;
  pagePath?: string[];
  contentfulName: string;
  bannerVariant?: BannerVariant;
  sectionId?: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  body?: Document;
  items?: Entry[];
  urlList?: Entry[];
  imageUrl: string;
  imageAlt: string;
  logoUrl?: string;
  logoAlt: string;
  statistics: StatisticItem[];
  qualiaCards: CardFields[];
  compactMobile: boolean;
};

function normalizeSectionId(value?: string): string | undefined {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) return undefined;

  return normalized.replace(/\s+/g, '-');
}

export function buildBannerContext({
  fields,
  pagePath,
}: BlockComponentProps): BannerContext | null {
  const bannerFields = fields as BannerFields;
  const {
    contentfulName,
    bannerVariant,
    sectionId,
    tag,
    title,
    subtitle,
    backgroundImage,
    logo,
    body,
    items,
    urlList,
  } = bannerFields;

  const imageUrl = backgroundImage ? getAssetUrl(backgroundImage) : undefined;
  if (!imageUrl) return null;

  const imageAlt =
    (typeof backgroundImage.fields.title === 'string'
      ? backgroundImage.fields.title
      : undefined) ?? title ?? '';

  const logoUrl = logo ? getAssetUrl(logo) : undefined;
  const logoAlt =
    (typeof logo?.fields.title === 'string' ? logo.fields.title : undefined) ??
    'Qualia Seguros';

  return {
    fields: bannerFields,
    pagePath,
    contentfulName,
    bannerVariant: normalizeBannerVariant(bannerVariant),
    sectionId: normalizeSectionId(sectionId),
    tag,
    title,
    subtitle,
    body,
    items,
    urlList,
    imageUrl,
    imageAlt,
    logoUrl,
    logoAlt,
    statistics: resolveStatisticItems(items),
    qualiaCards: resolveBannerCardItems(items),
    compactMobile: isCompactMobileHeroPage(pagePath),
  };
}
