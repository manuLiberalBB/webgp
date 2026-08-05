import type { Asset, Entry, EntrySkeletonType } from 'contentful';

import type { LinkEntry } from './link';

/**
 * Content type: `sector` (Sector)
 * @see display field: `contentfulName`
 */
export type SectorFields = {
  contentfulName: string;
  name: string;
  companies: Entry[];
  description: string;
  icon: Asset;
  image: Asset;
  /** Entry `link` */
  cta: Entry | LinkEntry;
};

export type SectorEntry = {
  fields: SectorFields;
};

export type SectorSkeleton = EntrySkeletonType & {
  contentTypeId: 'sector';
  fields: SectorFields;
};

export type SectorReference = Entry<SectorSkeleton>;
