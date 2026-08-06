import { Fragment } from 'react';

const ITALIC_MARKER_PATTERN = /(\*\*[^*]+\*\*)/g;
const ITALIC_MARKER_VALUE_PATTERN = /^\*\*([^*]+)\*\*$/;

export function parseItalicText(text: string) {
  return text.split(ITALIC_MARKER_PATTERN).map((part, index) => {
    const match = part.match(ITALIC_MARKER_VALUE_PATTERN);

    if (!match) {
      return <Fragment key={index}>{part}</Fragment>;
    }

    return (
      <em key={index} className="italic">
        {match[1]}
      </em>
    );
  });
}
