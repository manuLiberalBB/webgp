import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { ProgramDevelopmentCard } from './ProgramDevelopmentCard';

type ProgramsDevelopmentSectionProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  cards: CardFields[];
  sectionId?: string;
  className?: string;
};

const DESKTOP_COLUMNS = 3;

function getProgramCardColumnClassName(index: number, total: number) {
  const remainder = total % DESKTOP_COLUMNS;

  if (remainder === 0) {
    return 'layout-md:col-span-2';
  }

  const lastRowStart = total - remainder;

  if (index < lastRowStart) {
    return 'layout-md:col-span-2';
  }

  if (remainder === 1) {
    return 'layout-md:col-span-6';
  }

  return 'layout-md:col-span-3';
}

export function ProgramsDevelopmentSection({
  tag,
  title,
  subtitle,
  cards,
  sectionId,
  className,
}: ProgramsDevelopmentSectionProps) {
  if (cards.length === 0) return null;

  return (
    <section
      id={sectionId}
      className={cn(
        'section-anchor overflow-x-hidden bg-white px-6 pt-0 pb-10 md:px-layout-x md:pt-0 md:pb-section-y',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-16">
        {tag || title || subtitle ? (
          <header className="flex w-full flex-col items-center gap-8">
            {tag ? (
              <span className="inline-flex items-center justify-center rounded bg-[#0b2d4e] px-3 py-2 text-sm font-semibold tracking-[0.35px] text-white uppercase">
                {tag}
              </span>
            ) : null}

            {title || subtitle ? (
              <div className="flex w-full flex-col items-center gap-6 text-center">
                {title ? (
                  <h2 className="text-heading w-full text-[2rem] leading-[2.5rem] font-normal tracking-[-0.8px] md:text-[2.5rem] md:leading-[3.75rem]">
                    {title}
                  </h2>
                ) : null}

                {subtitle ? (
                  <p className="text-heading w-full text-xl leading-normal">{subtitle}</p>
                ) : null}
              </div>
            ) : null}
          </header>
        ) : null}

        <div className="layout-md:hidden -mx-6 min-w-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-start gap-6">
            {cards.map((card, index) => (
              <ProgramDevelopmentCard
                key={`${card.contentfulName}-${index}`}
                fields={card}
                className="w-[calc(100vw-3.5rem)] max-w-[280px] shrink-0 snap-start snap-always"
              />
            ))}
          </div>
        </div>

        <div className="hidden gap-6 layout-md:grid layout-md:grid-cols-6">
          {cards.map((card, index) => (
            <ProgramDevelopmentCard
              key={`${card.contentfulName}-${index}`}
              fields={card}
              className={getProgramCardColumnClassName(index, cards.length)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
