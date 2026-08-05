import { createClient } from 'contentful';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envContent = readFileSync(resolve(__dirname, '../.env'), 'utf8');
const getEnv = (key) => envContent.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();

const usePreview = getEnv('CONTENTFUL_PREVIEW_DRAFT_CONTENT') === 'true';

const client = createClient({
  space: getEnv('CONTENTFUL_SPACE_ID'),
  accessToken: usePreview
    ? getEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN')
    : getEnv('CONTENTFUL_ACCESS_TOKEN'),
  environment: getEnv('CONTENTFUL_ENVIRONMENT') ?? 'master',
  host: usePreview
    ? (getEnv('CONTENTFUL_PREVIEW_HOST')?.replace('https://', '') ?? 'preview.contentful.com')
    : (getEnv('CONTENTFUL_HOST')?.replace('https://', '') ?? 'cdn.contentful.com'),
});

function getPath(fields) {
  return fields.path?.fields?.link ?? null;
}

function summarizeBlocks(content = []) {
  return content.slice(0, 12).map((entry) => {
    const type = entry?.sys?.contentType?.sys?.id;
    const f = entry?.fields ?? {};
    return {
      type,
      name: f.contentfulName ?? f.title ?? null,
      title: f.title ?? null,
      subtitle: f.subtitle ?? null,
      tag: f.tag ?? null,
    };
  });
}

const entries = await client.getEntries({
  content_type: 'page',
  include: 2,
  limit: 100,
});

const pages = entries.items
  .map((item) => {
    const f = item.fields;
    return {
      path: getPath(f),
      contentfulName: f.contentfulName,
      title: f.title,
      metaDescription: f.metaDescription ?? null,
      keywords: f.keywords ?? [],
      blocks: summarizeBlocks(f.content),
    };
  })
  .filter((p) => p.path)
  .sort((a, b) => a.path.localeCompare(b.path));

writeFileSync(resolve(__dirname, '../docs/page-seo-export.json'), JSON.stringify(pages, null, 2));
console.log(`Exported ${pages.length} pages`);
