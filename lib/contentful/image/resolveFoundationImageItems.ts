import type { Entry } from 'contentful';

import type { FoundationImageItem } from '../types/image';

import { resolveFoundationAccentColor } from './resolveFoundationImageBackground';
import { resolveImageItems } from './resolveImageItem';

export function resolveFoundationImageItems(items?: Entry[]): FoundationImageItem[] {
  return resolveImageItems(items).map((item) => ({
    ...item,
    accentColor: resolveFoundationAccentColor(item.contentfulName, item.epigraph),
  }));
}
