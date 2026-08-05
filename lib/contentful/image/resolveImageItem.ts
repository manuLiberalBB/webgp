import type { Entry } from 'contentful';

import { getAssetDimensions } from '../getAssetDimensions';
import { getAssetUrl } from '../getAssetUrl';
import type { ImageFields, ImageItem } from '../types/image';

export function resolveImageFields(fields: ImageFields, id?: string): ImageItem | null {
  const imageUrl = getAssetUrl(fields.file);
  if (!imageUrl) return null;

  const dimensions = getAssetDimensions(fields.file);
  const fileTitle = fields.file.fields.title;
  const imageAlt =
    (typeof fileTitle === 'string' ? fileTitle : undefined) ??
    fields.epigraph ??
    fields.contentfulName;

  return {
    id: id ?? fields.contentfulName,
    contentfulName: fields.contentfulName,
    imageUrl,
    imageAlt,
    width: dimensions.width,
    height: dimensions.height,
    epigraph: fields.epigraph,
    source: fields.source,
  };
}

export function resolveImageItem(entry: Entry): ImageItem | null {
  if (entry.sys.contentType?.sys.id !== 'image') return null;

  return resolveImageFields(entry.fields as ImageFields, entry.sys.id);
}

export function resolveImageItems(items?: Entry[]): ImageItem[] {
  return (
    items
      ?.map((item) => resolveImageItem(item))
      .filter((item): item is ImageItem => item !== null) ?? []
  );
}
