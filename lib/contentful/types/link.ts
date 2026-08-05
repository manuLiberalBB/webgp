import type { EntrySkeletonType } from 'contentful';

/**
 * Content type: `link` (Enlace Interno)
 * @see https://app.contentful.com — display field: `contentfulName`
 */
export type LinkFields = {
  /** Nombre interno en Contentful (id del campo tal cual en el CMS) */
  contentfulName: string;
  /** Ruta interna del sitio, ej. `/inicio`, `/contacto` */
  link: string;
  /** Texto visible del enlace */
  label: string;
};

export type LinkEntry = {
  fields: LinkFields;
};

export type LinkSkeleton = EntrySkeletonType & {
  contentTypeId: 'link';
  fields: LinkFields;
};

/** Resuelve la URL interna desde un entry o referencia resuelta de `link`. */
export function getLinkHref(entry: LinkEntry): string {
  return entry.fields.link;
}

/** Resuelve el texto visible desde un entry o referencia resuelta de `link`. */
export function getLinkLabel(entry: LinkEntry): string {
  return entry.fields.label;
}
