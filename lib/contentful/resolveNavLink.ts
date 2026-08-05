import type { Entry } from 'contentful';

import { getLinkHref, getLinkLabel, type LinkEntry } from './types/link';

export type ResolvedNavLink = {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
};

export function resolveLinkEntry(entry: LinkEntry, id = 'link'): ResolvedNavLink {
  return {
    id,
    label: getLinkLabel(entry),
    href: getLinkHref(entry),
    isExternal: false,
  };
}

export function resolveNavLink(entry: Entry): ResolvedNavLink | null {
  const contentTypeId = entry.sys.contentType?.sys.id;
  const fields = entry.fields as Record<string, unknown>;

  switch (contentTypeId) {
    case 'link': {
      const href = fields.link as string | undefined;
      if (!href) return null;

      const label =
        (fields.label as string | undefined) ??
        (fields.contentfulName as string | undefined) ??
        href;

      return {
        id: entry.sys.id,
        label,
        href,
        isExternal: false,
      };
    }
    case 'externalLink': {
      const href = fields.link as string | undefined;
      if (!href) return null;
      return {
        id: entry.sys.id,
        label:
          (fields.label as string | undefined) ??
          (fields.contentfulName as string | undefined) ??
          href,
        href,
        isExternal: true,
      };
    }
    default:
      return null;
  }
}
