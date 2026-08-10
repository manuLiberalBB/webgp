import Image from 'next/image';
import type { ReactNode } from 'react';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

function renderTextWithBoldMarkers(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

type I3InnovationPanelProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  className?: string;
  hideTag?: boolean;
};

function I3FeatureItem({ card }: { card: CardFields }) {
  const iconUrl = card.icon ? getAssetUrl(card.icon) : undefined;

  return (
    <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
      {iconUrl ? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[rgba(21,93,252,0.1)]">
          <Image src={iconUrl} alt="" width={20} height={20} className="size-5" />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-col md:flex-1">
        {card.title ? (
          <p className="text-heading text-lg leading-6 font-semibold">{card.title}</p>
        ) : null}

        {card.description ? (
          <p className="text-body pt-1 text-base leading-[22px]">{card.description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function I3InnovationPanel({
  tag,
  title,
  subtitle,
  cards,
  className,
  hideTag = false,
}: I3InnovationPanelProps) {
  return (
    <div className={cn('flex w-full flex-col gap-10', className)}>
      {!hideTag && tag ? (
        <span className="inline-flex w-fit items-center justify-center rounded bg-[#0b2d4e] px-3 py-2 text-sm font-semibold tracking-[0.35px] text-white uppercase">
          {tag}
        </span>
      ) : null}

      <div className="flex w-full flex-col gap-10">
        {title || subtitle ? (
          <div className="flex flex-col gap-3">
            {title ? (
              <h2 className="text-heading text-[2.25rem] leading-[2.75rem] font-semibold md:text-[3rem] md:leading-normal">
                {title}
              </h2>
            ) : null}

            {subtitle ? (
              <p className="text-body text-xl leading-normal">
                {renderTextWithBoldMarkers(subtitle)}
              </p>
            ) : null}
          </div>
        ) : null}

        {cards.length > 0 ? (
          <div className="flex flex-col gap-5 md:pb-10">
            {cards.map((card, index) => (
              <I3FeatureItem key={`${card.contentfulName}-${index}`} card={card} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
