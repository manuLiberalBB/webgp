import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { GridOverlayCard } from '@/components/ui/GridOverlayCard';

type ImageOverlayGridSectionProps = {
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  headerAlign?: 'center' | 'left';
  cardLayout?: 'default' | 'three-two';
  titleClassName?: string;
  subtitleClassName?: string;
  cardVariant?: 'default' | 'foundationArea';
  expandableDescription?: boolean;
  className?: string;
};

function getDefaultCardGridClassName(count: number) {
  if (count === 1) return 'mx-auto max-w-md';
  if (count === 2) return 'md:grid-cols-2';
  if (count === 3) return 'md:grid-cols-2 lg:grid-cols-3';
  if (count === 4) return 'md:grid-cols-2 lg:grid-cols-4';
  if (count === 5) return 'md:grid-cols-2 lg:grid-cols-5';

  return 'md:grid-cols-2 lg:grid-cols-4';
}

function getCardColumnClassName(
  layout: ImageOverlayGridSectionProps['cardLayout'],
  index: number,
  total: number,
) {
  if (layout !== 'three-two' || total !== 5) return undefined;

  return index < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
}

export function ImageOverlayGridSection({
  title,
  subtitle,
  cards,
  headerAlign = 'center',
  cardLayout = 'default',
  titleClassName,
  subtitleClassName,
  cardVariant = 'default',
  expandableDescription = false,
  className,
}: ImageOverlayGridSectionProps) {
  if (cards.length === 0) return null;

  const isThreeTwoLayout = cardLayout === 'three-two' && cards.length === 5;
  const isLeftHeader = headerAlign === 'left';

  return (
    <section
      className={cn(
        'bg-white px-6 py-10 md:px-layout-x md:py-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-12">
        {(title || subtitle) && (
          <div
            className={cn(
              'flex w-full flex-col gap-5',
              isLeftHeader ? 'items-start text-left' : 'items-center text-center',
            )}
          >
            {title ? (
              <h2
                className={cn(
                  'text-ecosystem-title text-[2rem] leading-tight font-normal md:text-[3rem] md:leading-[3rem]',
                  isLeftHeader && 'w-full',
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p
                className={cn(
                  'text-ecosystem-body text-lg leading-7 md:text-xl',
                  !isLeftHeader && 'max-w-[54.875rem]',
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        )}

        <div
          className={cn(
            'grid w-full min-w-0 items-stretch gap-6',
            isThreeTwoLayout
              ? 'grid-cols-1 lg:grid-cols-6'
              : getDefaultCardGridClassName(cards.length),
          )}
        >
          {cards.map((card, index) => (
            <GridOverlayCard
              key={`${card.contentfulName}-${index}`}
              fields={card}
              variant={cardVariant}
              expandableDescription={expandableDescription}
              className={getCardColumnClassName(cardLayout, index, cards.length)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
