import type { Entry, EntrySkeletonType } from 'contentful';

import type { LinkEntry } from './link';

/**
 * Content type: `page` (Página)
 * @see display field: `contentfulName`
 */
export type PageFields = {
  contentfulName: string;
  title: string;
  metaDescription: string;
  keywords?: string[];
  path: LinkEntry;
  content: Entry[];
};

export type PageSkeleton = EntrySkeletonType & {
  contentTypeId: 'page';
  fields: PageFields;
};

export type PageProps = {
  params: Promise<{ page: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/** Convierte keywords del CMS al formato de Next.js Metadata. */
export function formatPageKeywords(
  keywords?: string[],
): string | string[] | undefined {
  if (!keywords?.length) return undefined;
  return keywords.length === 1 ? keywords[0] : keywords;
}
