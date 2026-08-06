/**
 * Audits all gridSection entries from Contentful and reports sectionVariant status.
 *
 * Usage:
 *   yarn suggest-grid-variants
 *   yarn suggest-grid-variants --json   # only write JSON, minimal console output
 */

import { createClient } from 'contentful';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  GRID_SECTION_VARIANTS,
  normalizeSectionVariant,
} from '../lib/contentful/gridSection/sectionVariants';
import type { GridSectionFields } from '../lib/contentful/types/gridSection';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonOnly = process.argv.includes('--json');

const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf8');
const getEnv = (key: string) =>
  envContent.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();

const usePreview = getEnv('CONTENTFUL_PREVIEW_DRAFT_CONTENT') === 'true';
const spaceId = getEnv('CONTENTFUL_SPACE_ID');
const environment = getEnv('CONTENTFUL_ENVIRONMENT') ?? 'master';

const client = createClient({
  space: spaceId,
  accessToken: usePreview
    ? getEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN')
    : getEnv('CONTENTFUL_ACCESS_TOKEN'),
  environment,
  host: usePreview
    ? (getEnv('CONTENTFUL_PREVIEW_HOST')?.replace('https://', '') ??
      'preview.contentful.com')
    : (getEnv('CONTENTFUL_HOST')?.replace('https://', '') ?? 'cdn.contentful.com'),
});

type PageUsage = {
  path: string;
  pageContentfulName?: string;
};

type GridSectionSuggestion = {
  entryId: string;
  contentfulName: string;
  title?: string;
  tag?: string;
  currentSectionVariant?: string;
  resolvedSectionVariant: string;
  status: 'already-set' | 'missing' | 'unknown';
  notes?: string;
  usedOnPages: PageUsage[];
  contentfulAdminUrl: string;
};

function getPagePath(fields: Record<string, unknown>): string | null {
  const pathField = fields.path as { fields?: { link?: string } } | undefined;
  return pathField?.fields?.link ?? null;
}

function buildContentfulAdminUrl(entryId: string): string {
  return `https://app.contentful.com/spaces/${spaceId}/environments/${environment}/entries/${entryId}`;
}

function collectGridSectionUsages(
  pages: Array<{ sys: { id: string }; fields: Record<string, unknown> }>,
): Map<string, PageUsage[]> {
  const usageMap = new Map<string, PageUsage[]>();

  for (const page of pages) {
    const pagePath = getPagePath(page.fields);
    if (!pagePath) continue;

    const content = (page.fields.content as Array<{
      sys: { id: string; contentType?: { sys: { id?: string } } };
    }>) ?? [];

    for (const block of content) {
      if (block.sys.contentType?.sys.id !== 'gridSection') continue;

      const entryId = block.sys.id;
      const usages = usageMap.get(entryId) ?? [];

      usages.push({
        path: pagePath,
        pageContentfulName:
          typeof page.fields.contentfulName === 'string'
            ? page.fields.contentfulName
            : undefined,
      });

      usageMap.set(entryId, usages);
    }
  }

  return usageMap;
}

function resolveAudit(
  fields: GridSectionFields,
  entryId: string,
  pageUsages: PageUsage[],
): GridSectionSuggestion {
  const rawVariant = fields.sectionVariant?.trim();
  const normalized = normalizeSectionVariant(rawVariant);
  const contentfulName = fields.contentfulName ?? '(sin contentfulName)';

  let status: GridSectionSuggestion['status'] = 'already-set';
  let notes: string | undefined;
  let resolvedSectionVariant = normalized ?? GRID_SECTION_VARIANTS.DEFAULT;

  if (!rawVariant) {
    status = 'missing';
    notes = 'No sectionVariant set in CMS. App falls back to "default".';
  } else if (!normalized) {
    status = 'unknown';
    notes = `Unknown sectionVariant "${rawVariant}". App falls back to "default".`;
  } else if (
    normalized === GRID_SECTION_VARIANTS.I3_INNOVATION ||
    normalized === GRID_SECTION_VARIANTS.I3_CONVERSATIONS
  ) {
    notes = 'Handled by PageRenderer (I3 pairing), not GridSectionBlock.';
  }

  return {
    entryId,
    contentfulName,
    title: fields.title,
    tag: fields.tag,
    currentSectionVariant: fields.sectionVariant,
    resolvedSectionVariant,
    status,
    notes,
    usedOnPages: pageUsages.sort((a, b) => a.path.localeCompare(b.path)),
    contentfulAdminUrl: buildContentfulAdminUrl(entryId),
  };
}

async function main() {
  const [pagesResult, gridSectionsResult] = await Promise.all([
    client.getEntries({
      content_type: 'page',
      include: 4,
      limit: 1000,
    }),
    client.getEntries({
      content_type: 'gridSection',
      include: 4,
      limit: 1000,
    }),
  ]);

  const usageMap = collectGridSectionUsages(
    pagesResult.items as Array<{ sys: { id: string }; fields: Record<string, unknown> }>,
  );

  const suggestions: GridSectionSuggestion[] = gridSectionsResult.items
    .map((entry) => {
      const fields = entry.fields as GridSectionFields;
      const pageUsages = usageMap.get(entry.sys.id) ?? [];

      return resolveAudit(fields, entry.sys.id, pageUsages);
    })
    .sort((a, b) => a.contentfulName.localeCompare(b.contentfulName, 'es'));

  const summary = {
    generatedAt: new Date().toISOString(),
    environment,
    preview: usePreview,
    totalGridSections: suggestions.length,
    alreadySet: suggestions.filter((item) => item.status === 'already-set').length,
    missing: suggestions.filter((item) => item.status === 'missing').length,
    unknown: suggestions.filter((item) => item.status === 'unknown').length,
    unusedEntries: suggestions.filter((item) => item.usedOnPages.length === 0).length,
    items: suggestions,
  };

  const jsonPath = resolve(__dirname, '../docs/grid-section-variant-suggestions.json');
  const csvPath = resolve(__dirname, '../docs/grid-section-variant-suggestions.csv');

  writeFileSync(jsonPath, JSON.stringify(summary, null, 2));

  const csvHeader =
    'entryId,contentfulName,title,currentSectionVariant,resolvedSectionVariant,status,usedOnPages,contentfulAdminUrl,notes';
  const csvRows = suggestions.map((item) => {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

    return [
      item.entryId,
      item.contentfulName,
      item.title ?? '',
      item.currentSectionVariant ?? '',
      item.resolvedSectionVariant,
      item.status,
      item.usedOnPages.map((usage) => usage.path).join(' | '),
      item.contentfulAdminUrl,
      item.notes ?? '',
    ]
      .map((value) => escape(String(value)))
      .join(',');
  });

  writeFileSync(csvPath, [csvHeader, ...csvRows].join('\n'));

  if (!jsonOnly) {
    console.log(`\nGrid section variant audit (${environment})`);
    console.log('─'.repeat(72));

    for (const item of suggestions) {
      const pages =
        item.usedOnPages.length > 0
          ? item.usedOnPages.map((usage) => usage.path).join(', ')
          : '(not linked from any page in this export)';

      console.log(`\n${item.contentfulName}`);
      console.log(`  title:    ${item.title ?? '—'}`);
      console.log(`  current:  ${item.currentSectionVariant ?? '—'}`);
      console.log(`  resolved: ${item.resolvedSectionVariant} [${item.status}]`);
      console.log(`  pages:    ${pages}`);
      if (item.notes) console.log(`  notes:    ${item.notes}`);
      console.log(`  url:      ${item.contentfulAdminUrl}`);
    }

    console.log('\n' + '─'.repeat(72));
    console.log(`Total: ${summary.totalGridSections}`);
    console.log(`  already-set: ${summary.alreadySet}`);
    console.log(`  missing:     ${summary.missing}`);
    console.log(`  unknown:     ${summary.unknown}`);
    console.log(`  unused:      ${summary.unusedEntries}`);
    console.log(`\nJSON: ${jsonPath}`);
    console.log(`CSV:  ${csvPath}\n`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
