import {
  FILTERED_NEWS_LIMIT,
  getFilteredNewsSectionTitle,
  type ParsedNewsUrlParams,
  resolveNewsListFilters,
  sanitizeNewsListFilters,
} from '@/lib/contentful/news/newsListFilters';
import { getNewsFilterCompanies, getNewsListItems } from '@/lib/contentful/queries';

import { AllNewsSection } from './AllNewsSection';

type FilteredNewsSectionWithFetchProps = {
  parsedFilters: ParsedNewsUrlParams;
};

export async function FilteredNewsSectionWithFetch({
  parsedFilters,
}: FilteredNewsSectionWithFetchProps) {
  const companies = await getNewsFilterCompanies();
  const filters = sanitizeNewsListFilters(
    resolveNewsListFilters(parsedFilters, companies),
    companies,
  );

  const items = await getNewsListItems({
    limit: FILTERED_NEWS_LIMIT,
    category: filters.category,
    companyIds: filters.companyIds.length > 0 ? filters.companyIds : undefined,
    query: filters.query,
  });

  const title = getFilteredNewsSectionTitle(parsedFilters, filters, companies);

  return (
    <AllNewsSection items={items} title={title} showViewAllButton={false} />
  );
}
