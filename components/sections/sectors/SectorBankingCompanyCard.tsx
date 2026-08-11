import Image from 'next/image';
import Link from 'next/link';

import type { SectorCompanyCardItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

import { SectorCompanySocialLinks } from './SectorCompanySocialLinks';

type SectorBankingCompanyCardProps = {
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

function SectorBankingCompanyWebsiteLink({ item }: { item: SectorCompanyCardItem }) {
  if (!item.href) return null;

  const linkClassName =
    'inline-flex items-center gap-2 text-sm leading-[18px] font-semibold text-white transition-opacity hover:opacity-80';

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {item.linkLabel}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={item.href} className={linkClassName}>
      {item.linkLabel}
      <ArrowIcon />
    </Link>
  );
}

function SectorBankingCompanyCardContent({ item }: { item: SectorCompanyCardItem }) {
  return (
    <>
      <Image
        src={item.imageUrl!}
        alt={item.imageAlt ?? item.title}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover object-top"
      />

      <div aria-hidden className="absolute inset-0 rounded-lg bg-black/30" />

      <div className="relative z-10 flex flex-col items-start gap-6">
        {item.iconUrl ? (
          <div className="relative size-[1.9375rem] shrink-0">
            <Image
              src={item.iconUrl}
              alt=""
              width={item.iconWidth}
              height={item.iconHeight}
              className="size-full object-contain brightness-0 invert"
            />
          </div>
        ) : null}

        <div className="flex w-full flex-col items-start gap-3">
          <h3 className="text-xl leading-6 font-bold text-white">{item.title}</h3>

          <SectorBankingCompanyWebsiteLink item={item} />

          <SectorCompanySocialLinks
            linkedinUrl={item.linkedinUrl}
            instagramUrl={item.instagramUrl}
          />
        </div>
      </div>
    </>
  );
}

export function SectorBankingCompanyCard({ item, className }: SectorBankingCompanyCardProps) {
  if (!item.imageUrl) return null;

  return (
    <article
      className={cn(
        'group relative flex h-[20rem] flex-col justify-end overflow-hidden rounded-lg p-5 md:h-[23.8125rem]',
        className,
      )}
    >
      <SectorBankingCompanyCardContent item={item} />
    </article>
  );
}
