import { AllNewsCard } from '@/components/news/AllNewsCard';
import { FeaturedNewsCard } from '@/components/news/FeaturedNewsCard';
import type { NewsListItem } from '@/lib/news/types';
import { cn } from '@/lib/utils';

type TalentCultureNewsSectionProps = {
  items: NewsListItem[];
  className?: string;
};

export function TalentCultureNewsSection({
  items,
  className,
}: TalentCultureNewsSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={cn(
        'overflow-x-hidden bg-white px-10 pb-10 pt-10 md:px-layout-x md:pb-20 md:pt-12',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="lg:hidden -mx-10 min-w-0 overflow-x-auto overscroll-x-contain px-10 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full snap-x snap-mandatory gap-6">
            {items.map((item) => (
              <AllNewsCard
                key={item.id}
                item={item}
                className="w-[calc(100vw-5.5rem)] max-w-[320px] shrink-0 snap-start snap-always"
              />
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-1 gap-4 lg:grid lg:grid-cols-3">
          {items.map((item) => (
            <FeaturedNewsCard key={item.id} item={item} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
