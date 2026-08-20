'use client';

import { AppImage as Image, AUTO_ASPECT_STYLE } from '@/components/cms/AppImage';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { CarouselItem } from '@/lib/contentful/carousel/types';
import { cn } from '@/lib/utils';

import { CompanyLogoCardGrid } from '@/components/sections/sectors/CompanyLogoGrid';

const SCROLL_SPEED = 42;
const EASE = 0.06;

export type MarqueeCarouselVariant = 'marquee' | 'cards';

type MarqueeCarouselProps = {
  items: CarouselItem[];
  className?: string;
  variant?: MarqueeCarouselVariant;
};

function MarqueeCarouselItem({
  item,
  className,
}: {
  item: CarouselItem;
  className?: string;
}) {
  const image = (
    <Image
      src={item.imageUrl}
      alt={item.label}
      width={item.imageWidth}
      height={item.imageHeight}
      style={AUTO_ASPECT_STYLE}
      className="h-12 w-auto max-w-full object-contain"
    />
  );

  const contentClassName = cn(
    'flex h-14 items-center justify-center',
    className,
  );

  if (!item.href) {
    return <div className={contentClassName}>{image}</div>;
  }

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={`Visitar sitio de ${item.label}`}
      className={cn(contentClassName, 'transition-opacity hover:opacity-80')}
    >
      {image}
    </a>
  );
}

export function MarqueeCarousel({
  items,
  className,
  variant = 'marquee',
}: MarqueeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(SCROLL_SPEED);
  const targetVelocityRef = useRef(SCROLL_SPEED);
  const rafRef = useRef<number | undefined>(undefined);

  const trackItems = useMemo(() => [...items, ...items], [items]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 768px)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateDesktop = () => setIsDesktop(desktopMedia.matches);
    const updateMotion = () => setReduceMotion(motionMedia.matches);

    updateDesktop();
    updateMotion();

    desktopMedia.addEventListener('change', updateDesktop);
    motionMedia.addEventListener('change', updateMotion);

    return () => {
      desktopMedia.removeEventListener('change', updateDesktop);
      motionMedia.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop || reduceMotion || variant === 'cards') return;

    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      velocityRef.current +=
        (targetVelocityRef.current - velocityRef.current) * EASE;

      const halfWidth = track.scrollWidth / 2;

      if (halfWidth > 0) {
        offsetRef.current -= velocityRef.current * delta;

        if (offsetRef.current <= -halfWidth) {
          offsetRef.current += halfWidth;
        }

        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trackItems, isDesktop, reduceMotion, variant]);

  if (items.length === 0) return null;

  if (variant === 'cards') {
    return (
      <CompanyLogoCardGrid
        items={items}
        className={cn('min-w-0 max-w-full', className)}
      />
    );
  }

  const handleMouseEnter = () => {
    targetVelocityRef.current = 0;
  };

  const handleMouseLeave = () => {
    targetVelocityRef.current = SCROLL_SPEED;
  };

  return (
    <div className={cn('w-full', className)} aria-label="Carrusel de logos">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:hidden">
        {items.map((item) => (
          <MarqueeCarouselItem key={item.id} item={item} className="w-full px-2" />
        ))}
      </div>

      <div
        className="relative hidden w-full overflow-hidden md:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={trackRef}
          className={cn(
            'company-carousel-track flex w-max items-center gap-layout-x',
            reduceMotion && 'w-full flex-wrap justify-center gap-10',
          )}
        >
          {trackItems.map((item, index) => (
            <MarqueeCarouselItem
              key={`${item.id}-${index}`}
              item={item}
              className="shrink-0 px-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
