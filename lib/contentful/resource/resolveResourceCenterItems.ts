import type { Entry } from 'contentful';

import { getAssetUrl } from '../getAssetUrl';
import type { DownloadableDocumentsFields } from '../types/downloadableDocuments';

export type ResourceCenterItem = {
  id: string;
  title: string;
  href: string;
  isNew?: boolean;
};

export function resolveResourceCenterItems(items?: Entry[]): ResourceCenterItem[] {
  const resolved: ResourceCenterItem[] = [];

  for (const item of items ?? []) {
    if (item.sys.contentType?.sys.id !== 'downloadableDocuments') continue;

    const fields = item.fields as DownloadableDocumentsFields;
    const href = getAssetUrl(fields.file);

    if (!href || !fields.title) continue;

    resolved.push({
      id: item.sys.id,
      title: fields.title,
      href,
      isNew: fields.isNew === true,
    });
  }

  return resolved;
}
