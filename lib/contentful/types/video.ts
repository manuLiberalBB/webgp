import type { EntrySkeletonType } from 'contentful';

/**
 * Content type: `video` (Video)
 * @see display field: `contenfulName`
 */
export type VideoFields = {
  /** Nombre interno en Contentful (typo intencional del content model). */
  contenfulName: string;
  url?: string;
  title?: string;
  author?: string;
};

export type VideoEntry = {
  fields: VideoFields;
};

export type VideoSkeleton = EntrySkeletonType & {
  contentTypeId: 'video';
  fields: VideoFields;
};

export type VideoItem = {
  id: string;
  contenfulName: string;
  url: string;
  embedUrl: string;
  title?: string;
  author?: string;
};
