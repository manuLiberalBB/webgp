import { cn } from '@/lib/utils';

/** Padding estándar de secciones de contenido. */
export const SECTION_PADDING =
  'px-10 py-10 md:px-layout-x md:py-section-y';

/** Padding con espacio intermedio arriba, para la primera sección después de un hero. */
export const SECTION_PADDING_AFTER_HERO =
  'px-10 pt-8 pb-10 md:px-layout-x md:pt-10 md:pb-section-y';

export function sectionPaddingClass(
  compactTop?: boolean,
  className?: string,
): string {
  return cn(compactTop ? SECTION_PADDING_AFTER_HERO : SECTION_PADDING, className);
}

/** Override de padding superior para secciones que siguen a un hero. */
export const COMPACT_SECTION_TOP = '!pt-8 md:!pt-10';

/** Override de padding inferior cuando la siguiente sección va pegada. */
export const COMPACT_SECTION_BOTTOM = '!pb-6 md:!pb-8';

/** Padding inferior recomendado para heroes. */
export const HERO_BOTTOM_PADDING = 'pb-8 md:pb-10';
