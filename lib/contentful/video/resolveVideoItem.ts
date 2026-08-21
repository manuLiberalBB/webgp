import type { Entry } from 'contentful';

import { getAssetUrl } from '../getAssetUrl';
import type { VideoFields, VideoItem } from '../types/video';

import { resolveVideoEmbedUrl } from './resolveVideoEmbedUrl';

export function resolveVideoFields(fields: VideoFields, id?: string): VideoItem | null {
  const externalUrl = fields.url?.trim();
  const assetUrl = getAssetUrl(fields.archivoVideo);

  if (externalUrl) {
    const embedUrl = resolveVideoEmbedUrl(externalUrl);
    if (!embedUrl) return null;

    return {
      id: id ?? fields.contenfulName,
      contenfulName: fields.contenfulName,
      url: externalUrl,
      source: 'embed',
      embedUrl,
      title: fields.title,
      author: fields.author,
    };
  }

  if (assetUrl) {
    return {
      id: id ?? fields.contenfulName,
      contenfulName: fields.contenfulName,
      url: assetUrl,
      source: 'asset',
      title: fields.title,
      author: fields.author,
    };
  }

  return null;
}

export function resolveVideoItem(entry: Entry): VideoItem | null {
  if (entry.sys.contentType?.sys.id !== 'video') return null;

  return resolveVideoFields(entry.fields as VideoFields, entry.sys.id);
}

export function resolveVideoItems(items?: Entry[]): VideoItem[] {
  return (
    items
      ?.map((item) => resolveVideoItem(item))
      .filter((item): item is VideoItem => item !== null) ?? []
  );
}
