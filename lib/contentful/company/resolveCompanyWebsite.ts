import type { Entry } from 'contentful';

import { resolveNavLink } from '../resolveNavLink';
import {
  getExternalLinkHref,
  type ExternalLinkEntry,
} from '../types/externalLink';

export const COMPANY_WEBSITE_LINK_LABEL = 'Ver empresa';
export const SECTOR_COMPANY_WEBSITE_LINK_LABEL = 'Ir al sitio web';

function isResolvedExternalLink(
  webSiteURL: ExternalLinkEntry | Entry,
): webSiteURL is ExternalLinkEntry {
  const fields = webSiteURL.fields as Record<string, unknown> | undefined;
  return typeof fields?.link === 'string' && fields.link.length > 0;
}

export function resolveCompanyWebsiteUrl(
  webSiteURL?: ExternalLinkEntry | Entry,
): string | undefined {
  if (!webSiteURL) return undefined;

  if (isResolvedExternalLink(webSiteURL)) {
    return getExternalLinkHref(webSiteURL);
  }

  return resolveNavLink(webSiteURL as Entry)?.href;
}

export function resolveCompanyWebsiteLink(webSiteURL?: ExternalLinkEntry | Entry) {
  const href = resolveCompanyWebsiteUrl(webSiteURL);
  if (!href) return undefined;

  return {
    href,
    label: COMPANY_WEBSITE_LINK_LABEL,
    external: true,
  };
}
