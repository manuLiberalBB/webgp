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
        'bg-white px-10 pb-10 pt-10 md:px-layout-x md:pb-20 md:pt-12',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-content">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {items.map((item) => (
            <FeaturedNewsCard key={item.id} item={item} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
