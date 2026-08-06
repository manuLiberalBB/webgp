import Image from 'next/image';
import type { Document } from '@contentful/rich-text-types';

import { RichText } from '@/components/ui/RichText';
import { cn } from '@/lib/utils';

type BankingConnectSectionProps = {
  title?: string;
  body: Document;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
};

export function BankingConnectSection({
  title,
  body,
  imageUrl,
  imageAlt = '',
  className,
}: BankingConnectSectionProps) {
  return (
    <section
      className={cn(
        'bg-ecosystem px-[18px] pt-0 pb-12 md:px-layout-x md:py-20',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col-reverse items-center gap-10 lg:flex-row lg:gap-16">
        <div className="relative h-[20rem] w-full min-w-0 shrink-0 overflow-hidden rounded-lg bg-white lg:h-[30.5rem] lg:flex-1">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
          {title ? (
            <h2 className="text-heading text-[2rem] leading-normal font-normal tracking-[-0.96px] md:text-5xl">
              {title}
            </h2>
          ) : null}

          <RichText document={body} className="banking-connect-body" />
        </div>
      </div>
    </section>
  );
}
