import Image from 'next/image';

import type { CarouselItem } from '@/lib/contentful/carousel/types';
import { cn } from '@/lib/utils';

type CompanyLogoGridProps = {
  items: CarouselItem[];
  className?: string;
};

export function CompanyLogoCard({ item }: { item: CarouselItem }) {
  const image = (
    <Image
      src={item.imageUrl}
      alt={item.label}
      width={item.imageWidth}
      height={item.imageHeight}
      className="max-h-[44px] w-auto max-w-full object-contain md:max-h-[60px]"
    />
  );

  const cardClassName =
    'flex h-[100px] w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-white px-4 py-3 shadow-[0px_1px_1.5px_rgba(0,0,0,0.3)] md:h-[138px] md:p-5';

  if (!item.href) {
    return <div className={cardClassName}>{image}</div>;
  }

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={`Visitar sitio de ${item.label}`}
      className={cn(cardClassName, 'transition-opacity hover:opacity-80')}
    >
      {image}
    </a>
  );
}

export function CompanyLogoCardGrid({
  items,
  className,
}: CompanyLogoGridProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        'flex w-full min-w-0 max-w-full flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-6 md:gap-y-6',
        className,
      )}
      aria-label="Logos de empresas"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="w-[calc(50%-0.375rem)] min-w-0 md:w-[calc(25%-1.125rem)]"
        >
          <CompanyLogoCard item={item} />
        </div>
      ))}
    </div>
  );
}

export function CompanyLogoGrid({ items, className }: CompanyLogoGridProps) {
  return <CompanyLogoCardGrid items={items} className={className} />;
}
