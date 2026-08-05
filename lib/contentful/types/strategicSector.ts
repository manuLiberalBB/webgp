import type { Asset, Entry, EntrySkeletonType } from 'contentful';

/**
 * Content type: `strategicSector` (Sector Estrategico)
 * @see display field: `contenfulName`
 */
export type StrategicSectorFields = {
  /** Nombre interno en Contentful (id del campo tal cual en el CMS) */
  contenfulName: string;
  name: string;
  coverImage?: Asset;
  image?: Asset;
  subtitle?: string;
  cardDescription?: string;
  body?: string;
  listOfWaysWeContribute?: string[];
  /** Entry relacionada (tipo definido en Contentful) */
  relatedArea?: Entry;
  /** Entries `company` u otros tipos vinculados */
  companiesRelated?: Entry[];
};

export type StrategicSectorEntry = {
  fields: StrategicSectorFields;
};

export type StrategicSectorSkeleton = EntrySkeletonType & {
  contentTypeId: 'strategicSector';
  fields: StrategicSectorFields;
};

export type StrategicSectorReference = Entry<StrategicSectorSkeleton>;

/** Resuelve el nombre interno de Contentful respetando el id del campo en el CMS. */
export function getStrategicSectorContentfulName(
  entry: StrategicSectorEntry,
): string {
  return entry.fields.contenfulName;
}
