import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { GridCard } from '@/components/ui/GridCard';

type IconCardGridSectionProps = {
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  className?: string;
};

function IconCardGridHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  if (!title && !subtitle) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      {title ? (
        <h2 className="text-heading text-[2.25rem] leading-tight font-normal tracking-[-0.72px] md:text-5xl md:leading-[3.75rem] md:tracking-[-0.96px]">
          {title}
        </h2>
      ) : null}

      {subtitle ? (
        <p className="text-body text-lg leading-7 md:text-xl">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function IconCardGridSection({
  title,
  subtitle,
  cards,
  className,
}: IconCardGridSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className={cn(
        'bg-white px-6 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-10 md:gap-16">
        <IconCardGridHeader title={title} subtitle={subtitle} />

        <div
          className={cn(
            'grid gap-10',
            cards.length === 1
              ? 'max-w-3xl'
              : cards.length === 2
                ? 'layout-md:grid-cols-2'
                : 'layout-md:grid-cols-2 layout-lg:grid-cols-3',
          )}
        >
          {cards.map((card, index) => (
            <GridCard key={`${card.contentfulName}-${index}`} fields={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
