import {
  GRID_SECTION_VARIANTS,
  normalizeSectionVariant,
} from '@/lib/contentful/gridSection/sectionVariants';
import type { GridSectionFields } from '@/lib/contentful/types/gridSection';

export function isI3InnovationGridSection(fields: GridSectionFields): boolean {
  return (
    normalizeSectionVariant(fields.sectionVariant) ===
    GRID_SECTION_VARIANTS.I3_INNOVATION
  );
}

export function isI3ConversationsGridSection(fields: GridSectionFields): boolean {
  return (
    normalizeSectionVariant(fields.sectionVariant) ===
    GRID_SECTION_VARIANTS.I3_CONVERSATIONS
  );
}
