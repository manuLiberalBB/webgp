import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

/** Formatea una fecha ISO al estilo "24 de junio de 2026". */
export function formatNewsPublishDate(
  date: string | Date | undefined,
  fallback: Date = new Date(),
): string {
  const parsed = date ? dayjs(date) : dayjs(fallback);

  if (!parsed.isValid()) {
    return dayjs(fallback).format('D [de] MMMM [de] YYYY');
  }

  return parsed.format('D [de] MMMM [de] YYYY');
}

/** Formatea una fecha para cards de noticias, ej. "18 Nov 2026". */
export function formatNewsCardDate(
  date: string | Date | undefined,
  fallback: Date = new Date(),
): string {
  const parsed = date ? dayjs(date) : dayjs(fallback);

  if (!parsed.isValid()) {
    return dayjs(fallback).format('D MMM YYYY');
  }

  return parsed.format('D MMM YYYY');
}
