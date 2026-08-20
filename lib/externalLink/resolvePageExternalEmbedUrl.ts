import type { Entry } from 'contentful';

import type { ExternalLinkFields } from '@/lib/contentful/types/externalLink';

export function resolvePageExternalEmbedUrl(content?: Entry[]): string | undefined {
  const externalLinkEntry = content?.find(
    (entry) => entry.sys.contentType?.sys.id === 'externalLink',
  );

  if (!externalLinkEntry) return undefined;

  const { link } = externalLinkEntry.fields as ExternalLinkFields;
  return typeof link === 'string' ? link.trim() : undefined;
}
