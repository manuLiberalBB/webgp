import type { Asset, EntrySkeletonType } from 'contentful';

import type { LinkEntry } from './link';
import type { NavigationMenuEntry } from './navigationMenu';

/**
 * Content type: `footer` (Footer)
 * @see display field: `contentfulName`
 */
export type FooterFields = {
  contentfulName: string;
  logo: Asset;
  information: string;
  ubication: string;
  phone: string;
  navigationMenus: NavigationMenuEntry[];
  cta: LinkEntry;
};

export type FooterEntry = {
  fields: FooterFields;
};

export type FooterSkeleton = EntrySkeletonType & {
  contentTypeId: 'footer';
  fields: FooterFields;
};
