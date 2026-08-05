import { Button } from '@/components/ui/Button';
import {
  buildNewsFilterHref,
  NEWS_LIST_PATH,
} from '@/lib/contentful/news/newsListFilters';
import type { NewsListItem } from '@/lib/news/types';

import { AllNewsCard } from './AllNewsCard';
import { NewsSectionHeader } from './NewsSectionHeader';

function chunkItems<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}

const ALL_NEWS_GRID_COLUMNS = 3;

function trimToFullRows<T>(items: T[], rowSize: number): T[] {
  const visibleCount = Math.floor(items.length / rowSize) * rowSize;

  return items.slice(0, visibleCount);
}

const ALL_NEWS_FILTERED_VIEW_HREF = buildNewsFilterHref(
  NEWS_LIST_PATH,
  'Todo',
  [],
  [],
);

type AllNewsSectionProps = {
  items: NewsListItem[];
  title?: string;
  showViewAllButton?: boolean;
  emptyMessage?: string;
  completeRowsOnly?: boolean;
};

export function AllNewsSection({
  items,
  title = 'Todas las noticias',
  showViewAllButton = true,
  emptyMessage = 'No hay noticias para los filtros seleccionados.',
  completeRowsOnly = false,
}: AllNewsSectionProps) {
  const visibleItems = completeRowsOnly
    ? trimToFullRows(items, ALL_NEWS_GRID_COLUMNS)
    : items;
  const rows = chunkItems(visibleItems, ALL_NEWS_GRID_COLUMNS);

  return (
    <section
      id="todas-las-noticias"
      className="scroll-mt-20 bg-[#f9fafb] px-6 py-12 md:px-layout-x md:py-section-y"
    >
      <div className="mx-auto flex w-full max-w-[83.75rem] flex-col gap-12">
        <NewsSectionHeader title={title} mobileCentered />

        {visibleItems.length === 0 ? (
          <p className="text-body text-center text-base leading-6">{emptyMessage}</p>
        ) : (
          <div className="flex flex-col gap-12">
            {rows.map((row, rowIndex) => (
              <div
                key={`all-news-row-${rowIndex}`}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6"
              >
                {row.map((item) => (
                  <AllNewsCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        )}

        {showViewAllButton && visibleItems.length > 0 ? (
          <div className="flex w-full justify-center">
            <Button
              href={ALL_NEWS_FILTERED_VIEW_HREF}
              className="w-full px-6 py-3.5 md:w-auto"
            >
              Ver más noticias
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
