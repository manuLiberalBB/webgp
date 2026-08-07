import type { BannerVariant } from '@/lib/contentful/banner/bannerVariants';
import { normalizeBannerVariant } from '@/lib/contentful/banner/bannerVariants';

/** Dedupe logs per entry during a dev server session. */
const loggedKeys = new Set<string>();

type LogBannerVariantResolutionParams = {
  entryId?: string;
  contentfulName: string;
  title?: string;
  pagePath?: string[];
  rawBannerVariant?: string;
  resolvedVariant: BannerVariant;
};

function buildLogKey(
  entryId: string | undefined,
  contentfulName: string,
  suffix: string,
): string {
  return `${entryId ?? contentfulName}:${suffix}`;
}

function formatPagePath(pagePath?: string[]): string {
  if (!pagePath?.length) return '(sin pagePath)';

  return `/${pagePath.join('/')}`;
}

function formatEntryLabel(contentfulName: string, title?: string, entryId?: string): string {
  const titleSuffix = title ? ` · "${title}"` : '';

  if (entryId) {
    return `${contentfulName}${titleSuffix} [${entryId}]`;
  }

  return `${contentfulName}${titleSuffix}`;
}

export function logBannerVariantResolution({
  entryId,
  contentfulName,
  title,
  pagePath,
  rawBannerVariant,
  resolvedVariant,
}: LogBannerVariantResolutionParams): void {
  if (process.env.NODE_ENV !== 'development') return;

  const entryLabel = formatEntryLabel(contentfulName, title, entryId);
  const pageLabel = formatPagePath(pagePath);
  const explicitVariant = normalizeBannerVariant(rawBannerVariant);

  if (rawBannerVariant?.trim() && !explicitVariant) {
    const logKey = buildLogKey(entryId, contentfulName, `unknown:${rawBannerVariant}`);
    if (loggedKeys.has(logKey)) return;

    loggedKeys.add(logKey);

    console.warn(
      `[Banner] Unknown bannerVariant "${rawBannerVariant}" on ${entryLabel} @ ${pageLabel}. Using "${resolvedVariant}".`,
    );
    return;
  }

  if (!rawBannerVariant?.trim()) {
    const logKey = buildLogKey(entryId, contentfulName, 'missing');
    if (loggedKeys.has(logKey)) return;

    loggedKeys.add(logKey);

    console.warn(
      `[Banner] Missing bannerVariant on ${entryLabel} @ ${pageLabel}. Using "${resolvedVariant}".`,
    );
  }
}
