import Image from 'next/image';
import Link from 'next/link';

import { RichText } from '@/components/ui/RichText';
import type { SectorCompanyCardItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

type SectorCompanyFeatureProps = {
  item: SectorCompanyCardItem;
  className?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3.5 9h10M10 5.5 14 9 10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectorCompanyFeatureLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    'inline-flex items-center gap-2 py-3.5 text-lg leading-7 font-bold text-[#123476] transition-opacity hover:opacity-80';

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

export function SectorCompanyFeature({ item, className }: SectorCompanyFeatureProps) {
  const hasImage = Boolean(item.imageUrl);

  return (
    <article
      className={cn(
        'flex w-full flex-col gap-8 bg-white lg:flex-row lg:items-stretch lg:gap-16',
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-6">
        <div className="flex min-h-[6.625rem] w-full items-center justify-start">
          <Image
            src={item.logoUrl}
            alt={item.title}
            width={item.logoWidth}
            height={item.logoHeight}
            className="block max-h-[4.5625rem] w-auto max-w-full object-contain object-left"
          />
        </div>

        <div className="flex flex-col gap-6">
          {item.body ? (
            <RichText
              document={item.body}
              className="text-body text-xl leading-7 [&_p]:text-xl [&_p]:leading-7"
            />
          ) : item.description ? (
            <p className="text-body text-xl leading-7">{item.description}</p>
          ) : null}

          {item.href ? (
            <SectorCompanyFeatureLink
              href={item.href}
              label={item.linkLabel}
              external={item.external}
            />
          ) : null}
        </div>
      </div>

      {hasImage ? (
        <div className="relative min-h-[17.5rem] flex-1 overflow-hidden rounded-lg lg:min-h-0">
          <Image
            src={item.imageUrl!}
            alt={item.imageAlt ?? item.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}
    </article>
  );
}
