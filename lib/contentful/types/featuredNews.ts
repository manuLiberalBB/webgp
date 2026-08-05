import type { Entry, EntrySkeletonType } from 'contentful';

import type { NewsFields } from './news';

/**
 * Content type: `featuredNews` (Noticias Destacadas)
 * @see display field: `contentfulName`
 */
export type FeaturedNewsFields = {
  contentfulName: string;
  news: Entry[];
};

export type FeaturedNewsEntry = {
  fields: FeaturedNewsFields;
};

export type FeaturedNewsSkeleton = EntrySkeletonType & {
  contentTypeId: 'featuredNews';
  fields: {
    contentfulName: string;
    news: Entry<{ contentTypeId: 'news'; fields: NewsFields }>[];
  };
};
