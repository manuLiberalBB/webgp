import Link from 'next/link';
import type { Entry } from 'contentful';

import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type FoundationsConoceCtaCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

function ArrowForwardIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M5 12h12M13 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConoceCtaButton({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    'inline-flex shrink-0 items-center gap-3 rounded-lg bg-cta px-[18px] py-[14px] text-lg leading-7 font-semibold !text-white transition-opacity hover:opacity-90';

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ArrowForwardIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowForwardIcon />
    </Link>
  );
}

export function FoundationsConoceCtaCard({ fields, className }: FoundationsConoceCtaCardProps) {
  const link = resolveCardLink(fields.url);

  if (!fields.title && !fields.description && !link) return null;

  return (
    <article
      className={cn(
        'flex w-full flex-col items-center justify-between gap-6 rounded-lg border border-badge bg-badge/20 p-6 text-center md:flex-row md:items-center md:gap-10 md:p-[41px] md:text-left',
        className,
      )}
    >
      {fields.title || fields.description ? (
        <div className="flex min-w-0 flex-col items-center md:items-start">
          {fields.title ? (
            <h3 className="text-heading text-lg leading-[30px] font-semibold">
              {fields.title}
            </h3>
          ) : null}

          {fields.description ? (
            <p className="text-body pt-1 text-base leading-[22.5px]">{fields.description}</p>
          ) : null}
        </div>
      ) : null}

      {link ? (
        <ConoceCtaButton href={link.href} label={link.label} external={link.isExternal} />
      ) : null}
    </article>
  );
}
