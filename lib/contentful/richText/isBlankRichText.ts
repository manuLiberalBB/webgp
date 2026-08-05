const BLANK_TEXT_PATTERN = /[\s\u00a0\u200b\uFEFF]/g;

export function isBlankRichText(value: string): boolean {
  return value.replace(BLANK_TEXT_PATTERN, '') === '';
}
