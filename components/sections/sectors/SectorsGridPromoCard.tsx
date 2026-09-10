import { cn } from '@/lib/utils';

type SectorsGridPromoCardProps = {
  sectorCount: number;
  className?: string;
};

export function SectorsGridPromoCard({
  sectorCount,
  className,
}: SectorsGridPromoCardProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-[#dce7ff] px-8 py-8 md:gap-8 md:p-6',
        className,
      )}
    >
      <p className="text-center text-xl leading-normal text-[#123476] md:text-[26px]">
        <span className="font-bold">{sectorCount} sectores.</span>
        <br />
        <span className="font-normal">Un mismo </span>
        <span className="font-bold">compromiso</span>
      </p>

      <p className="text-center text-xl leading-normal italic whitespace-nowrap text-[#123476] md:hidden">
        Presencia que impulsa el país.
      </p>

      <p className="hidden text-center text-[26px] leading-normal italic text-[#123476] md:block">
        Presencia
        <br />
        que impulsa
        <br />
        el país.
      </p>
    </aside>
  );
}
