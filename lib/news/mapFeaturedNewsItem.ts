import type { Entry } from 'contentful';

import { getAssetDimensions } from '@/lib/contentful/getAssetDimensions';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CompanyFields } from '@/lib/contentful/types/company';
import type { NewsFields } from '@/lib/contentful/types/news';
import { getNewsPath } from '@/lib/contentful/types/news';

import { normalizeNewsCategory } from '@/lib/contentful/news/normalizeNewsCategory';

import { calculateNewsReadingTimeMinutes } from './readingTime';
import { formatNewsPublishDate } from './formatNewsDate';
import type { FeaturedNewsItem } from './types';

function mapCompanyFromEntry(companies: Entry[] | undefined) {
  const first = companies?.[0];

  if (!first || !('fields' in first)) return undefined;

  const fields = first.fields as CompanyFields;
  const logoUrl = getAssetUrl(fields.logo);

  if (!logoUrl) return undefined;

  const dimensions = getAssetDimensions(fields.logo, { width: 208, height: 46 });

  return {
    name: fields.name,
    logoUrl,
    logoWidth: dimensions.width,
    logoHeight: dimensions.height,
  };
}

export function mapFeaturedNewsItem(
  id: string,
  fields: NewsFields,
  publishedAt?: string,
): FeaturedNewsItem | null {
  const coverImageUrl = getAssetUrl(fields.coverImage);
  if (!coverImageUrl || !fields.path) return null;

  const company = mapCompanyFromEntry(fields.companies);
  const publishDate = formatNewsPublishDate(publishedAt);
  const readingMinutes = calculateNewsReadingTimeMinutes({
    content: fields.content,
    noticeTitle: fields.noticeTitle,
    subtitle: fields.subtitle,
  });

  return {
    id,
    title: fields.noticeTitle,
    subtitle: fields.subtitle,
    coverImageUrl,
    coverImageAlt: fields.noticeTitle,
    href: getNewsPath(fields.path),
    category: normalizeNewsCategory(fields.category),
    companyName: company?.name,
    companyLogoUrl: company?.logoUrl,
    companyLogoWidth: company?.logoWidth,
    companyLogoHeight: company?.logoHeight,
    publishDate,
    publishedAt: publishedAt ?? new Date().toISOString(),
    readingMinutes,
  };
}
