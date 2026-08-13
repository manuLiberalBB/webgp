import type { Asset, Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/** Valores permitidos del campo `category` en Contentful. */
export type NewsCategory =
  | 'Sustentabilidad'
  | 'Innovación'
  | 'Educación'
  | 'Desarrollo regional'
  | 'Comunidad'
  | 'Talento'
  | 'Minería';

/**
 * Content type: `news` (Noticia)
 * @see display field: `contentfulName`
 */
export type NewsFields = {
  contentfulName: string;
  /** Título visible de la noticia */
  noticeTitle: string;
  /** Bajada o subtítulo */
  subtitle?: string;
  /** Path de la noticia en Contentful (`fields.path`), ej. `mi-noticia` */
  path: string;
  /** Entries `company` */
  companies?: Entry[];
  category?: NewsCategory;
  tags?: string[];
  coverImage: Asset;
  content: Document;
};

export type NewsEntry = {
  fields: NewsFields;
};

export type NewsSkeleton = EntrySkeletonType & {
  contentTypeId: 'news';
  fields: NewsFields;
};

export type NewsProps = {
  params: Promise<{ slug: string[] }>;
};

/** Construye la ruta pública de una noticia a partir de `fields.path`. */
export function getNewsPath(path: string): string {
  const normalized = path.replace(/^\/+/, '').replace(/^noticias\//, '');
  return `/noticias/${normalized}`;
}
