import type { FeaturedNewsItem } from '@/lib/news/types';
import {
  buildNewsFilterHref,
  NEWS_LIST_PATH,
} from '@/lib/contentful/news/newsListFilters';

import { NewsSectionHeader } from './NewsSectionHeader';
import {
  NewsPageFeaturedCompactCard,
  NewsPageFeaturedLargeCard,
  NewsPageFeaturedTextCard,
} from './NewsPageFeaturedCards';

type NewsPageFeaturedGridProps = {
  items: FeaturedNewsItem[];
};

const FEATURED_NEWS_VIEW_ALL_HREF = buildNewsFilterHref(
  NEWS_LIST_PATH,
  'Todo',
  [],
  [],
);

export function NewsPageFeaturedGrid({ items }: NewsPageFeaturedGridProps) {
  if (items.length === 0) return null;

  const [largeItem, ...sideItems] = items;

  return (
    <section className="bg-white px-6 pt-6 pb-12 md:px-layout-x md:pt-8 md:pb-section-y">
      <div className="mx-auto flex w-full max-w-[83.75rem] flex-col gap-10">
        <NewsSectionHeader
          title="Noticias destacadas"
          viewAllHref={FEATURED_NEWS_VIEW_ALL_HREF}
          layout="stacked"
          className="md:hidden"
        />

        <NewsSectionHeader
          title="Noticias destacadas"
          viewAllHref={FEATURED_NEWS_VIEW_ALL_HREF}
          className="hidden md:flex"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_506px] lg:gap-10">
          <NewsPageFeaturedLargeCard item={largeItem} className="h-full" />

          {sideItems.length > 0 ? (
            <div className="flex flex-col gap-6 lg:min-h-[451px]">
              {sideItems[0] ? (
                <NewsPageFeaturedCompactCard item={sideItems[0]} />
              ) : null}
              {sideItems[1] ? (
                <NewsPageFeaturedCompactCard item={sideItems[1]} />
              ) : null}
              {sideItems[2] ? (
                <NewsPageFeaturedTextCard item={sideItems[2]} className="mt-auto" />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
