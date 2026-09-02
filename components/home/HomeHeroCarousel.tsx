'use client';

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib/utils';

import { HomeHeroCarouselDots } from './HomeHeroCarouselDots';

const AUTO_ADVANCE_MS = 6000;

type HomeHeroCarouselProps = {
  slides: ReactNode[];
  className?: string;
};

export function HomeHeroCarousel({ slides, className }: HomeHeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [trackHeight, setTrackHeight] = useState<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const slideCount = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goToNextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduceMotion(motionMedia.matches);

    updateMotion();
    motionMedia.addEventListener('change', updateMotion);

    return () => {
      motionMedia.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    const activeSlide = slideRefs.current[activeIndex];

    if (!activeSlide) return;

    const updateHeight = () => {
      setTrackHeight(activeSlide.offsetHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(activeSlide);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeIndex, slides]);

  useEffect(() => {
    if (slideCount <= 1 || reduceMotion) return;

    intervalRef.current = window.setInterval(goToNextSlide, AUTO_ADVANCE_MS);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [goToNextSlide, reduceMotion, slideCount]);

  const pauseAutoAdvance = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const resumeAutoAdvance = () => {
    if (slideCount <= 1 || reduceMotion || intervalRef.current) return;

    intervalRef.current = window.setInterval(goToNextSlide, AUTO_ADVANCE_MS);
  };

  const handleSelect = (index: number) => {
    pauseAutoAdvance();
    goToSlide(index);
    resumeAutoAdvance();
  };

  if (slideCount === 0) return null;

  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      aria-roledescription="carousel"
      aria-label="Hero principal"
      onMouseEnter={pauseAutoAdvance}
      onMouseLeave={resumeAutoAdvance}
      onFocusCapture={pauseAutoAdvance}
      onBlurCapture={resumeAutoAdvance}
    >
      <div
        className={cn(
          'relative overflow-hidden transition-[height] duration-500',
          !reduceMotion && 'ease-in-out',
        )}
        style={trackHeight ? { height: trackHeight } : undefined}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            role="tabpanel"
            aria-hidden={index !== activeIndex}
            className={cn(
              'transition-opacity duration-500',
              index === activeIndex
                ? 'relative z-10 opacity-100'
                : 'pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0',
              !reduceMotion && index !== activeIndex && 'invisible',
            )}
          >
            {slide}
          </div>
        ))}
      </div>

      {slideCount > 1 ? (
        <HomeHeroCarouselDots
          count={slideCount}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      ) : null}
    </section>
  );
}
