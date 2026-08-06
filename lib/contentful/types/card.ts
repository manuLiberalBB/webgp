import type { Asset, Entry, EntrySkeletonType } from 'contentful';

/**
 * Content type: `card` (Card)
 * @see display field: `contentfulName`
 */
export type CardFields = {
  contentfulName: string;
  title?: string;
  description?: string;
  /** Texto extendido opcional; solo se usa donde el layout lo soporte. */
  longDescription?: string;
  icon?: Asset;
  /** `link` o `externalLink` */
  url?: Entry[];
  image?: Asset;
  tag?: string;
};

export type CardEntry = {
  fields: CardFields;
};

export type CardSkeleton = EntrySkeletonType & {
  contentTypeId: 'card';
  fields: CardFields;
};
