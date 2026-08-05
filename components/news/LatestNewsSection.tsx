import type { NewsListItem } from '@/lib/news/types';

import { LatestNewsCard } from './LatestNewsCard';
import { NewsSectionHeader } from './NewsSectionHeader';

function chunkItems<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }

  return rows;
}

type LatestNewsSectionProps = {
  items: NewsListItem[];
};

export function LatestNewsSection({ items }: LatestNewsSectionProps) {
  if (items.length === 0) return null;

  const rows = chunkItems(items, 2);

  return (
    <section className="bg-white px-6 py-12 md:px-layout-x md:py-section-y">
      <div className="mx-auto flex w-full max-w-[83.75rem] flex-col gap-12">
        <NewsSectionHeader title="Últimas noticias" />

        <div className="flex flex-col gap-8">
          {rows.map((row, rowIndex) => (
            <div
              key={`latest-row-${rowIndex}`}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8"
            >
              {row.map((item) => (
                <LatestNewsCard key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
