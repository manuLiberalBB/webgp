import type { Entry } from 'contentful';

import { resolveSectionExternalLinkUrl } from '../gridSection/resolveSectionExternalLinkUrl';

import { resolveVideoEmbedUrl, resolveVideoPosterUrl } from './resolveVideoEmbedUrl';
import { resolveVideoItems } from './resolveVideoItem';

export type SectionVideo = {
  url: string;
  source: 'embed' | 'asset';
  embedUrl?: string;
  title?: string;
  posterUrl?: string;
};

export function resolveSectionVideo(entries?: Entry[]): SectionVideo | null {
  const videos = resolveVideoItems(entries);
  const firstVideo = videos[0];

  if (firstVideo) {
    return {
      url: firstVideo.url,
      source: firstVideo.source,
      embedUrl: firstVideo.embedUrl,
      title: firstVideo.title,
      posterUrl:
        firstVideo.source === 'embed'
          ? (resolveVideoPosterUrl(firstVideo.url) ?? undefined)
          : undefined,
    };
  }

  const externalUrl = resolveSectionExternalLinkUrl(entries);
  if (!externalUrl) return null;

  const embedUrl = resolveVideoEmbedUrl(externalUrl);
  if (!embedUrl) return null;

  return {
    url: externalUrl,
    source: 'embed',
    embedUrl,
    posterUrl: resolveVideoPosterUrl(externalUrl) ?? undefined,
  };
}
