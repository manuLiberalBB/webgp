import type { CarouselItem } from '@/lib/contentful/carousel/types';
import { cn } from '@/lib/utils';

import { CompanyLogoGrid } from '@/components/sections/sectors/CompanyLogoGrid';

type LogoGridSectionProps = {
  title?: string;
  items: CarouselItem[];
  className?: string;
};

export function LogoGridSection({ title, items, className }: LogoGridSectionProps) {
  return (
    <section
      className={cn(
        'bg-white px-6 pt-[30px] pb-section-y md:px-layout-x',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col gap-12">
        {title ? (
          <h2 className="text-heading text-center text-[2rem] leading-[3.75rem] font-semibold tracking-[-0.64px]">
            {title}
          </h2>
        ) : null}

        <CompanyLogoGrid items={items} />
      </div>
    </section>
  );
}
