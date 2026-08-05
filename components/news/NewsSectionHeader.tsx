import Link from 'next/link';

import { cn } from '@/lib/utils';

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M5.5 3.5L10 7.5L5.5 11.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NewsSectionHeaderProps = {
  title: string;
  viewAllHref?: string;
  titleSize?: 'default' | 'medium';
  layout?: 'row' | 'stacked';
  mobileCentered?: boolean;
  className?: string;
};

export function NewsSectionHeader({
  title,
  viewAllHref,
  titleSize = 'default',
  layout = 'row',
  mobileCentered = false,
  className,
}: NewsSectionHeaderProps) {
  const titleClassName = cn(
    'text-[#0d0d0d]',
    layout === 'stacked'
      ? 'text-[28px] leading-normal font-semibold'
      : titleSize === 'medium'
        ? 'text-[2rem] leading-[2.5rem] font-normal'
        : 'text-[2rem] leading-[1.2] font-normal tracking-[-0.96px] md:text-[3rem] md:leading-[3.75rem]',
    mobileCentered && 'w-full text-center md:w-auto md:text-left',
  );

  const viewAllClassName =
    layout === 'stacked'
      ? 'text-link-cta inline-flex items-center gap-1 text-base leading-[19.5px]'
      : 'text-link-cta inline-flex shrink-0 items-center gap-1 text-sm leading-[19.5px]';

  return (
    <div
      className={cn(
        layout === 'stacked'
          ? 'flex flex-col items-center gap-[22px] text-center'
          : 'flex items-center justify-between gap-4',
        mobileCentered && 'justify-center md:justify-between',
        className,
      )}
    >
      <h2 className={titleClassName}>{title}</h2>

      {viewAllHref ? (
        <Link href={viewAllHref} className={viewAllClassName}>
          Ver todas
          <ChevronRightIcon />
        </Link>
      ) : null}
    </div>
  );
}
