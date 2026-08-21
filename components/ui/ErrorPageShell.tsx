'use client';

import type { ReactNode } from 'react';

import { PageContentReady } from '@/components/layout/PageLoadCoordinator';

type ErrorPageShellProps = {
  children: ReactNode;
};

export function ErrorPageShell({ children }: ErrorPageShellProps) {
  return (
    <>
      <section className="py-10 md:py-16">
        <div className="mx-auto w-full max-w-content px-6 md:px-layout-x">{children}</div>
      </section>
      <PageContentReady />
    </>
  );
}
