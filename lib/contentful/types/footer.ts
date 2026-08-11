import type { Asset, Entry, EntrySkeletonType } from 'contentful';

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
  /** References to `company` entries, in display order. */
  companies?: Entry[];
  cta: LinkEntry;
};

export type FooterEntry = {
  fields: FooterFields;
};

export type FooterSkeleton = EntrySkeletonType & {
  contentTypeId: 'footer';
  fields: FooterFields;
};
