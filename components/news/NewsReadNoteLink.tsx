import Link from 'next/link';
import type { ReactNode } from 'react';

import { NewsSidebarArrowIcon } from '@/components/news/sidebar/NewsSidebarPrimitives';
import { cn } from '@/lib/utils';

type NewsReadNoteLinkProps = {
  href: string;
  variant?: 'default' | 'onDark' | 'underline';
  decorative?: boolean;
  className?: string;
  children?: ReactNode;
};

function ReadNoteContent({
  variant,
  children,
}: {
  variant: NewsReadNoteLinkProps['variant'];
  children: ReactNode;
}) {
  if (variant === 'underline') {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      {variant === 'onDark' ? (
        <NewsSidebarArrowIcon className="text-white" />
      ) : (
        <NewsSidebarArrowIcon />
      )}
    </>
  );
}

export function NewsReadNoteLink({
  href,
  variant = 'default',
  decorative = false,
  className,
  children = 'Leer nota',
}: NewsReadNoteLinkProps) {
  const underlineClassName = cn(
    'text-link-cta py-2.5 text-base leading-6 underline',
    className,
  );
  const onDarkClassName = cn(
    'inline-flex items-center gap-1 text-xs font-semibold leading-[16.5px] text-white',
    className,
  );
  const defaultClassName = cn(
    'text-link-cta inline-flex items-center gap-1 text-xs font-semibold leading-[16.5px]',
    className,
  );

  if (decorative) {
    if (variant === 'underline') {
      return (
        <span className={cn(underlineClassName, 'pointer-events-none')}>
          <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
        </span>
      );
    }

    if (variant === 'onDark') {
      return (
        <span className={cn(onDarkClassName, 'pointer-events-none')}>
          <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
        </span>
      );
    }

    return (
      <span className={cn(defaultClassName, 'pointer-events-none')}>
        <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
      </span>
    );
  }

  if (variant === 'underline') {
    return (
      <Link href={href} className={underlineClassName}>
        <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
      </Link>
    );
  }

  if (variant === 'onDark') {
    return (
      <Link href={href} className={onDarkClassName}>
        <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
      </Link>
    );
  }

  return (
    <Link href={href} className={defaultClassName}>
      <ReadNoteContent variant={variant}>{children}</ReadNoteContent>
    </Link>
  );
}
