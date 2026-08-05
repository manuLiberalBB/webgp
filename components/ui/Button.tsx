import Link from 'next/link';
import { cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'bg-cta hover:bg-cta/90 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base leading-5 font-semibold whitespace-nowrap !text-white transition-colors',
);

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children' | 'className'>;

export function Button({
  href,
  children,
  className,
  external = false,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants(), className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
