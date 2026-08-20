'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type FoundationAreaCardDescriptionProps = {
  text: string;
};

const MAX_LINES = 5;

function isElementVisible(element: HTMLElement): boolean {
  return element.getClientRects().length > 0;
}

export function FoundationAreaCardDescription({
  text,
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

      const maxHeight = lineHeight * MAX_LINES;
      const fullHeight = measure.scrollHeight;

      setCanExpand(fullHeight > maxHeight + 1);
    };

    updateCanExpand();

    const observer = new ResizeObserver(updateCanExpand);
    observer.observe(paragraph);
    observer.observe(measure);

    return () => observer.disconnect();
  }, [text]);

  return (
    <div className="relative w-full min-w-0">
      <p
        ref={paragraphRef}
        className={cn(
          'text-base leading-6 whitespace-pre-line text-white',
          !expanded && 'line-clamp-5',
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

      {canExpand ? (
        <div className="mt-1">
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
        </div>
      ) : null}
    </div>
  );
}
