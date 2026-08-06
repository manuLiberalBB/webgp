import { resolveFoundationAreaTagStyle } from '@/lib/contentful/card/resolveFoundationAreaTagStyle';
import { cn } from '@/lib/utils';

type FoundationAreaTagBadgeProps = {
  tag: string;
  contentfulName?: string;
  className?: string;
};

export function FoundationAreaTagBadge({
  tag,
  contentfulName,
  className,
}: FoundationAreaTagBadgeProps) {
  const { textColor, backgroundColor } = resolveFoundationAreaTagStyle(
    tag,
    contentfulName,
  );

  return (
    <span
      className={cn(
        'inline-flex w-fit items-center justify-center rounded px-1.5 py-1 text-[10px] font-normal tracking-[1px] uppercase',
        className,
      )}
      style={{ color: textColor, backgroundColor }}
    >
      {tag}
    </span>
  );
}
