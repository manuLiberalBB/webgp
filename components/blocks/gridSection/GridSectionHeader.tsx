import Image from 'next/image';

import { Badge } from '@/components/ui/Badge';

type GridSectionHeaderProps = {
  tag?: string;
  title?: string;
  subtitle?: string;
  iconUrl?: string;
};

export function GridSectionHeader({
  tag,
  title,
  subtitle,
  iconUrl,
}: GridSectionHeaderProps) {
  if (!tag && !title && !subtitle && !iconUrl) return null;

  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">
      {tag || iconUrl ? (
        <div className="flex items-center gap-3">
          {iconUrl ? (
            <div className="relative size-8 shrink-0">
              <Image src={iconUrl} alt="" fill className="object-contain" />
            </div>
          ) : null}
          {tag ? <Badge>{tag}</Badge> : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 md:gap-6">
        {title ? (
          <h2 className="text-heading text-[2.25rem] leading-tight font-semibold tracking-[-0.72px] md:text-5xl md:leading-[3.75rem] md:tracking-[-0.96px]">
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p className="text-body text-lg leading-7 md:text-xl">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
