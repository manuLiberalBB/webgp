import Image from 'next/image';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

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
    <div className="flex items-start gap-4">
      {iconUrl ? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[rgba(21,93,252,0.1)]">
          <Image src={iconUrl} alt="" width={20} height={20} className="size-5" />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
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
              <h2 className="text-heading text-[3rem] leading-normal font-semibold">{title}</h2>
            ) : null}

            {subtitle ? (
              <p className="text-body text-xl leading-normal">{subtitle}</p>
            ) : null}
          </div>
        ) : null}

        {cards.length > 0 ? (
          <div className="flex flex-col gap-5 pb-10">
            {cards.map((card, index) => (
              <I3FeatureItem key={`${card.contentfulName}-${index}`} card={card} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
