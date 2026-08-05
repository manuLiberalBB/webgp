import { createClient } from 'contentful';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function loadEnv() {
  const content = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

function buildIncludeMap(response) {
  const map = new Map();
  for (const entry of response.includes?.Entry ?? []) {
    map.set(entry.sys.id, entry);
  }
  return map;
}

function resolveEntry(value, includeMap) {
  if (value?.sys?.type === 'Entry') return value;
  if (value?.sys?.type === 'Link' && value.sys.linkType === 'Entry') {
    return includeMap.get(value.sys.id) ?? value;
  }
  return value;
}

function walk(value, depth, path, includeMap, stats) {
  if (depth > stats.maxResolvedDepth) {
    stats.maxResolvedDepth = depth;
    stats.deepestPath = path;
  }

  if (!value || typeof value !== 'object') return;

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const resolved = resolveEntry(item, includeMap);
      if (resolved?.sys?.type === 'Link') {
        stats.unresolved.push(`${path}[${index}] (${resolved.sys.id})`);
        return;
      }
      walk(resolved, depth + 1, `${path}[${index}]`, includeMap, stats);
    });
    return;
  }

  const resolved = resolveEntry(value, includeMap);
  if (resolved?.sys?.type === 'Link') {
    stats.unresolved.push(`${path} (${resolved.sys.id})`);
    return;
  }

  if (resolved?.sys?.type === 'Entry' && resolved.fields) {
    const ct = resolved.sys.contentType?.sys.id ?? 'unknown';
    if (depth > (stats.byContentType[ct]?.max ?? -1)) {
      stats.byContentType[ct] = { max: depth, path };
    }

    for (const [key, fieldValue] of Object.entries(resolved.fields)) {
      walk(fieldValue, depth + 1, `${path}.${key}`, includeMap, stats);
    }
  }
}

loadEnv();

const usePreview = process.env.CONTENTFUL_PREVIEW_DRAFT_CONTENT === 'true';
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
  accessToken: usePreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN,
  host: usePreview
    ? process.env.CONTENTFUL_PREVIEW_HOST ?? 'preview.contentful.com'
    : process.env.CONTENTFUL_HOST ?? 'cdn.contentful.com',
});

console.log(`Using ${usePreview ? 'preview' : 'delivery'} API\n`);

async function analyzePage(path, include) {
  const response = await client.getEntries({
    content_type: 'page',
    'fields.path.fields.link': path,
    'fields.path.sys.contentType.sys.id': 'link',
    limit: 1,
    include,
  });

  if (response.items.length === 0) return null;

  const includeMap = buildIncludeMap(response);
  const stats = {
    include,
    maxResolvedDepth: 0,
    deepestPath: '',
    unresolved: [],
    byContentType: {},
    includeCount: response.includes?.Entry?.length ?? 0,
  };

  walk(response.items[0], 0, path, includeMap, stats);
  return stats;
}

for (const pagePath of ['/inicio', '/quienes-somos', '/economias-regionales']) {
  console.log(`=== ${pagePath} ===`);
  for (const include of [2, 3, 4, 5, 6, 8, 10]) {
    const stats = await analyzePage(pagePath, include);
    if (!stats) continue;
    console.log(
      `  include=${include}: resolvedDepth=${stats.maxResolvedDepth}, includes=${stats.includeCount}, unresolved=${stats.unresolved.length}`,
    );
  }
  const at5 = await analyzePage(pagePath, 5);
  if (at5?.unresolved.length) {
    console.log(`  unresolved @5 (first 5):`);
    at5.unresolved.slice(0, 5).forEach((u) => console.log(`    - ${u}`));
  }
  console.log('');
}
