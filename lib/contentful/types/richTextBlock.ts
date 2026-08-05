import type { EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * Content type: `richTextBlock` (Bloque de Texto Enriquecido)
 * @see display field: `contentfulName`
 */
export type RichTextBlockFields = {
  contentfulName: string;
  content: Document;
};

export type RichTextBlockSkeleton = EntrySkeletonType & {
  contentTypeId: 'richTextBlock';
  fields: RichTextBlockFields;
};
