import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/Button';

import { FeaturedNewsCard } from './FeaturedNewsCard';

type FeaturedNewsRow =
  | { kind: 'pair'; flip: boolean; items: FeaturedNewsItem[] }
  | { kind: 'triple'; items: FeaturedNewsItem[] };

function buildFeaturedNewsRows(items: FeaturedNewsItem[]): FeaturedNewsRow[] {
  const rows: FeaturedNewsRow[] = [];
  let index = 0;
  let pairIndex = 0;

  while (index < items.length) {
    if (index === 4 && items.length - index >= 3) {
      rows.push({ kind: 'triple', items: items.slice(index, index + 3) });
      index += 3;
      continue;
    }

    if (items.length - index >= 2) {
      rows.push({
        kind: 'pair',
        flip: pairIndex % 2 === 1,
        items: items.slice(index, index + 2),
      });
      index += 2;
      pairIndex += 1;
      continue;
    }

    rows.push({
      kind: 'pair',
      flip: pairIndex % 2 === 1,
      items: items.slice(index),
    });
    break;
  }

  return rows;
}

type FeaturedNewsSectionProps = {
  items: FeaturedNewsItem[];
};

const MOBILE_FEATURED_NEWS_COUNT = 4;

export function FeaturedNewsSection({ items }: FeaturedNewsSectionProps) {
  if (items.length === 0) return null;

  const rows = buildFeaturedNewsRows(items);
  const mobileItems = items.slice(0, MOBILE_FEATURED_NEWS_COUNT);

  return (
    <section className="bg-white px-6 pt-12 pb-16 md:px-layout-x md:pt-14 md:pb-24">
      <div className="mx-auto flex w-full max-w-content flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-ecosystem-title text-[2rem] leading-[1.2] font-semibold md:text-[3rem] md:leading-[3rem]">
            Noticias destacadas
          </h2>
          <p className="text-ecosystem-body text-lg md:text-xl">
            Seguí las últimas novedades del grupo empresarial
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:hidden">
          {mobileItems.map((item) => (
            <FeaturedNewsCard key={item.id} item={item} variant="stacked" />
          ))}
        </div>

        <div className="hidden flex-col gap-7 lg:flex">
          {rows.map((row, rowIndex) => {
            if (row.kind === 'triple') {
              return (
                <div
                  key={`triple-${rowIndex}`}
                  className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center"
                >
                  {row.items.map((item) => (
                    <FeaturedNewsCard key={item.id} item={item} variant="horizontal" />
                  ))}
                </div>
              );
            }

            const [first, second] = row.items;
            const flip = row.flip;

            return (
              <div
                key={`pair-${rowIndex}`}
                className={cn(
                  'grid grid-cols-1 gap-7 lg:items-center lg:gap-[27px]',
                  flip ? 'lg:grid-cols-[1fr_2fr]' : 'lg:grid-cols-[2fr_1fr]',
                )}
              >
                {first ? (
                  <div className="min-w-0">
                    <FeaturedNewsCard
                      item={first}
                      variant={flip ? 'vertical' : 'large'}
                      companyBadgeVariant={flip ? 'green' : 'brand'}
                      className="w-full"
                    />
                  </div>
                ) : null}

                {second ? (
                  <div className="min-w-0">
                    <FeaturedNewsCard
                      item={second}
                      variant={flip ? 'large' : 'vertical'}
                      companyBadgeVariant={flip ? 'brand' : 'green'}
                      className="w-full"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="flex w-full justify-center">
          <Button href="/noticias" className="w-full px-5 py-3 md:w-auto">
            Ver todas las noticias
          </Button>
        </div>
      </div>
    </section>
  );
}
