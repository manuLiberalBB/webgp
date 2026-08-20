import type { Entry } from 'contentful';

import type { SectorCompanyCardItem } from '@/lib/contentful/sector/types';
import type { SectorCompaniesLayout } from '@/lib/contentful/sector/resolveSectorCompaniesFromItems';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/Badge';
import { CtaLinks } from '@/components/ui/CtaLinks';
import { SectorBankingCompanyCard } from './SectorBankingCompanyCard';
import { SectorCompanyCard } from './SectorCompanyCard';
import { SectorCompanyFeature } from './SectorCompanyFeature';

type SectorCompaniesSectionProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  items: SectorCompanyCardItem[];
  urlList?: Entry[];
  layout?: SectorCompaniesLayout;
  className?: string;
};

function SectorCompaniesFeatureHeader({
  tag,
  title,
  subtitle,
}: {
  tag?: string;
  title?: string;
  subtitle?: string;
}) {
  if (!tag && !title && !subtitle) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      {tag ? (
        <Badge className="bg-cta w-fit self-start rounded px-3 py-2 text-sm leading-5 tracking-[0.35px]">
          {tag}
        </Badge>
      ) : null}

      {title ? (
        <h2 className="text-heading text-[2rem] leading-[1.2] font-semibold tracking-[-0.96px] md:text-5xl md:leading-[3.75rem]">
          {title}
        </h2>
      ) : null}

      {subtitle ? (
        <p className="text-body max-w-none text-xl leading-normal">{subtitle}</p>
      ) : null}
    </div>
  );
}

function SectorCompaniesCardsHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  if (!title && !subtitle) return null;

  return (
    <div className="flex w-full flex-col gap-3">
      {title ? (
        <h2 className="text-card-title text-[28px] leading-normal font-semibold tracking-[-0.56px] md:leading-[3.75rem]">
          {title}
        </h2>
      ) : null}

      {subtitle ? (
        <p className="text-card-subtitle text-base leading-5">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function SectorCompaniesSection({
  tag,
  title,
  subtitle,
  items,
  urlList,
  layout = 'feature',
  className,
}: SectorCompaniesSectionProps) {
  if (items.length === 0) return null;

  const isFeatureLayout = layout === 'feature';
  const isBankingLayout = layout === 'banking';
  const usesFeatureHeader = isFeatureLayout || isBankingLayout;

  return (
    <section
      className={cn(
        'bg-white px-6 pb-7 md:px-layout-x md:pb-section-y',
        usesFeatureHeader && 'pt-7 md:pt-section-y',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-content flex-col',
          usesFeatureHeader ? 'gap-8 md:gap-[3.75rem]' : 'gap-5 md:gap-12',
        )}
      >
        {usesFeatureHeader ? (
          <SectorCompaniesFeatureHeader tag={tag} title={title} subtitle={subtitle} />
        ) : (
          <SectorCompaniesCardsHeader title={title} subtitle={subtitle} />
        )}

        {isFeatureLayout ? (
          <div className="flex w-full flex-col gap-16 md:gap-[6.25rem]">
            {items.map((item) => (
              <SectorCompanyFeature key={item.id} item={item} />
            ))}
          </div>
        ) : isBankingLayout ? (
          <div className="grid grid-cols-1 gap-5 min-[640px]:grid-cols-2 layout-lg:grid-cols-4">
            {items.map((item) => (
              <SectorBankingCompanyCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 layout-md:grid-cols-2 layout-lg:grid-cols-3">
            {items.map((item) => (
              <SectorCompanyCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {urlList?.length ? <CtaLinks links={urlList} /> : null}
      </div>
    </section>
  );
}
