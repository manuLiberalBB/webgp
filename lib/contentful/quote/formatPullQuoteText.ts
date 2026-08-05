const OPENING_QUOTE_PATTERN = /^[\u201C\u201D\u00AB"'"]/;
const CLOSING_QUOTE_PATTERN = /[\u201C\u201D\u00BB"'"]$/;
const TRIM_QUOTES_PATTERN = /^[\u201C\u201D\u00AB"'"]+|[\u201C\u201D\u00BB"'"]+$/g;

/** Wraps quote text with typographic quotes when CMS content omits them. */
export function formatPullQuoteText(quote: string): string {
  const trimmed = quote.trim();
  if (!trimmed) return trimmed;

  if (OPENING_QUOTE_PATTERN.test(trimmed) && CLOSING_QUOTE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const withoutQuotes = trimmed.replace(TRIM_QUOTES_PATTERN, '').trim();
  return `\u201C${withoutQuotes}\u201D`;
}
