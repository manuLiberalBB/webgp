import Image from 'next/image';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { cn } from '@/lib/utils';

type GridCardProps = {
  fields: CardFields;
  className?: string;
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

export function GridCard({ fields, className }: GridCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const iconUrl = fields.icon ? getAssetUrl(fields.icon) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';

  const content = (
    <>
      {imageUrl ? (
        <div className="relative aspect-[244/160] w-full overflow-hidden rounded-[20px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-6">
        {fields.tag ? (
          <span className="text-badge text-sm font-semibold tracking-[0.35px] uppercase">
            {fields.tag}
          </span>
        ) : null}

        {iconUrl ? (
          <div className="relative size-10">
            <Image src={iconUrl} alt="" fill className="object-contain" />
          </div>
        ) : null}

        {fields.title ? (
          <h3 className="text-heading text-2xl leading-snug font-semibold tracking-[-0.48px]">
            {fields.title}
          </h3>
        ) : null}

        {fields.description ? (
          <p className="text-body text-lg leading-7">{fields.description}</p>
        ) : null}

        {link ? (
          <span className="text-link-cta text-sm font-semibold underline underline-offset-4">
            {link.label}
          </span>
        ) : null}
      </div>
    </>
  );

  const cardClassName = cn('flex h-full flex-col', className);

  if (link && !link.isExternal) {
    return (
      <Link href={link.href} className={cn(cardClassName, 'group')}>
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
        className={cn(cardClassName, 'group')}
      >
        {content}
      </a>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}
