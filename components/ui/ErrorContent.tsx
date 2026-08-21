'use client';

import Link from 'next/link';

import { siteConfig } from '@/config/site';

type ErrorContentProps = {
  onRetry?: () => void;
};

export function ErrorContent({ onRetry }: ErrorContentProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold">No pudimos cargar esta página</h1>
      <p className="text-text-muted mt-2 text-sm">
        Ocurrió un error al mostrar el contenido. Puede deberse a un inconveniente
        temporal o a un problema con la información publicada. Le invitamos a regresar
        al inicio o intentar nuevamente.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Link
          href={siteConfig.homePath}
          className="text-action inline-block text-sm font-semibold hover:underline"
        >
          Volver al inicio
        </Link>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="text-action text-sm font-semibold hover:underline"
          >
            Intentar nuevamente
          </button>
        ) : null}
      </div>
    </>
  );
}
