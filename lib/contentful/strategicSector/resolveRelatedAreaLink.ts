import type { Entry } from 'contentful';

import { resolveNavLink } from '../resolveNavLink';
import { getLinkHref } from '../types/link';
import type { PageFields } from '../types/page';

export type ResolvedRelatedAreaLink = {
  href: string;
  external: boolean;
  label?: string;
};

export function resolveRelatedAreaLink(
  entry?: Entry,
): ResolvedRelatedAreaLink | null {
  if (!entry) return null;

  const navLink = resolveNavLink(entry);
  if (navLink) {
    return {
      href: navLink.href,
      external: navLink.isExternal,
      label: navLink.label,
    };
  }

  if (entry.sys.contentType?.sys.id === 'page') {
    const fields = entry.fields as PageFields;
    if (fields.path) {
      return { href: getLinkHref(fields.path), external: false };
    }
  }

  return null;
}
