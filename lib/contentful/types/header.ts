import type { Asset, EntrySkeletonType } from 'contentful';

import type { LinkEntry } from './link';
import type { NavigationMenuEntry } from './navigationMenu';

/**
 * Content type: `header` (Header)
 * @see display field: `contentfulName`
 */
export type HeaderFields = {
  contentfulName: string;
  logo: Asset;
  navigation: NavigationMenuEntry;
  cta?: LinkEntry;
};

export type HeaderEntry = {
  fields: HeaderFields;
};

export type HeaderSkeleton = EntrySkeletonType & {
  contentTypeId: 'header';
  fields: HeaderFields;
};
