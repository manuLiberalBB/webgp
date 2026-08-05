import type { Asset, EntrySkeletonType } from 'contentful';

/**
 * Content type: `downloadableDocuments` (Recurso Descargable)
 * @see display field: `contentfulName`
 */
export type DownloadableDocumentsFields = {
  contentfulName: string;
  title: string;
  file: Asset;
  isNew: boolean;
};

export type DownloadableDocumentsEntry = {
  fields: DownloadableDocumentsFields;
};

export type DownloadableDocumentsSkeleton = EntrySkeletonType & {
  contentTypeId: 'downloadableDocuments';
  fields: DownloadableDocumentsFields;
};
