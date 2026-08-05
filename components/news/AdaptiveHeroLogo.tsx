'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { analyzeFeaturedHeroLogoContrast } from '@/lib/image/analyzeFeaturedHeroLogoContrast';
import { cn } from '@/lib/utils';

const WHITE_LOGO_CLASS = 'brightness-0 invert';

type AdaptiveHeroLogoProps = {
  coverImageUrl: string;
  logoUrl: string;
  logoAlt: string;
  width: number;
  height: number;
  className?: string;
};

export function AdaptiveHeroLogo({
  coverImageUrl,
  logoUrl,
  logoAlt,
  width,
  height,
  className,
}: AdaptiveHeroLogoProps) {
  const [useWhiteLogo, setUseWhiteLogo] = useState(false);

  useEffect(() => {
    let cancelled = false;

    analyzeFeaturedHeroLogoContrast(coverImageUrl, logoUrl)
      .then(({ useWhiteLogo: shouldUseWhiteLogo }) => {
        if (!cancelled) {
          setUseWhiteLogo(shouldUseWhiteLogo);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUseWhiteLogo(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [coverImageUrl, logoUrl]);

  return (
    <Image
      src={logoUrl}
      alt={logoAlt}
      width={width}
      height={height}
      className={cn(
        'block h-[52px] w-auto max-w-[234px] self-start object-contain object-left transition-[filter] duration-200',
        useWhiteLogo && WHITE_LOGO_CLASS,
        className,
      )}
    />
  );
}
