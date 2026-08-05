import type { EntrySkeletonType } from 'contentful';

/**
 * Content type: `bloqueDeCita` (Bloque de Cita)
 * @see display field: `contentfulName`
 */
export type QuoteBlockFields = {
  contentfulName?: string;
  quote: string;
  author: string;
  authorTitle?: string;
};

export type QuoteBlockEntry = {
  fields: QuoteBlockFields;
};

export type QuoteBlockSkeleton = EntrySkeletonType & {
  contentTypeId: 'bloqueDeCita';
  fields: QuoteBlockFields;
};
