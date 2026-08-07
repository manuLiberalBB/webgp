/**
 * Audits all banner entries from Contentful and reports bannerVariant status.
 *
 * Usage:
 *   yarn suggest-banner-variants
 *   yarn suggest-banner-variants --json
 */

import { createClient } from 'contentful';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  BANNER_VARIANTS,
  normalizeBannerVariant,
} from '../lib/contentful/banner/bannerVariants';
import type { BannerFields } from '../lib/contentful/types/banner';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonOnly = process.argv.includes('--json');

const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf8');
const getEnv = (key: string) =>
  envContent.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();

const usePreview = getEnv('CONTENTFUL_PREVIEW_DRAFT_CONTENT') === 'true';
const spaceId = getEnv('CONTENTFUL_SPACE_ID') ?? '';
const environment = getEnv('CONTENTFUL_ENVIRONMENT') ?? 'master';

const accessToken = usePreview
    ? getEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN')
    : getEnv('CONTENTFUL_ACCESS_TOKEN');

if (!spaceId || !accessToken) {
  throw new Error('Missing CONTENTFUL_SPACE_ID or access token in .env');
}

const client = createClient({
  space: spaceId,
  accessToken,
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

type BannerAudit = {
  entryId: string;
  contentfulName: string;
  title?: string;
  currentBannerVariant?: string;
  currentSectionId?: string;
  resolvedBannerVariant: string;
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

function collectBannerUsages(
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
      if (block.sys.contentType?.sys.id !== 'banner') continue;

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
  fields: BannerFields,
  entryId: string,
  pageUsages: PageUsage[],
): BannerAudit {
  const rawVariant = fields.bannerVariant?.trim();
  const normalized = normalizeBannerVariant(rawVariant);
  const contentfulName = fields.contentfulName ?? '(sin contentfulName)';

  let status: BannerAudit['status'] = 'already-set';
  let notes: string | undefined;
  let resolvedBannerVariant = normalized ?? BANNER_VARIANTS.HERO;

  if (!rawVariant) {
    status = 'missing';
    notes = 'No bannerVariant set in CMS. App falls back to "hero".';
  } else if (!normalized) {
    status = 'unknown';
    notes = `Unknown bannerVariant "${rawVariant}". App falls back to "hero".`;
  }

  if (fields.sectionId?.trim()) {
    notes = notes
      ? `${notes} sectionId="${fields.sectionId.trim()}".`
      : `sectionId="${fields.sectionId.trim()}".`;
  }

  return {
    entryId,
    contentfulName,
    title: fields.title,
    currentBannerVariant: fields.bannerVariant,
    currentSectionId: fields.sectionId,
    resolvedBannerVariant,
    status,
    notes,
    usedOnPages: pageUsages.sort((a, b) => a.path.localeCompare(b.path)),
    contentfulAdminUrl: buildContentfulAdminUrl(entryId),
  };
}

async function main() {
  const [pagesResult, bannersResult] = await Promise.all([
    client.getEntries({
      content_type: 'page',
      include: 4,
      limit: 1000,
    }),
    client.getEntries({
      content_type: 'banner',
      include: 4,
      limit: 1000,
    }),
  ]);

  const usageMap = collectBannerUsages(
    pagesResult.items as Array<{ sys: { id: string }; fields: Record<string, unknown> }>,
  );

  const audits: BannerAudit[] = bannersResult.items
    .map((entry) => {
      const fields = entry.fields as BannerFields;
      const pageUsages = usageMap.get(entry.sys.id) ?? [];

      return resolveAudit(fields, entry.sys.id, pageUsages);
    })
    .sort((a, b) => a.contentfulName.localeCompare(b.contentfulName, 'es'));

  const summary = {
    generatedAt: new Date().toISOString(),
    environment,
    preview: usePreview,
    totalBanners: audits.length,
    alreadySet: audits.filter((item) => item.status === 'already-set').length,
    missing: audits.filter((item) => item.status === 'missing').length,
    unknown: audits.filter((item) => item.status === 'unknown').length,
    unusedEntries: audits.filter((item) => item.usedOnPages.length === 0).length,
    items: audits,
  };

  const jsonPath = resolve(__dirname, '../docs/banner-variant-suggestions.json');
  const csvPath = resolve(__dirname, '../docs/banner-variant-suggestions.csv');

  writeFileSync(jsonPath, JSON.stringify(summary, null, 2));

  const csvHeader =
    'entryId,contentfulName,title,currentBannerVariant,currentSectionId,resolvedBannerVariant,status,usedOnPages,contentfulAdminUrl,notes';
  const csvRows = audits.map((item) => {
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

    return [
      item.entryId,
      item.contentfulName,
      item.title ?? '',
      item.currentBannerVariant ?? '',
      item.currentSectionId ?? '',
      item.resolvedBannerVariant,
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
    console.log(`\nBanner variant audit (${environment})`);
    console.log('─'.repeat(72));

    for (const item of audits) {
      const pages =
        item.usedOnPages.length > 0
          ? item.usedOnPages.map((usage) => usage.path).join(', ')
          : '(not linked from any page in this export)';

      console.log(`\n${item.contentfulName}`);
      console.log(`  title:    ${item.title ?? '—'}`);
      console.log(`  variant:  ${item.currentBannerVariant ?? '—'}`);
      console.log(`  section:  ${item.currentSectionId ?? '—'}`);
      console.log(`  resolved: ${item.resolvedBannerVariant} [${item.status}]`);
      console.log(`  pages:    ${pages}`);
      if (item.notes) console.log(`  notes:    ${item.notes}`);
      console.log(`  url:      ${item.contentfulAdminUrl}`);
    }

    console.log('\n' + '─'.repeat(72));
    console.log(`Total: ${summary.totalBanners}`);
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
