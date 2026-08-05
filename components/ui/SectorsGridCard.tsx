import Image from 'next/image';
import Link from 'next/link';

import type { SectorsGridItem } from '@/lib/contentful/sector/types';
import { cn } from '@/lib/utils';

type SectorsGridCardProps = {
  item: SectorsGridItem;
  className?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3 8h9M9 4.5 13 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectorsGridCardContent({ item }: { item: SectorsGridItem }) {
  return (
    <>
      <div className="relative h-40 shrink-0 w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col">
            <div className="mb-4 flex size-12 items-center justify-center rounded bg-[rgba(21,93,252,0.1)]">
              <div className="relative size-6">
                <Image
                  src={item.iconUrl}
                  alt={item.iconAlt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <h3 className="mb-2 text-lg font-semibold leading-6 text-[#123476]">
              {item.title}
            </h3>

            <p className="text-body text-base leading-normal">{item.description}</p>
          </div>

          {item.href && item.linkLabel ? (
            <span className="text-link-cta inline-flex items-center gap-2 pt-4 text-sm font-semibold leading-[21px] transition-opacity group-hover:opacity-80">
              {item.linkLabel}
              <ArrowIcon />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function SectorsGridCard({ item, className }: SectorsGridCardProps) {
  const articleClassName =
    'flex h-full min-h-[439px] flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow group-hover:shadow-md';

  if (item.href && !item.external) {
    return (
      <Link href={item.href} className={cn('group block h-full', className)}>
        <article className={articleClassName}>
          <SectorsGridCardContent item={item} />
        </article>
      </Link>
    );
  }

  if (item.href && item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('group block h-full', className)}
      >
        <article className={articleClassName}>
          <SectorsGridCardContent item={item} />
        </article>
      </a>
    );
  }

  return (
    <article
      className={cn(
        'flex h-full min-h-[439px] flex-col overflow-hidden rounded-lg border border-black/10 bg-white',
        className,
      )}
    >
      <SectorsGridCardContent item={item} />
    </article>
  );
}
