'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { parseItalicText } from '@/components/contentful/parseItalicText';
import { cn } from '@/lib/utils';

type ProgramDevelopmentCardDescriptionProps = {
  text: string;
};

const MAX_LINES = 6;

function isElementVisible(element: HTMLElement): boolean {
  return element.getClientRects().length > 0;
}

export function ProgramDevelopmentCardDescription({
  text,
}: ProgramDevelopmentCardDescriptionProps) {
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
    <div className="relative">
      <p
        ref={paragraphRef}
        className={cn(
          'text-body text-base leading-normal whitespace-pre-line',
          !expanded && 'line-clamp-6 layout-md:min-h-36',
        )}
      >
        {parseItalicText(text)}
      </p>

      <p
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 m-0 h-0 overflow-hidden text-body text-base leading-normal whitespace-pre-line"
      >
        {parseItalicText(text)}
      </p>

      <div className={cn('mt-1', canExpand && 'min-h-6')}>
        {canExpand ? (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setExpanded((current) => !current);
            }}
            className="text-link-cta underline decoration-solid underline-offset-2"
          >
            {expanded ? 'ver menos' : 'ver más'}
          </button>
        ) : null}
      </div>
    </div>
  );
}
