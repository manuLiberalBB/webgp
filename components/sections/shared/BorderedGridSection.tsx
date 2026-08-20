import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { BorderedGridCard } from '@/components/ui/BorderedGridCard';

type BorderedGridSectionProps = {
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  className?: string;
};

export function BorderedGridSection({
  title,
  subtitle,
  cards,
  className,
}: BorderedGridSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className={cn(
        'bg-ecosystem px-6 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-16">
        {(title || subtitle) && (
          <div className="flex flex-col gap-6">
            {title ? (
              <h2 className="text-heading text-[2.25rem] leading-tight font-semibold tracking-[-0.72px] md:text-5xl md:leading-[3.75rem] md:tracking-[-0.96px]">
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p className="text-body text-lg leading-normal md:text-xl">{subtitle}</p>
            ) : null}
          </div>
        )}

        <div
          className={cn(
            'grid gap-6',
            cards.length === 1
              ? 'max-w-md'
              : cards.length === 2
                ? 'layout-md:grid-cols-2'
                : 'layout-md:grid-cols-2 layout-lg:grid-cols-3',
          )}
        >
          {cards.map((card, index) => (
            <BorderedGridCard key={`${card.contentfulName}-${index}`} fields={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
