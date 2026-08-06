import { NextRequest, NextResponse } from 'next/server';

import {
  FILTERED_NEWS_LOAD_MORE_LIMIT,
  parseNewsSearchParams,
  resolveNewsListFilters,
  sanitizeNewsListFilters,
} from '@/lib/contentful/news/newsListFilters';
import { getNewsFilterCompanies, getNewsListItemsPage } from '@/lib/contentful/queries';

function toSearchParamsRecord(searchParams: URLSearchParams) {
  const record: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (key === 'skip' || key === 'limit') return;
    record[key] = value;
  });

  return record;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const skip = Math.max(Number(searchParams.get('skip') ?? 0), 0);
  const requestedLimit = Number(searchParams.get('limit') ?? FILTERED_NEWS_LOAD_MORE_LIMIT);
  const limit = Math.min(
    Number.isFinite(requestedLimit) && requestedLimit > 0
      ? requestedLimit
      : FILTERED_NEWS_LOAD_MORE_LIMIT,
    FILTERED_NEWS_LOAD_MORE_LIMIT,
  );

  const companies = await getNewsFilterCompanies();
  const parsedFilters = parseNewsSearchParams(toSearchParamsRecord(searchParams));
  const filters = sanitizeNewsListFilters(
    resolveNewsListFilters(parsedFilters, companies),
    companies,
  );

  const { items, total } = await getNewsListItemsPage({
    limit,
    skip,
    category: filters.category,
    companyIds: filters.companyIds.length > 0 ? filters.companyIds : undefined,
    query: filters.query,
  });

  return NextResponse.json({ items, total });
}
