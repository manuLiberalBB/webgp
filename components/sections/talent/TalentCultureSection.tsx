import Image from 'next/image';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type TalentCultureSectionProps = {
  title?: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt?: string;
  cards: CardFields[];
  className?: string;
};

function TalentCultureFeatureItem({ card }: { card: CardFields }) {
  const iconUrl = card.icon ? getAssetUrl(card.icon) : undefined;
  const iconAlt =
    (typeof card.icon?.fields.title === 'string' ? card.icon.fields.title : undefined) ??
    card.title ??
    '';

  return (
    <div className="flex items-start gap-4">
      {iconUrl ? (
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[rgba(21,93,252,0.1)]"
        >
          <Image src={iconUrl} alt={iconAlt} width={20} height={20} className="size-5" />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {card.title ? (
          <p className="text-heading text-lg font-semibold leading-7">{card.title}</p>
        ) : null}

        {card.description ? (
          <p className="text-body text-base leading-normal">{card.description}</p>
        ) : null}
      </div>
    </div>
  );
}

export function TalentCultureSection({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  cards,
  className,
}: TalentCultureSectionProps) {
  return (
    <section
      className={cn('bg-white px-10 py-10 md:px-layout-x md:py-20', className)}
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-10 lg:flex-row lg:gap-16">
        <div className="relative h-[300px] w-full min-w-0 flex-1 overflow-hidden rounded-lg lg:h-[485px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-col gap-10">
            {(title || subtitle) && (
              <div className="flex flex-col gap-6">
                {title ? (
                  <h2 className="text-heading text-[2.25rem] font-semibold leading-normal md:text-5xl">
                    {title}
                  </h2>
                ) : null}

                {subtitle ? (
                  <p className="text-body text-lg leading-normal md:text-xl">{subtitle}</p>
                ) : null}
              </div>
            )}

            {cards.length > 0 ? (
              <div className="flex flex-col gap-5">
                {cards.map((card, index) => (
                  <TalentCultureFeatureItem
                    key={`${card.contentfulName}-${index}`}
                    card={card}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
