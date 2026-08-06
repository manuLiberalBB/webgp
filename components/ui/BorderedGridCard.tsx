import Image from 'next/image';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink, type ResolvedNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

import { HashNavLink } from './HashNavLink';

type BorderedGridCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

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

function FeatureCardCta({ link }: { link: ResolvedNavLink }) {
  const className =
    'text-link-cta inline-flex items-center justify-center gap-2 text-sm font-semibold leading-[21px] transition-opacity hover:opacity-80';

  if (link.isExternal) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <HashNavLink href={link.href} className={className}>
      {link.label}
      <ArrowIcon />
    </HashNavLink>
  );
}

export function BorderedGridCard({ fields, className }: BorderedGridCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';

  return (
    <article
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border border-card-border bg-white',
        className,
      )}
    >
      {imageUrl ? (
        <div className="relative aspect-[1408/1000] w-full shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col items-center p-5 text-center">
        <div className="flex w-full flex-col gap-3">
          {fields.title ? (
            <h3 className="min-h-12 text-heading text-xl font-semibold leading-6 line-clamp-2">
              {fields.title}
            </h3>
          ) : null}

          <p className="min-h-[4.5rem] text-body text-base leading-6 line-clamp-3">
            {fields.description ?? '\u00A0'}
          </p>
        </div>

        {link ? (
          <div className="mt-auto pt-5">
            <FeatureCardCta link={link} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
