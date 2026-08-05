import type { Entry } from 'contentful';

import {
  getExternalLinkHref,
  type ExternalLinkFields,
} from '../types/externalLink';

export function resolveSectionExternalLinkUrl(entries?: Entry[]): string | undefined {
  for (const entry of entries ?? []) {
    if (entry.sys.contentType?.sys.id !== 'externalLink') continue;

    const href = getExternalLinkHref({
      fields: entry.fields as ExternalLinkFields,
    });

    if (href) return href;
  }

  return undefined;
}
