'use client';

import NextImage, { type ImageProps } from 'next/image';
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from 'react';

import { cn } from '@/lib/utils';

function getMergedStyle(
  style: ImageProps['style'],
  isLoaded: boolean,
): CSSProperties | undefined {
  const base =
    style && typeof style === 'object' && !Array.isArray(style) ? style : {};

  return {
    ...base,
    opacity: isLoaded ? 1 : 0,
    visibility: isLoaded ? 'visible' : 'hidden',
  };
}

export function LoadRevealImage({
  className,
  onLoad,
  onError,
  style,
  placeholder = 'empty',
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const markLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useLayoutEffect(() => {
    const img = imageRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      markLoaded();
    }
  });

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      markLoaded();
      onLoad?.(event);
    },
    [markLoaded, onLoad],
  );

  const handleError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      markLoaded();
      onError?.(event);
    },
    [markLoaded, onError],
  );

  return (
    <NextImage
      {...props}
      ref={imageRef}
      placeholder={placeholder}
      data-load-reveal={isLoaded ? 'loaded' : 'pending'}
      className={cn(className, !isLoaded && 'pointer-events-none')}
      style={getMergedStyle(style, isLoaded)}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}
