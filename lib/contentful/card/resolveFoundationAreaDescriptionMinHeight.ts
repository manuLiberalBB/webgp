import type { CardFields } from '@/lib/contentful/types/card';

const DESCRIPTION_LINE_HEIGHT_PX = 24;
const DESCRIPTION_CHARS_PER_LINE = 40;

function estimateDescriptionLineCount(description: string): number {
  return description.split('\n').reduce((total, line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) return total + 1;

    return (
      total + Math.max(1, Math.ceil(trimmedLine.length / DESCRIPTION_CHARS_PER_LINE))
    );
  }, 0);
}

export function resolveFoundationAreaDescriptionMinHeight(
  cards: CardFields[],
): number {
  const maxLines = Math.max(
    ...cards.map((card) => {
      const description = card.description?.trim();
      if (!description) return 1;

      return estimateDescriptionLineCount(description);
    }),
    1,
  );

  return maxLines * DESCRIPTION_LINE_HEIGHT_PX;
}
