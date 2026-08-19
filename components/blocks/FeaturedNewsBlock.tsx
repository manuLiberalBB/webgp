import { Suspense } from 'react';

import type { FeaturedNewsFields } from '@/lib/contentful/types/featuredNews';
import type { NewsFields } from '@/lib/contentful/types/news';
import {
  getNewsFiltersSuspenseKey,
  hasActiveNewsUrlFilters,
  parseNewsSearchParams,
} from '@/lib/contentful/news/newsListFilters';
import { mapFeaturedNewsItem } from '@/lib/news/mapFeaturedNewsItem';

import { FeaturedNewsHero } from '@/components/news/FeaturedNewsHero';
import { FeaturedNewsSection } from '@/components/news/FeaturedNewsSection';
import { FilteredNewsSectionWithFetch } from '@/components/news/FilteredNewsSectionWithFetch';
import { LatestNewsSectionWithFetch } from '@/components/news/LatestNewsSectionWithFetch';
import { NewsFilteredResultsScroll } from '@/components/news/NewsFilteredResultsScroll';
import { NewsFiltersSectionWithFetch } from '@/components/news/NewsFiltersSectionWithFetch';
import { NewsPageFeaturedGrid } from '@/components/news/NewsPageFeaturedGrid';
import { NewsResultsLoading } from '@/components/news/NewsResultsLoading';

import type { BlockComponent } from './registry';

function isNewsListingPage(pagePath?: string[]) {
  return pagePath?.length === 1 && pagePath[0] === 'noticias';
}

export const FeaturedNewsBlock: BlockComponent = ({
  fields,
  pagePath,
  searchParams,
}) => {
  const { news } = fields as FeaturedNewsFields;

  const items = news
    .map((entry) =>
      mapFeaturedNewsItem(
        entry.sys.id,
        entry.fields as NewsFields,
        entry.sys,
      ),
    )
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (isNewsListingPage(pagePath)) {
    const heroIndex = items.length > 1 ? 1 : 0;
    const heroItem = items[heroIndex];
    const sectionItems = items.filter((_, index) => index !== heroIndex).slice(0, 4);

    const parsedFilters = parseNewsSearchParams(searchParams ?? {});
    const isFiltered = hasActiveNewsUrlFilters(parsedFilters);
    const filtersKey = getNewsFiltersSuspenseKey(searchParams ?? {});

    return (
      <>
        {heroItem ? <FeaturedNewsHero item={heroItem} /> : null}
        <NewsFiltersSectionWithFetch compactTop compactBottom />
        {!isFiltered && sectionItems.length > 0 ? (
          <NewsPageFeaturedGrid items={sectionItems} />
        ) : null}
        {!isFiltered ? (
          <Suspense fallback={<NewsResultsLoading compact />}>
            <LatestNewsSectionWithFetch />
          </Suspense>
        ) : null}
        {isFiltered ? (
          <>
            <NewsFilteredResultsScroll scrollKey={filtersKey} />
            <Suspense
              key={`news-filtered-${filtersKey}`}
              fallback={<NewsResultsLoading />}
            >
              <FilteredNewsSectionWithFetch parsedFilters={parsedFilters} />
            </Suspense>
          </>
        ) : null}
      </>
    );
  }

  if (items.length === 0) return null;

  const [heroItem, ...restItems] = items;

  return (
    <>
      <FeaturedNewsHero item={heroItem} />
      {restItems.length > 0 ? <FeaturedNewsSection items={restItems} /> : null}
    </>
  );
};
