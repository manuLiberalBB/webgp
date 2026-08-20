import type { FeaturedNewsItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

import {
  NewsPageFeaturedLargeCard,
  NewsPageFeaturedStackedCard,
} from './NewsPageFeaturedCards';
import { NewsSectionHeader } from './NewsSectionHeader';
import { YouMayAlsoLikeSideCard } from './YouMayAlsoLikeSideCard';

type YouMayAlsoLikeSectionProps = {
  items: FeaturedNewsItem[];
  title?: string;
  viewAllHref?: string;
};

const YOU_MAY_ALSO_LIKE_MOBILE_HERO_MIN_HEIGHT =
  'min-h-[clamp(18rem,52vw,22.5rem)]';

export function YouMayAlsoLikeSection({
  items,
  title = 'También puede interesarte',
  viewAllHref = '/noticias',
}: YouMayAlsoLikeSectionProps) {
  if (items.length === 0) return null;

  const [largeItem, ...sideItems] = items;
  const sideCardItems = sideItems.slice(0, 2);

  return (
    <section className="bg-white px-6 py-10 md:px-layout-x md:py-section-y">
      <div className="mx-auto flex w-full max-w-[83.75rem] flex-col gap-10">
        <NewsSectionHeader
          title={title}
          titleSize="medium"
          viewAllHref={viewAllHref}
          layout="stacked"
          className="md:hidden"
        />

        <NewsSectionHeader
          title={title}
          titleSize="medium"
          viewAllHref={viewAllHref}
          className="hidden md:flex"
        />

        <div className="flex flex-col gap-10 md:hidden">
          <NewsPageFeaturedLargeCard
            item={largeItem}
            readMoreLabel="Leer más"
            className={cn(YOU_MAY_ALSO_LIKE_MOBILE_HERO_MIN_HEIGHT, 'rounded-lg')}
          />

          {sideCardItems.length > 0 ? (
            <div className="flex flex-col gap-8">
              {sideCardItems.map((item) => (
                <NewsPageFeaturedStackedCard key={item.id} item={item} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden grid-cols-1 gap-10 md:grid lg:grid-cols-[minmax(0,1fr)_506px] lg:items-stretch lg:gap-10">
          <NewsPageFeaturedLargeCard
            item={largeItem}
            className="h-full min-h-[360px] md:min-h-[470px]"
          />

          {sideCardItems.length > 0 ? (
            <div className="flex flex-col gap-6 lg:h-full">
              {sideCardItems.map((item) => (
                <YouMayAlsoLikeSideCard key={item.id} item={item} className="lg:flex-1" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
