import type { Entry, EntrySkeletonType } from 'contentful';

/**
 * Content type: `navigationMenu` (Menú de Navegación)
 * @see display field: `contentfulName`
 */
export type NavigationMenuFields = {
  contentfulName: string;
  title: string;
  /** `externalLink`, `link` o `downloadableDocuments` */
  links: Entry[];
};

export type NavigationMenuEntry = {
  fields: NavigationMenuFields;
};

export type NavigationMenuSkeleton = EntrySkeletonType & {
  contentTypeId: 'navigationMenu';
  fields: NavigationMenuFields;
};
