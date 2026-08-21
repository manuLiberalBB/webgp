'use client';

import { useEffect } from 'react';

import { ErrorContent } from '@/components/ui/ErrorContent';
import { ErrorPageShell } from '@/components/ui/ErrorPageShell';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageShell>
      <ErrorContent onRetry={reset} />
    </ErrorPageShell>
  );
}
