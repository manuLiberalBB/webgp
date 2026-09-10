import { type ReactNode } from 'react';

const BOLD_MARKER_PATTERN = /(\*\*[^*]+\*\*)/g;

function renderBoldParts(
  text: string,
  strongClassName?: string,
  keyPrefix = '',
): ReactNode[] {
  return text.split(BOLD_MARKER_PATTERN).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}${index}`} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

/** Renders inline `**bold**` markers as `<strong>` and preserves line breaks. */
export function renderTextWithBoldMarkers(
  text: string,
  strongClassName?: string,
): ReactNode {
  const lines = text.split(/\r?\n/);

  if (lines.length === 1) {
    return renderBoldParts(text, strongClassName);
  }

  return lines.flatMap((line, lineIndex) => {
    const parts = renderBoldParts(line, strongClassName, `${lineIndex}-`);

    if (lineIndex < lines.length - 1) {
      return [...parts, <br key={`br-${lineIndex}`} />];
    }

    return parts;
  });
}
