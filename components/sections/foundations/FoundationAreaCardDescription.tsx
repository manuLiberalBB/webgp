'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type FoundationAreaCardDescriptionProps = {
  text: string;
  /** Reserva altura para el botón aunque el texto no requiera expandir. */
  reserveExpandActionSpace?: boolean;
  maxLines?: 3 | 5;
};

const RESERVE_MIN_HEIGHT_BY_MAX_LINES = {
  3: 'min-h-[4.5rem]',
  5: 'min-h-[7.5rem]',
} as const;

const LINE_CLAMP_BY_MAX_LINES = {
  3: 'line-clamp-3',
  5: 'line-clamp-5',
} as const;

function isElementVisible(element: HTMLElement): boolean {
  return element.getClientRects().length > 0;
}

export function FoundationAreaCardDescription({
  text,
  reserveExpandActionSpace = false,
  maxLines = 5,
}: FoundationAreaCardDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    const measure = measureRef.current;

    if (!paragraph || !measure) return;

    const updateCanExpand = () => {
      if (!isElementVisible(paragraph)) return;

      const lineHeight = Number.parseFloat(window.getComputedStyle(paragraph).lineHeight);

      if (!Number.isFinite(lineHeight) || lineHeight <= 0) return;

      const maxHeight = lineHeight * maxLines;
      const fullHeight = measure.scrollHeight;

      setCanExpand(fullHeight > maxHeight + 1);
    };

    updateCanExpand();

    const observer = new ResizeObserver(updateCanExpand);
    observer.observe(paragraph);
    observer.observe(measure);

    return () => observer.disconnect();
  }, [maxLines, text]);

  return (
    <div className="relative w-full min-w-0">
      <p
        ref={paragraphRef}
        className={cn(
          'text-base leading-6 whitespace-pre-line text-white',
          !expanded && LINE_CLAMP_BY_MAX_LINES[maxLines],
          reserveExpandActionSpace &&
            !expanded &&
            RESERVE_MIN_HEIGHT_BY_MAX_LINES[maxLines],
        )}
      >
        {text}
      </p>

      <p
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 -z-10 m-0 w-full text-base leading-6 whitespace-pre-line text-white"
      >
        {text}
      </p>

      {canExpand || reserveExpandActionSpace ? (
        <div
          className={cn(
            'mt-1',
            reserveExpandActionSpace && 'min-h-[1.75rem]',
          )}
        >
          {canExpand ? (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setExpanded((current) => !current);
              }}
              className="text-white underline decoration-solid underline-offset-2"
            >
              {expanded ? 'ver menos' : 'ver más'}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
