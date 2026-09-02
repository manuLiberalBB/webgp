import type { ReactNode } from 'react';

const BOLD_MARKER_PATTERN = /(\*\*[^*]+\*\*)/g;

/** Renders inline `**bold**` markers as `<strong>`. */
export function renderTextWithBoldMarkers(
  text: string,
  strongClassName?: string,
): ReactNode {
  return text.split(BOLD_MARKER_PATTERN).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className={strongClassName}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}
