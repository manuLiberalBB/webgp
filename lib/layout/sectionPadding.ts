import { cn } from '@/lib/utils';

/** Horizontal padding estándar de secciones (mobile + desktop). */
export const SECTION_PADDING_X = 'px-6 md:px-layout-x';

/** Padding estándar de secciones de contenido. */
export const SECTION_PADDING = cn(SECTION_PADDING_X, 'py-10 md:py-section-y');

/** Padding con espacio intermedio arriba, para la primera sección después de un hero. */
export const SECTION_PADDING_AFTER_HERO = cn(
  SECTION_PADDING_X,
  'pt-8 pb-10 md:pt-10 md:pb-section-y',
);

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
