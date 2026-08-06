import type { SectorCompanyCardItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

import { SectorCompanyCard } from './SectorCompanyCard';

type StrategicSectorRelatedCompaniesProps = {
  title?: string;
  subtitle?: string;
  items: SectorCompanyCardItem[];
  className?: string;
};

export function StrategicSectorRelatedCompanies({
  title = 'Empresas que impulsan este sector',
  subtitle = 'Así trabajan en conjunto las empresas del Grupo Petersen dentro de este sector.',
  items,
  className,
}: StrategicSectorRelatedCompaniesProps) {
  if (items.length === 0) return null;

  return (
    <section className={cn('flex w-full flex-col gap-5 md:gap-12', className)}>
      <div className="flex w-full flex-col gap-3">
        <h3 className="text-card-title text-[28px] leading-normal font-semibold tracking-[-0.56px] md:leading-[3.75rem]">
          {title}
        </h3>

        {subtitle ? (
          <p className="text-card-subtitle max-w-[54.875rem] text-base leading-5">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <SectorCompanyCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
