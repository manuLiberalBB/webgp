'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import { parseItalicText } from '@/lib/text/parseItalicText';
import { cn } from '@/lib/utils';

type ProgramDevelopmentCardDescriptionProps = {
  text: string;
};

export function ProgramDevelopmentCardDescription({
  text,
}: ProgramDevelopmentCardDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph || expanded) return;

    setCanExpand(paragraph.scrollHeight > paragraph.clientHeight + 1);
  }, [text, expanded]);

  return (
    <div>
      <p
        ref={paragraphRef}
        className={cn(
          'text-body text-base leading-normal whitespace-pre-line',
          !expanded && 'line-clamp-6',
        )}
      >
        {parseItalicText(text)}
      </p>

      {canExpand ? (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="text-link-cta mt-1 underline decoration-solid underline-offset-2"
        >
          {expanded ? 'ver menos' : 'ver más'}
        </button>
      ) : null}
    </div>
  );
}
