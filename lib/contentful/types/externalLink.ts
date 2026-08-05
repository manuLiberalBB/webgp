import type { EntrySkeletonType } from 'contentful';

/**
 * Content type: `externalLink` (Enlace Externo)
 * @see display field: `contentfulName`
 */
export type ExternalLinkFields = {
  contentfulName: string;
  label?: string;
  link: string;
};

export type ExternalLinkEntry = {
  fields: ExternalLinkFields;
};

export type ExternalLinkSkeleton = EntrySkeletonType & {
  contentTypeId: 'externalLink';
  fields: ExternalLinkFields;
};

/** Resuelve la URL externa desde un entry o referencia resuelta de `externalLink`. */
export function getExternalLinkHref(entry: ExternalLinkEntry): string {
  return entry.fields.link;
}

/** Resuelve el texto visible desde un entry o referencia resuelta de `externalLink`. */
export function getExternalLinkLabel(entry: ExternalLinkEntry): string {
  return entry.fields.label ?? entry.fields.contentfulName;
}
