import type { Entry } from 'contentful';
import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink, type ResolvedNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type NewsDetailMoreAboutGroupCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

const CONOCER_MAS_LABEL = 'Conocer más';

function ConocerMasCta({ link }: { link: ResolvedNavLink }) {
  const className =
    'inline-flex items-center gap-2 text-xs leading-[18px] !text-white transition-opacity hover:opacity-80';

  const content = (
    <>
      {CONOCER_MAS_LABEL}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 text-white">
        <path
          d="M2.5 6H9M6.5 3 9.5 6 6.5 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (link.isExternal) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

export function NewsDetailMoreAboutGroupCard({
  fields,
  className,
}: NewsDetailMoreAboutGroupCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';

  return (
    <article className={cn('flex h-full flex-col', className)}>
      {imageUrl ? (
        <div className="relative h-[252px] w-full overflow-hidden bg-[#ddd]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 344px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      {fields.title ? (
        <h3 className="pt-2.5 text-lg leading-normal font-bold text-white">{fields.title}</h3>
      ) : null}

      {fields.description ? (
        <p className="pt-3 pb-5 text-sm leading-[21.94px] text-white/80">{fields.description}</p>
      ) : null}

      {link ? <ConocerMasCta link={link} /> : null}
    </article>
  );
}
