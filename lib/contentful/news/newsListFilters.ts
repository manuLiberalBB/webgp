import type { NewsCategory } from '@/lib/contentful/types/news';

import { normalizeNewsCategory } from './normalizeNewsCategory';
import { type NewsFilterCategory } from './newsCategories';

export type NewsListFilters = {
  category?: NewsCategory;
  companyIds: string[];
  query?: string;
};

export type ParsedNewsUrlParams = {
  category?: NewsFilterCategory;
  companyNames: string[];
  query?: string;
};

export type NewsFilterCompanyRef = {
  id: string;
  name: string;
};

const FILTERED_NEWS_LIMIT = 100;
export const FILTERED_NEWS_INITIAL_LIMIT = 12;
export const FILTERED_NEWS_LOAD_MORE_LIMIT = 6;

/** Quita tildes y diacríticos para params de URL estables. */
export function stripFilterAccents(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '');
}

function normalizeFilterToken(value: string): string {
  return stripFilterAccents(decodeURIComponent(value.trim())).toLowerCase();
}

/** Valor listo para escribir en la query string (sin tildes). */
export function encodeNewsFilterParamValue(value: string): string {
  return stripFilterAccents(value.trim());
}

function readSingleSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0];
  }

  return undefined;
}

function parseCompanyNamesParam(value: string | string[] | undefined): string[] {
  const raw = readSingleSearchParam(value);
  if (!raw) return [];

  return raw
    .split(',')
    .map((name) => decodeURIComponent(name.trim()))
    .filter(Boolean);
}

export function parseNewsSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): ParsedNewsUrlParams {
  const categoryValue = readSingleSearchParam(searchParams.categoria);
  const decodedCategory = categoryValue
    ? decodeURIComponent(categoryValue)
    : undefined;

  let category: NewsFilterCategory | undefined;

  if (decodedCategory) {
    if (normalizeFilterToken(decodedCategory) === 'todo') {
      category = 'Todo';
    } else {
      category = normalizeNewsCategory(decodedCategory);
    }
  }

  const companyNames = parseCompanyNamesParam(searchParams.empresa);

  const queryValue = readSingleSearchParam(searchParams.q);
  const query = queryValue ? decodeURIComponent(queryValue).trim() : undefined;

  return {
    category,
    companyNames,
    query: query || undefined,
  };
}

export function resolveCompanyNamesToIds(
  companyNames: string[],
  companies: NewsFilterCompanyRef[],
): string[] {
  const resolvedIds = new Set<string>();

  for (const companyName of companyNames) {
    const byId = companies.find((company) => company.id === companyName);
    if (byId) {
      resolvedIds.add(byId.id);
      continue;
    }

    const byName = companies.find(
      (company) =>
        normalizeFilterToken(company.name) === normalizeFilterToken(companyName),
    );

    if (byName) {
      resolvedIds.add(byName.id);
    }
  }

  return [...resolvedIds];
}

export function resolveCompanyIdsToNames(
  companyIds: string[],
  companies: NewsFilterCompanyRef[],
): string[] {
  return companyIds
    .map((id) => companies.find((company) => company.id === id)?.name)
    .filter((name): name is string => Boolean(name));
}

export function resolveNewsListFilters(
  parsed: ParsedNewsUrlParams,
  companies: NewsFilterCompanyRef[],
): NewsListFilters {
  return {
    category: parsed.category === 'Todo' ? undefined : parsed.category,
    companyIds: resolveCompanyNamesToIds(parsed.companyNames, companies),
    query: parsed.query?.trim() || undefined,
  };
}

export function sanitizeNewsListFilters(
  filters: NewsListFilters,
  companies: NewsFilterCompanyRef[],
): NewsListFilters {
  const validCompanyIds = new Set(companies.map((company) => company.id));

  return {
    category: filters.category,
    companyIds: filters.companyIds.filter((id) => validCompanyIds.has(id)),
    query: filters.query?.trim() || undefined,
  };
}

export function hasActiveNewsUrlFilters(parsed: ParsedNewsUrlParams): boolean {
  return (
    parsed.category !== undefined ||
    parsed.companyNames.length > 0 ||
    Boolean(parsed.query?.trim())
  );
}

export function hasActiveNewsFilters(filters: NewsListFilters): boolean {
  return (
    filters.category !== undefined ||
    filters.companyIds.length > 0 ||
    Boolean(filters.query?.trim())
  );
}

export function buildNewsFilterSearchParams(
  category: NewsFilterCategory | undefined,
  companyIds: string[],
  companies: NewsFilterCompanyRef[],
  query?: string,
): URLSearchParams {
  const params = new URLSearchParams();

  if (category === 'Todo') {
    params.set('categoria', 'Todo');
  } else if (category) {
    params.set('categoria', encodeNewsFilterParamValue(category));
  }

  const companyNames = resolveCompanyIdsToNames(companyIds, companies);
  if (companyNames.length > 0) {
    params.set('empresa', companyNames.map(encodeNewsFilterParamValue).join(','));
  }

  const normalizedQuery = query?.trim();
  if (normalizedQuery) {
    params.set('q', normalizedQuery);
  }

  return params;
}

export function buildNewsFilterHref(
  pathname: string,
  category: NewsFilterCategory | undefined,
  companyIds: string[],
  companies: NewsFilterCompanyRef[],
  query?: string,
): string {
  const params = buildNewsFilterSearchParams(category, companyIds, companies, query);
  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

function formatNamesWithSpanishConjunction(names: string[]): string {
  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]} y ${names[1]}`;
  }

  return `${names.slice(0, -1).join(', ')} y ${names[names.length - 1]}`;
}

export function getFilteredNewsSectionTitle(
  parsed: ParsedNewsUrlParams,
  filters: NewsListFilters,
  companies: NewsFilterCompanyRef[],
): string {
  if (filters.query?.trim()) {
    const searchTerm = filters.query.trim();

    if (parsed.category && parsed.category !== 'Todo') {
      return `Noticias sobre "${searchTerm}" en ${parsed.category}`;
    }

    return `Noticias sobre "${searchTerm}"`;
  }

  if (parsed.category && parsed.category !== 'Todo') {
    return `Noticias de ${parsed.category}`;
  }

  if (filters.companyIds.length > 0) {
    const names = resolveCompanyIdsToNames(filters.companyIds, companies);

    if (names.length > 0) {
      return `Noticias de ${formatNamesWithSpanishConjunction(names)}`;
    }
  }

  if (parsed.category === 'Todo') {
    return 'Todas las noticias';
  }

  return 'Todas las noticias';
}

export function getNewsFiltersSuspenseKey(
  searchParams: Record<string, string | string[] | undefined>,
): string {
  const parsed = parseNewsSearchParams(searchParams);

  return [
    parsed.category ?? 'none',
    parsed.companyNames.join(','),
    parsed.query ?? '',
  ].join('--');
}

export { FILTERED_NEWS_LIMIT };

export const NEWS_LIST_PATH = '/noticias';

export function buildNewsCategoryFilterHref(category: NewsCategory): string {
  const params = new URLSearchParams();
  params.set('categoria', encodeNewsFilterParamValue(category));

  return `${NEWS_LIST_PATH}?${params.toString()}`;
}

export function buildNewsCompanyFilterHref(companyName: string): string {
  const params = new URLSearchParams();
  params.set('empresa', encodeNewsFilterParamValue(companyName));

  return `${NEWS_LIST_PATH}?${params.toString()}`;
}
