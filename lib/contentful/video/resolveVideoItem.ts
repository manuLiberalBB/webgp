import type { Entry } from 'contentful';

import type { VideoFields, VideoItem } from '../types/video';

import { resolveVideoEmbedUrl } from './resolveVideoEmbedUrl';

export function resolveVideoFields(fields: VideoFields, id?: string): VideoItem | null {
  if (!fields.url) return null;

  const embedUrl = resolveVideoEmbedUrl(fields.url);
  if (!embedUrl) return null;

  return {
    id: id ?? fields.contenfulName,
    contenfulName: fields.contenfulName,
    url: fields.url,
    embedUrl,
    title: fields.title,
    author: fields.author,
  };
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
