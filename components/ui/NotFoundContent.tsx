import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function NotFoundContent() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <p className="text-text-muted mt-2 text-sm">
        La página que busca no se encuentra disponible. Le invitamos a regresar al inicio o
        contactarnos para mayor asistencia..
      </p>
      <Link
        href={siteConfig.homePath}
        className="text-action mt-4 inline-block text-sm font-semibold hover:underline"
      >
        Volver al inicio
      </Link>
    </>
  );
}
