import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { CARD_IMAGE_OVERLAY_GRADIENT } from '@/lib/ui/cardImageOverlayGradient';
import { cn } from '@/lib/utils';

import { FoundationAreaCardDescription } from '@/components/sections/foundations/FoundationAreaCardDescription';
import { FoundationAreaTagBadge } from '@/components/sections/foundations/FoundationAreaTagBadge';

type GridOverlayCardProps = {
  fields: CardFields;
  className?: string;
  variant?: 'default' | 'foundationArea';
};

function resolveCardLink(url?: Entry[]) {
  const entry = url?.[0];
  if (!entry) return null;
  return resolveNavLink(entry);
}

export function GridOverlayCard({
  fields,
  className,
  variant = 'default',
}: GridOverlayCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';
  const isFoundationArea = variant === 'foundationArea';

  if (!imageUrl) return null;

  const content = isFoundationArea ? (
    <>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div
        aria-hidden
        className="absolute inset-0 rounded-lg"
        style={{ background: CARD_IMAGE_OVERLAY_GRADIENT }}
      />

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        {fields.tag ? (
          <div className="self-start">
            <FoundationAreaTagBadge
              tag={fields.tag}
              contentfulName={fields.contentfulName}
            />
          </div>
        ) : null}

        <div className="mt-auto flex w-full flex-col gap-1.5">
          {fields.title ? (
            <h3 className="text-xl font-bold leading-6 text-white">{fields.title}</h3>
          ) : null}

          {fields.description?.trim() ? (
            <FoundationAreaCardDescription text={fields.description.trim()} />
          ) : (
            <p aria-hidden className="min-h-[7.5rem] text-base leading-6 text-white">
              {'\u00A0'}
            </p>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div
        aria-hidden
        className="absolute inset-0 rounded-lg"
        style={{ background: CARD_IMAGE_OVERLAY_GRADIENT }}
      />

      <div className="relative z-10 flex w-full flex-col gap-1.5">
        {fields.title ? (
          <h3 className="line-clamp-2 text-xl font-bold leading-6 text-white">
            {fields.title}
          </h3>
        ) : null}

        <p className="min-h-[4.5rem] line-clamp-3 text-base leading-6 text-white">
          {fields.description ?? '\u00A0'}
        </p>
      </div>
    </>
  );

  const cardClassName = cn(
    'group relative flex overflow-hidden rounded-lg p-5',
    isFoundationArea
      ? 'h-full min-h-[320px] flex-col md:min-h-[381px]'
      : 'h-[320px] flex-col justify-end md:h-[381px]',
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
