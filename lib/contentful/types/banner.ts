import type { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * Content type: `banner` (Banner)
 * @see display field: `contentfulName`
 */
export type BannerFields = {
  contentfulName: string;
  /**
   * Stable slug that identifies which banner layout to render.
   * @see BANNER_VARIANTS in lib/contentful/banner/bannerVariants.ts
   */
  bannerVariant?: string;
  /** Optional in-page anchor id for hash navigation (e.g. que-hacemos). */
  sectionId?: string;
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
