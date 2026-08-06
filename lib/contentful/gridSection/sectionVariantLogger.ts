import type { GridSectionVariant } from '@/lib/contentful/gridSection/sectionVariants';
import { normalizeSectionVariant } from '@/lib/contentful/gridSection/sectionVariants';

/** Dedupe logs per entry during a dev server session. */
const loggedKeys = new Set<string>();

type LogGridSectionVariantResolutionParams = {
  entryId?: string;
  contentfulName: string;
  title?: string;
  pagePath?: string[];
  rawSectionVariant?: string;
  resolvedVariant: GridSectionVariant;
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

export function logGridSectionVariantResolution({
  entryId,
  contentfulName,
  title,
  pagePath,
  rawSectionVariant,
  resolvedVariant,
}: LogGridSectionVariantResolutionParams): void {
  if (process.env.NODE_ENV !== 'development') return;

  const entryLabel = formatEntryLabel(contentfulName, title, entryId);
  const pageLabel = formatPagePath(pagePath);
  const explicitVariant = normalizeSectionVariant(rawSectionVariant);

  if (rawSectionVariant?.trim() && !explicitVariant) {
    const logKey = buildLogKey(entryId, contentfulName, `unknown:${rawSectionVariant}`);
    if (loggedKeys.has(logKey)) return;

    loggedKeys.add(logKey);

    console.warn(
      `[GridSection] Unknown sectionVariant "${rawSectionVariant}" on ${entryLabel} @ ${pageLabel}. Using "${resolvedVariant}".`,
    );
    return;
  }

  if (!rawSectionVariant?.trim()) {
    const logKey = buildLogKey(entryId, contentfulName, 'missing');
    if (loggedKeys.has(logKey)) return;

    loggedKeys.add(logKey);

    console.warn(
      `[GridSection] Missing sectionVariant on ${entryLabel} @ ${pageLabel}. Using "${resolvedVariant}".`,
    );
  }
}

/** Useful when restarting dev checks without restarting the dev server. */
export function resetGridSectionVariantLogs(): void {
  loggedKeys.clear();
}

export function getGridSectionVariantLogCount(): number {
  return loggedKeys.size;
}
