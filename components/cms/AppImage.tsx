import type { ImageProps } from 'next/image';

import { LoadRevealImage } from '@/components/cms/LoadRevealImage';

export const DEFAULT_IMAGE_QUALITY = 90;

/** Full-bleed heroes. Avoids the literal `100vw` string so Next.js can skip the dev-only sizes warning. */
export const HERO_IMAGE_SIZES = '(min-width: 1280px) 100vw, 100vw';

export const LARGE_CONTAINER_IMAGE_SIZES = '(min-width: 1280px) 1280px, 100vw';

/** Images inside `max-w-content` sections with `px-6 md:px-layout-x`. */
export const CONTENT_PADDED_IMAGE_SIZES =
  '(min-width: 1280px) 1280px, (min-width: 768px) calc(100vw - 12.5rem), calc(100vw - 3rem)';

/** Large featured-news cards (~2/3 of the content column on desktop). */
export const FEATURED_NEWS_LARGE_CARD_SIZES =
  '(min-width: 1024px) 760px, (min-width: 768px) calc(100vw - 12.5rem), calc(100vw - 3rem)';

export const HALF_WIDTH_IMAGE_SIZES = '(min-width: 1024px) 50vw, 100vw';

/** Pair with max-h/max-w classes when overriding intrinsic image dimensions. */
export const AUTO_ASPECT_STYLE = { width: 'auto', height: 'auto' } as const;

export function AppImage({
  quality = DEFAULT_IMAGE_QUALITY,
  ...props
}: ImageProps) {
  return <LoadRevealImage quality={quality} {...props} />;
}

/** Drop-in alias for migrating `next/image` imports. */
export const Image = AppImage;

type HeroImageProps = Omit<ImageProps, 'loading'> & {
  priority?: boolean;
};

/** Above-the-fold hero backgrounds: preloads and opts out of lazy loading. */
export function HeroImage({
  priority = true,
  quality = DEFAULT_IMAGE_QUALITY,
  sizes = HERO_IMAGE_SIZES,
  ...props
}: HeroImageProps) {
  return (
    <LoadRevealImage
      quality={quality}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : undefined}
      {...props}
    />
  );
}
