import type { EntryCollection } from 'contentful';

import { mapFeaturedNewsItem } from '../news/mapFeaturedNewsItem';
import { mapRelatedNewsItem } from '../news/mapRelatedNewsItem';
import { mapNewsListItem } from '../news/mapNewsListItem';
import type { FeaturedNewsItem, NewsListItem } from '../news/types';
import type { RelatedNewsItem } from '../news/types';
import type { FooterLinkItem } from '../footer/types';
import { resolveCompanyWebsiteUrl } from './company/resolveCompanyWebsite';
import { getContentfulClient } from './client';
import { getAssetUrl } from './getAssetUrl';
import type {
  CompanyFields,
  CompanySkeleton,
  DownloadableDocumentsFields,
  DownloadableDocumentsSkeleton,
  FooterFields,
  FooterSkeleton,
  HeaderFields,
  HeaderSkeleton,
  NewsCategory,
  NewsFields,
  NewsSkeleton,
  PageFields,
  PageSkeleton,
} from './types';
import { getLinkHref } from './types/link';
import { resolveNavLink } from './resolveNavLink';
import {
  getNewsCategoryQueryValues,
  normalizeNewsCategory,
} from './news/normalizeNewsCategory';
import { CONTENTFUL_INCLUDE } from './includeDepth';

const NEWS_BASE_SEGMENT = 'noticias';

function buildNewsCategoriesQuery(categories: NewsCategory[]): Record<string, string> {
  const values = [...new Set(categories.flatMap(getNewsCategoryQueryValues))];

  return { 'fields.category[in]': values.join(',') };
}

function resolveFeaturedRelatedCategoryFilters(options: {
  category?: NewsFields['category'];
  categories?: NewsCategory[];
}): NewsCategory[] {
  const normalizedCategories =
    options.categories
      ?.map((item) => normalizeNewsCategory(item))
      .filter((item): item is NewsCategory => Boolean(item)) ?? [];

  if (normalizedCategories.length > 0) {
    return normalizedCategories;
  }

  const normalizedCategory = normalizeNewsCategory(options.category);
  return normalizedCategory ? [normalizedCategory] : [];
}

function buildNewsCategoryQuery(category: NewsCategory): Record<string, string> {
  return buildNewsCategoriesQuery([category]);
}

function toPath(page: string[] | undefined): string {
  return `/${page?.length ? page.join('/') : 'inicio'}`;
}

export async function getPageByPath(
  page: string[] | undefined,
): Promise<EntryCollection<PageSkeleton, undefined, string>> {
  const client = getContentfulClient();
  const path = toPath(page);

  return client.getEntries<PageSkeleton>({
    content_type: 'page',
    include: CONTENTFUL_INCLUDE.page,
    'fields.path.fields.link': path,
    'fields.path.sys.contentType.sys.id': 'link',
  });
}

export async function getPageMetadataFields(page: string[] | undefined) {
  const client = getContentfulClient();
  const path = toPath(page);

  const entries = await client.getEntries<PageSkeleton>({
    content_type: 'page',
    include: CONTENTFUL_INCLUDE.metadata,
    'fields.path.fields.link': path,
    'fields.path.sys.contentType.sys.id': 'link',
    select: ['fields.title', 'fields.metaDescription', 'fields.keywords', 'fields.path'],
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields as PageFields;
}

function extractNewsPathFromUrl(page: string[] | undefined): string | null {
  if (!page || page[0] !== NEWS_BASE_SEGMENT || page.length < 2) {
    return null;
  }

  return page[page.length - 1];
}

export async function getNewsByPath(
  page: string[] | undefined,
): Promise<EntryCollection<NewsSkeleton, undefined, string>> {
  const newsPath = extractNewsPathFromUrl(page);

  if (!newsPath) {
    return { items: [], total: 0, skip: 0, limit: 0, sys: { type: 'Array' } };
  }

  const client = getContentfulClient();

  return client.getEntries<NewsSkeleton>({
    content_type: 'news',
    include: CONTENTFUL_INCLUDE.newsDetail,
    'fields.path': newsPath,
    limit: 1,
  });
}

export async function getNewsMetadataFields(page: string[] | undefined) {
  const newsPath = extractNewsPathFromUrl(page);
  if (!newsPath) return null;

  const client = getContentfulClient();

  const entries = await client.getEntries<NewsSkeleton>({
    content_type: 'news',
    include: CONTENTFUL_INCLUDE.metadata,
    'fields.path': newsPath,
    select: ['fields.title', 'fields.metaDescription', 'fields.keywords'],
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields;
}

export async function getRelatedNews(options: {
  excludePath: string;
  category?: NewsFields['category'];
  limit?: number;
}): Promise<RelatedNewsItem[]> {
  const { excludePath, category, limit = 2 } = options;
  const client = getContentfulClient();
  const related: RelatedNewsItem[] = [];
  const seen = new Set<string>([excludePath]);

  async function fetchBatch(query: Record<string, unknown>) {
    const entries = await client.getEntries<NewsSkeleton>({
      content_type: 'news',
      include: CONTENTFUL_INCLUDE.newsList,
      limit: limit + 1,
      order: ['-sys.createdAt'],
      ...query,
    });

    for (const item of entries.items) {
      const fields = item.fields as NewsFields;
      if (seen.has(fields.path)) continue;

      const mapped = mapRelatedNewsItem(item.sys.id, fields);
      if (!mapped) continue;

      related.push(mapped);
      seen.add(fields.path);

      if (related.length >= limit) break;
    }
  }

  const normalizedCategory = normalizeNewsCategory(category);

  if (normalizedCategory) {
    await fetchBatch(buildNewsCategoryQuery(normalizedCategory));
  }

  if (related.length < limit) {
    await fetchBatch({});
  }

  return related.slice(0, limit);
}

export async function getFeaturedRelatedNews(options: {
  excludePath?: string;
  category?: NewsFields['category'];
  categories?: NewsCategory[];
  limit?: number;
}): Promise<FeaturedNewsItem[]> {
  const { excludePath = '', category, categories, limit = 3 } = options;
  const client = getContentfulClient();
  const related: FeaturedNewsItem[] = [];
  const seen = new Set<string>(excludePath ? [excludePath] : []);

  async function fetchBatch(query: Record<string, unknown>) {
    const entries = await client.getEntries<NewsSkeleton>({
      content_type: 'news',
      include: CONTENTFUL_INCLUDE.newsList,
      limit: limit + seen.size + 5,
      order: ['-sys.createdAt'],
      ...query,
    });

    for (const item of entries.items) {
      const fields = item.fields as NewsFields;
      if (seen.has(fields.path)) continue;

      const mapped = mapFeaturedNewsItem(item.sys.id, fields, item.sys.createdAt);
      if (!mapped) continue;

      related.push(mapped);
      seen.add(fields.path);

      if (related.length >= limit) break;
    }
  }

  const categoryFilters = resolveFeaturedRelatedCategoryFilters({ category, categories });

  if (categoryFilters.length > 0) {
    await fetchBatch(buildNewsCategoriesQuery(categoryFilters));
  }

  if (related.length < limit) {
    await fetchBatch({});
  }

  return related.slice(0, limit);
}

export async function getRelatedNewsForCompanies(options: {
  companyIds: string[];
  limit?: number;
  excludePaths?: string[];
}): Promise<FeaturedNewsItem[]> {
  const { companyIds, limit = 3, excludePaths = [] } = options;
  const client = getContentfulClient();
  const related: FeaturedNewsItem[] = [];
  const seen = new Set<string>(excludePaths);

  async function fetchBatch(query: Record<string, unknown>) {
    const entries = await client.getEntries<NewsSkeleton>({
      content_type: 'news',
      include: CONTENTFUL_INCLUDE.newsList,
      limit: limit + seen.size + 5,
      order: ['-sys.createdAt'],
      ...query,
    });

    for (const item of entries.items) {
      const fields = item.fields as NewsFields;
      if (seen.has(fields.path)) continue;

      const mapped = mapFeaturedNewsItem(item.sys.id, fields, item.sys.createdAt);
      if (!mapped) continue;

      related.push(mapped);
      seen.add(fields.path);

      if (related.length >= limit) break;
    }
  }

  if (companyIds.length > 0) {
    await fetchBatch({ 'fields.companies.sys.id[in]': companyIds.join(',') });
  }

  if (related.length < limit) {
    await fetchBatch({});
  }

  return related.slice(0, limit);
}

export type NewsListQueryOptions = {
  limit?: number;
  skip?: number;
  category?: NewsCategory;
  companyIds?: string[];
  query?: string;
};

export type NewsListItemsPage = {
  items: NewsListItem[];
  total: number;
};

export async function getNewsListItems(
  options: number | NewsListQueryOptions = 4,
): Promise<NewsListItem[]> {
  const page = await getNewsListItemsPage(options);
  return page.items;
}

export async function getNewsListItemsPage(
  options: number | NewsListQueryOptions = 4,
): Promise<NewsListItemsPage> {
  const resolvedOptions: NewsListQueryOptions =
    typeof options === 'number' ? { limit: options } : options;

  const { limit = 4, skip = 0, category, companyIds, query } = resolvedOptions;
  const client = getContentfulClient();

  const queryParams: Record<string, string | number | string[]> = {
    content_type: 'news',
    include: CONTENTFUL_INCLUDE.newsList,
    limit,
    skip,
    order: ['-sys.createdAt'],
    select: [
      'sys.id',
      'sys.createdAt',
      'fields.noticeTitle',
      'fields.subtitle',
      'fields.path',
      'fields.category',
      'fields.coverImage',
    ],
  };

  if (category) {
    Object.assign(queryParams, buildNewsCategoryQuery(category));
  }

  if (companyIds && companyIds.length > 0) {
    queryParams['fields.companies.sys.id[in]'] = companyIds.join(',');
  }

  const normalizedQuery = query?.trim();
  if (normalizedQuery) {
    queryParams.query = normalizedQuery;
  }

  const entries = await client.getEntries<NewsSkeleton>(queryParams);

  return {
    items: entries.items
      .map((item) =>
        mapNewsListItem(item.sys.id, item.fields as NewsFields, item.sys.createdAt),
      )
      .filter((item): item is NewsListItem => item !== null),
    total: entries.total,
  };
}

export async function getLatestNews(limit = 4): Promise<NewsListItem[]> {
  return getNewsListItems(limit);
}

export async function getLatestFeaturedNews(limit = 3): Promise<FeaturedNewsItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<NewsSkeleton>({
    content_type: 'news',
    include: CONTENTFUL_INCLUDE.newsList,
    limit,
    order: ['-sys.createdAt'],
  });

  return entries.items
    .map((item) =>
      mapFeaturedNewsItem(item.sys.id, item.fields as NewsFields, item.sys.createdAt),
    )
    .filter((item): item is FeaturedNewsItem => item !== null);
}

export async function getHeader(): Promise<HeaderFields | null> {
  const client = getContentfulClient();

  const entries = await client.getEntries<HeaderSkeleton>({
    content_type: 'header',
    include: CONTENTFUL_INCLUDE.layout,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields as HeaderFields;
}

export async function getFooter(): Promise<FooterFields | null> {
  const client = getContentfulClient();

  const entries = await client.getEntries<FooterSkeleton>({
    content_type: 'footer',
    include: CONTENTFUL_INCLUDE.layout,
    limit: 1,
  });

  if (entries.items.length === 0) return null;

  return entries.items[0].fields as FooterFields;
}

export async function getNewsFilterCompanies(): Promise<{ id: string; name: string }[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<CompanySkeleton>({
    content_type: 'company',
    order: ['fields.name'],
    select: ['sys.id', 'fields.name'],
  });

  return entries.items.map((item) => ({
    id: item.sys.id,
    name: (item.fields as CompanyFields).name,
  }));
}

export async function getFooterCompanyLinks(): Promise<FooterLinkItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<CompanySkeleton>({
    content_type: 'company',
    include: CONTENTFUL_INCLUDE.newsList,
    order: ['fields.name'],
    select: ['sys.id', 'fields.name', 'fields.webSiteURL'],
  });

  return entries.items.flatMap((item) => {
    const fields = item.fields as CompanyFields;
    const href = resolveCompanyWebsiteUrl(fields.webSiteURL);

    if (!href) return [];

    return [
      {
        id: item.sys.id,
        label: fields.name,
        href,
        external: true,
      },
    ];
  });
}

export async function getFooterDownloadableResources(): Promise<FooterLinkItem[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries<DownloadableDocumentsSkeleton>({
    content_type: 'downloadableDocuments',
    include: CONTENTFUL_INCLUDE.metadata,
    order: ['fields.title'],
    select: ['sys.id', 'fields.title', 'fields.file'],
  });

  return entries.items.flatMap((item) => {
    const fields = item.fields as DownloadableDocumentsFields;
    const href = getAssetUrl(fields.file);

    if (!href) return [];

    return [
      {
        id: item.sys.id,
        label: fields.title,
        href,
      },
    ];
  });
}

export async function getHeaderNavigationLinks(): Promise<FooterLinkItem[]> {
  const header = await getHeader();
  if (!header) return [];

  return (
    header.navigation.fields.links
      ?.map((entry) => resolveNavLink(entry))
      .filter((link): link is NonNullable<typeof link> => link !== null)
      .map((link) => ({
        id: link.id,
        label: link.label,
        href: link.href,
        external: link.isExternal,
      })) ?? []
  );
}

export async function getAllPagePaths(): Promise<string[]> {
  const client = getContentfulClient();

  const entries = await client.getEntries({
    content_type: 'page',
    include: CONTENTFUL_INCLUDE.newsList,
  });

  return entries.items
    .map((item) => {
      const fields = item.fields as PageFields;
      return fields.path ? getLinkHref(fields.path) : undefined;
    })
    .filter((href): href is string => Boolean(href));
}
