import type { Asset, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import type { ExternalLinkEntry } from './externalLink';
import type { SectorReference } from './sector';

/**
 * Content type: `company` (Empresa)
 * @see display field: `contentfulName`
 */
export type CompanyFields = {
  contentfulName: string;
  name: string;
  tagline: string;
  body?: Document;
  description: string;
  logo: Asset;
  icon?: Asset;
  /** Entry `externalLink` */
  webSiteURL?: ExternalLinkEntry;
  linkedin?: string;
  instagram?: string;
  image: Asset;
  /** Entry `sector` */
  sector?: SectorReference;
};

export type CompanyEntry = {
  fields: CompanyFields;
};

export type CompanySkeleton = EntrySkeletonType & {
  contentTypeId: 'company';
  fields: CompanyFields;
};
