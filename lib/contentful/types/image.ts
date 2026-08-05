import type { Asset, EntrySkeletonType } from 'contentful';

/**
 * Content type: `image` (Imagen)
 * @see display field: `contentfulName`
 */
export type ImageFields = {
  contentfulName: string;
  file: Asset;
  epigraph?: string;
  source?: string;
};

export type ImageEntry = {
  fields: ImageFields;
};

export type ImageSkeleton = EntrySkeletonType & {
  contentTypeId: 'image';
  fields: ImageFields;
};

export type ImageItem = {
  id: string;
  contentfulName: string;
  imageUrl: string;
  imageAlt: string;
  width: number;
  height: number;
  epigraph?: string;
  source?: string;
};

export type FoundationImageItem = ImageItem & {
  accentColor: string;
};
