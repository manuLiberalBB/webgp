import { AppImage as Image, AUTO_ASPECT_STYLE } from '@/components/cms/AppImage';
import Link from 'next/link';

import type { SectorCompanyCardItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

type SectorCompanyCardProps = {
  item: SectorCompanyCardItem;
  className?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2 6h7.5M6.5 3.5 10 6.5 6.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectorCompanyCardLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    'text-link-cta inline-flex h-[18px] items-center gap-1 text-[10px] leading-[18px] font-semibold whitespace-nowrap transition-opacity hover:opacity-80 md:gap-2 md:text-base';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowIcon />
    </Link>
  );
}

export function SectorCompanyCard({ item, className }: SectorCompanyCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col items-center gap-2.5 rounded-2xl border border-card-border px-5 py-6 md:items-stretch md:gap-0 md:px-6 md:py-8',
        className,
      )}
    >
      <div className="flex w-full flex-1 flex-col items-center gap-2.5 md:items-stretch md:gap-5">
        <div className="flex w-full flex-1 flex-col items-center gap-2 md:items-stretch md:gap-2">
          <div className="flex h-10 w-full items-center justify-center md:h-12 md:justify-start">
            <Image
              src={item.logoUrl}
              alt={item.title}
              width={item.logoWidth}
              height={item.logoHeight}
              style={AUTO_ASPECT_STYLE}
              className="block max-h-10 w-auto max-w-full object-contain md:max-h-12 md:object-left"
            />
          </div>

          {item.tagline ? (
            <p className="text-card-description hidden text-base leading-6 md:block">
              {item.tagline}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex min-h-[18px] w-full items-center justify-center md:justify-start">
          {item.href ? (
            <SectorCompanyCardLink
              href={item.href}
              label={item.linkLabel}
              external={item.external}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
