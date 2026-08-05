import type { Entry } from 'contentful';

import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { NewsDetailMoreAboutGroupCard } from './NewsDetailMoreAboutGroupCard';

type NewsDetailMoreAboutGroupSectionProps = {
  tag?: string;
  title?: string;
  cards: CardFields[];
  className?: string;
};

function resolveCardEntries(items?: Entry[]): CardFields[] {
  return (
    items
      ?.filter((item) => item.sys.contentType?.sys.id === 'card')
      .map((item) => item.fields as CardFields) ?? []
  );
}

export function resolveNewsDetailMoreAboutGroupCards(
  items?: Entry[],
): CardFields[] {
  return resolveCardEntries(items);
}

export function NewsDetailMoreAboutGroupSection({
  tag,
  title,
  cards,
  className,
}: NewsDetailMoreAboutGroupSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className={cn(
        'bg-footer-bg text-white px-6 py-10 md:px-layout-x md:py-20',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-10">
        {tag || title ? (
          <header className="flex flex-col">
            {tag ? (
              <p className="text-[10.5px] leading-[15.75px] tracking-[2.1px] text-white uppercase">
                {tag}
              </p>
            ) : null}

            {title ? (
              <h2 className="pt-3 text-[2rem] leading-10 font-bold text-white">{title}</h2>
            ) : null}
          </header>
        ) : null}

        <div
          className={cn(
            'grid gap-6',
            cards.length === 1
              ? 'max-w-[21.5rem]'
              : cards.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {cards.map((card, index) => (
            <NewsDetailMoreAboutGroupCard
              key={`${card.contentfulName}-${index}`}
              fields={card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
