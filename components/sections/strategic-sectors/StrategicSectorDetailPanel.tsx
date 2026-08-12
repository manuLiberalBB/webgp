import { AppImage as Image } from '@/components/cms/AppImage';

import { Button } from '@/components/ui/Button';
import type { StrategicSectorGridItem } from '@/lib/contentful/strategicSector/types';
import { STRATEGIC_SECTOR_CONTRIBUTE_HEADING } from '@/lib/contentful/strategicSector/mapStrategicSectorToGridItem';
import { cn } from '@/lib/utils';

type StrategicSectorDetailPanelProps = {
  item: StrategicSectorGridItem;
  className?: string;
};

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0">
      <path
        d="M2.625 7h7.875M8.312 4.375 11.375 7l-3.063 2.625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StrategicSectorDetailPanel({
  item,
  className,
}: StrategicSectorDetailPanelProps) {
  const detailImageUrl = item.detailImageUrl ?? item.imageUrl;
  const detailImageAlt = item.detailImageAlt ?? item.imageAlt;

  return (
    <div className={cn('flex w-full min-w-0 flex-col gap-6', className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-heading text-[28px] leading-tight font-semibold tracking-[-0.56px]">
          {item.title}
        </h3>

        {item.sectorSubtitle ? (
          <p className="text-base leading-6 text-[#6b6358]">{item.sectorSubtitle}</p>
        ) : null}
      </div>

      <div className="w-full min-w-0 overflow-hidden rounded-lg border border-[rgba(27,42,56,0.12)]">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="relative h-[280px] w-full lg:h-[496px]">
            <Image
              src={detailImageUrl}
              alt={detailImageAlt}
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-col justify-center bg-white p-8 lg:p-10">
            <div className="flex flex-col gap-6">
              {item.body ? (
                <p className="text-base leading-[26px] text-[#6b6358]">{item.body}</p>
              ) : null}

              {item.waysWeContribute.length > 0 ? (
                <div className="flex flex-col">
                  <p className="text-sm leading-[22.75px] font-semibold text-[#6b6358]">
                    {STRATEGIC_SECTOR_CONTRIBUTE_HEADING}
                  </p>

                  <ul className="pt-2 pb-8">
                    {item.waysWeContribute.map((way) => (
                      <li
                        key={way}
                        className="border-b border-[rgba(27,42,56,0.12)] py-4 text-sm leading-5 text-[#6b6358]"
                      >
                        {way}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {item.projectsHref ? (
              <Button
                href={item.projectsHref}
                external={item.projectsExternal}
                className="w-full justify-center px-5 py-3 text-sm leading-5 lg:w-auto lg:self-start"
              >
                {item.projectsLabel}
                <ArrowRightIcon />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
