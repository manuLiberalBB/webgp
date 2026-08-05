import type { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * Content type: `banner` (Banner)
 * @see display field: `contentfulName`
 */
export type BannerFields = {
  contentfulName: string;
  tag?: string;
  title?: string;
  subtitle?: string;
  backgroundImage: Asset;
  logo?: Asset;
  items?: Entry[];
  body?: Document;
  urlList?: Entry[];
};

export type BannerEntry = {
  fields: BannerFields;
};

export type BannerSkeleton = EntrySkeletonType & {
  contentTypeId: 'banner';
  fields: BannerFields;
};

export const STATISTICS_BANNER_CONTENTFUL_NAME = 'BANNER - GRUPO PETERSEN HOY';

export const REGIONAL_REACH_BANNER_CONTENTFUL_NAME =
  'BANNER - ALCANCE ECONOMÍAS REGIONALES';

export const QUALIA_BANNER_CONTENTFUL_NAME = 'BANNER - QUALIA';

export const QUE_HACEMOS_BANNER_CONTENTFUL_NAME = 'BANNER - QUE HACEMOS';

export const QUE_HACEMOS_SECTION_ID = 'que-hacemos';

export function isQueHacemosBannerContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === QUE_HACEMOS_BANNER_CONTENTFUL_NAME ||
    normalized.includes('QUE HACEMOS')
  );
}

export function isStatisticsBannerContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === STATISTICS_BANNER_CONTENTFUL_NAME.toUpperCase() ||
    normalized === REGIONAL_REACH_BANNER_CONTENTFUL_NAME.toUpperCase() ||
    normalized.includes('GRUPO PETERSEN HOY') ||
    (normalized.includes('ALCANCE') && normalized.includes('ECONOM'))
  );
}

export function isQualiaBannerContentfulName(contentfulName?: string): boolean {
  if (!contentfulName) return false;

  const normalized = contentfulName.trim().toUpperCase();

  return (
    normalized === QUALIA_BANNER_CONTENTFUL_NAME ||
    normalized.includes('QUALIA')
  );
}
