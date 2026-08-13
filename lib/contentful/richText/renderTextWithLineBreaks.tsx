import type { ReactNode } from 'react';

/** Convierte saltos de línea dentro de nodos de texto en `<br />`. */
export function renderTextWithLineBreaks(text: string): ReactNode {
  const lines = text.split('\n');

  if (lines.length === 1) return text;

  return lines.flatMap((line, index) =>
    index === 0 ? [line] : [<br key={`line-break-${index}`} />, line],
  );
}
