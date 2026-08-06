import {
  buildNewsFilterSearchParams,
  FILTERED_NEWS_INITIAL_LIMIT,
  getFilteredNewsSectionTitle,
  NEWS_LIST_PATH,
  type ParsedNewsUrlParams,
  resolveNewsListFilters,
  sanitizeNewsListFilters,
} from '@/lib/contentful/news/newsListFilters';
import { getLatestFeaturedNews, getNewsFilterCompanies, getNewsListItemsPage } from '@/lib/contentful/queries';

import { AllNewsSection } from './AllNewsSection';
import { PaginatedFilteredNewsSection } from './PaginatedFilteredNewsSection';
import { YouMayAlsoLikeSection } from './YouMayAlsoLikeSection';

const EMPTY_FILTER_SUGGESTIONS_COUNT = 3;

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

  const items = await getNewsListItemsPage({
    limit: FILTERED_NEWS_INITIAL_LIMIT,
    skip: 0,
    category: filters.category,
    companyIds: filters.companyIds.length > 0 ? filters.companyIds : undefined,
    query: filters.query,
  });

  const title = getFilteredNewsSectionTitle(parsedFilters, filters, companies);
  const filterQueryString = buildNewsFilterSearchParams(
    parsedFilters.category,
    filters.companyIds,
    companies,
    filters.query,
  ).toString();

  if (items.items.length === 0) {
    const suggestedItems = await getLatestFeaturedNews(EMPTY_FILTER_SUGGESTIONS_COUNT);

    return (
      <>
        <AllNewsSection items={items.items} title={title} showViewAllButton={false} />
        {suggestedItems.length > 0 ? (
          <YouMayAlsoLikeSection
            items={suggestedItems}
            title="También podría interesarte"
            viewAllHref={NEWS_LIST_PATH}
          />
        ) : null}
      </>
    );
  }

  return (
    <PaginatedFilteredNewsSection
      initialItems={items.items}
      total={items.total}
      title={title}
      filterQueryString={filterQueryString}
    />
  );
}
