import type { Block, Document, Inline } from '@contentful/rich-text-types';

function nodeText(node: Block | Inline): string {
  if ('value' in node && typeof node.value === 'string') {
    return node.value;
  }

  if ('content' in node && Array.isArray(node.content)) {
    return node.content
      .map((child) => nodeText(child as Block | Inline))
      .join('');
  }

  return '';
}

/** Extrae texto plano de un documento rich text de Contentful. */
export function richTextToPlainText(document: Document): string {
  return document.content
    .map((node) => nodeText(node as Block))
    .join('\n')
    .replace(/\s+/g, ' ')
    .trim();
}
