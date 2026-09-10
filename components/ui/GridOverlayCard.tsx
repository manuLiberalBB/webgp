import { AppImage as Image } from '@/components/cms/AppImage';
import Link from 'next/link';
import type { Entry } from 'contentful';

import { getAssetUrl } from '@/lib/contentful/getAssetUrl';
import { resolveNavLink } from '@/lib/contentful/resolveNavLink';
import type { CardFields } from '@/lib/contentful/types/card';
import { IMAGE_OVERLAY_GRID_GRADIENT } from '@/lib/ui/cardImageOverlayGradient';
import { cn } from '@/lib/utils';

import { FoundationAreaCardDescription } from '@/components/sections/foundations/FoundationAreaCardDescription';
import { FoundationAreaTagBadge } from '@/components/sections/foundations/FoundationAreaTagBadge';

type GridOverlayCardProps = {
  fields: CardFields;
  className?: string;
  variant?: 'default' | 'foundationArea';
  expandableDescription?: boolean;
  contentDensity?: 'default' | 'compact';
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
  expandableDescription = false,
  contentDensity = 'default',
}: GridOverlayCardProps) {
  const imageUrl = fields.image ? getAssetUrl(fields.image) : undefined;
  const link = resolveCardLink(fields.url);
  const imageAlt =
    (typeof fields.image?.fields.title === 'string'
      ? fields.image.fields.title
      : undefined) ?? fields.title ?? '';
  const isFoundationArea = variant === 'foundationArea';
  const isExpandableDescription = isFoundationArea || expandableDescription;
  const isCompactContent = contentDensity === 'compact';
  const descriptionMaxLines = isCompactContent ? 3 : 5;
  const descriptionSlotMinHeight = isExpandableDescription
    ? isCompactContent
      ? 'min-h-[6.25rem]'
      : 'min-h-[9.5rem]'
    : 'min-h-[4.5rem]';

  if (!imageUrl) return null;

  const descriptionContent = fields.description?.trim() ? (
    isExpandableDescription ? (
      <FoundationAreaCardDescription
        text={fields.description.trim()}
        reserveExpandActionSpace
        maxLines={descriptionMaxLines}
      />
    ) : (
      <p className="line-clamp-3 text-base leading-6 text-white">
        {fields.description}
      </p>
    )
  ) : (
    <p aria-hidden className="line-clamp-3 text-base leading-6 text-white">
      {'\u00A0'}
    </p>
  );

  const content = (
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
        style={{ background: IMAGE_OVERLAY_GRID_GRADIENT }}
      />

      <div className="relative z-10 flex h-full min-h-0 w-full min-w-0 flex-col">
        {isFoundationArea && fields.tag ? (
          <div className="self-start">
            <FoundationAreaTagBadge
              tag={fields.tag}
              contentfulName={fields.contentfulName}
            />
          </div>
        ) : null}

        <div className="mt-auto flex w-full min-w-0 flex-col gap-1.5">
          <h3
            className={cn(
              'line-clamp-2 text-xl font-bold leading-6 text-white',
              isCompactContent ? 'min-h-[1.5rem]' : 'min-h-[3rem]',
            )}
          >
            {fields.title?.trim() || '\u00A0'}
          </h3>

          <div className={cn('w-full min-w-0', descriptionSlotMinHeight)}>
            {descriptionContent}
          </div>
        </div>
      </div>
    </>
  );

  const cardClassName = cn(
    'group relative flex h-full w-full min-h-[320px] flex-col overflow-hidden rounded-lg md:min-h-[381px]',
    isCompactContent ? 'px-5 pt-5 pb-4' : 'p-5',
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
