import Image from 'next/image';
import type { Document } from '@contentful/rich-text-types';

import { Badge } from '@/components/ui/Badge';
import { RichText } from '@/components/ui/RichText';
import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type BankingSustainabilitySectionProps = {
  tag?: string;
  title?: string;
  body: Document;
  imageUrl: string;
  imageAlt?: string;
  cards: CardFields[];
  className?: string;
};

const SUSTAINABILITY_CARD_THEMES = [
  { border: '#198038', text: '#198038' },
  { border: '#d26200', text: '#d26200' },
  { border: '#116dd9', text: '#0033a3' },
] as const;

function BankingSustainabilityCard({
  card,
  theme,
}: {
  card: CardFields;
  theme: (typeof SUSTAINABILITY_CARD_THEMES)[number];
}) {
  const iconUrl = card.icon ? getAssetUrl(card.icon) : undefined;

  return (
    <article
      className="flex w-full items-center gap-3 rounded-lg border p-[17px]"
      style={{ borderColor: theme.border }}
    >
      {iconUrl ? (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md">
          <div className="relative size-5">
            <Image src={iconUrl} alt="" fill className="object-contain" />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {card.title ? (
          <h3
            className="text-base leading-[21px] font-semibold"
            style={{ color: theme.text }}
          >
            {card.title}
          </h3>
        ) : null}

        {card.description ? (
          <p
            className="text-sm leading-[18px] font-normal"
            style={{ color: theme.text }}
          >
            {card.description}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export function BankingSustainabilitySection({
  tag,
  title,
  body,
  imageUrl,
  imageAlt = '',
  cards,
  className,
}: BankingSustainabilitySectionProps) {
  if (cards.length === 0) return null;

  return (
    <section
      className={cn(
        'bg-white px-[18px] pt-0 pb-12 md:px-layout-x md:py-[3.75rem]',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col-reverse gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="relative h-[20rem] w-full min-w-0 shrink-0 overflow-hidden rounded-lg lg:h-[39.3125rem] lg:flex-1">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-10">
          <div className="flex flex-col gap-5">
            {tag ? (
              <Badge className="bg-cta w-fit self-start rounded px-3 py-2 text-sm leading-5 tracking-[0.35px]">
                {tag}
              </Badge>
            ) : null}

            {title ? (
              <h2 className="text-heading text-[2rem] leading-normal font-normal tracking-[-0.96px] md:text-5xl">
                {title}
              </h2>
            ) : null}

            <RichText document={body} className="banking-sustainability-body" />
          </div>

          <div className="flex w-full flex-col gap-4">
            {cards.map((card, index) => (
              <BankingSustainabilityCard
                key={`${card.contentfulName}-${index}`}
                card={card}
                theme={
                  SUSTAINABILITY_CARD_THEMES[index] ??
                  SUSTAINABILITY_CARD_THEMES[SUSTAINABILITY_CARD_THEMES.length - 1]
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
