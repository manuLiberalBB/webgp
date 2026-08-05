import NextImage, { type ImageProps } from 'next/image';

export const DEFAULT_IMAGE_QUALITY = 90;

export const HERO_IMAGE_SIZES = '100vw';
export const LARGE_CONTAINER_IMAGE_SIZES = '(min-width: 1280px) 1280px, 100vw';
export const HALF_WIDTH_IMAGE_SIZES = '(min-width: 1024px) 50vw, 100vw';

export function AppImage({
  quality = DEFAULT_IMAGE_QUALITY,
  ...props
}: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
