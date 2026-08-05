import type { ResourceCenterItem } from '@/lib/contentful/resource/resolveResourceCenterItems';
import { cn } from '@/lib/utils';

type ResourceCenterSectionProps = {
  title?: string;
  subtitle?: string;
  items: ResourceCenterItem[];
  className?: string;
};

function ResourceCenterRow({ item }: { item: ResourceCenterItem }) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-[#808080] py-6">
      <div className="flex min-w-0 items-center gap-5">
        <p className="text-lg leading-7 text-[#0d0d0d]">{item.title}</p>

        {item.isNew ? (
          <span className="inline-flex shrink-0 rounded-full bg-[#22c55e] px-2 py-0.5 text-[10px] leading-[15px] font-semibold text-white uppercase">
            Nuevo
          </span>
        ) : null}
      </div>

      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link-cta shrink-0 text-base leading-6 transition-opacity hover:opacity-80"
      >
        Descargar
      </a>
    </div>
  );
}

export function ResourceCenterSection({
  title,
  subtitle,
  items,
  className,
}: ResourceCenterSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={cn(
        'bg-ecosystem px-[18px] py-12 md:px-layout-x md:py-[3.75rem]',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-content flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
          {title ? (
            <h2 className="text-[2rem] leading-[3.75rem] font-normal tracking-[-0.96px] text-[#0d0d0d] md:text-5xl">
              {title}
            </h2>
          ) : null}

          {subtitle ? (
            <p className="text-lg leading-6 text-[#808080]">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-5">
          {items.map((item) => (
            <ResourceCenterRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
