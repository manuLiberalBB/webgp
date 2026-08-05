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
        'section-anchor bg-white px-10 py-10 md:px-layout-x md:py-section-y',
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
                  <h2 className="text-heading w-full text-[2.5rem] leading-[3.75rem] font-normal tracking-[-0.8px]">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <ProgramDevelopmentCard key={`${card.contentfulName}-${index}`} fields={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
