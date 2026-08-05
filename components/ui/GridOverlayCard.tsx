import Image from 'next/image';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type GridOverlayCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

export function GridOverlayCard({ fields, className }: GridOverlayCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';

  if (!imageUrl) return null;

  const content = (
    <>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div aria-hidden className="absolute inset-0 rounded-lg bg-black/30" />

      <div className="relative z-10 flex flex-col gap-3">
        {fields.title ? (
          <h3 className="text-xl font-bold leading-6 text-white">{fields.title}</h3>
        ) : null}

        {fields.description ? (
          <p className="text-base leading-6 text-white">{fields.description}</p>
        ) : null}
      </div>
    </>
  );

  const cardClassName = cn(
    'group relative flex h-[320px] flex-col justify-end overflow-hidden rounded-lg p-5 md:h-[381px]',
    link && 'cursor-pointer',
    className,
  );

  if (link && !link.isExternal) {
    return (
      <Link href={link.href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  if (link?.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
