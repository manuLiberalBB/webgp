import type { StatisticItem } from '@/lib/contentful/types/statistic';
import { cn } from '@/lib/utils';

type NewsInlineStatisticsProps = {
  items: StatisticItem[];
  className?: string;
};

export function NewsInlineStatistics({ items, className }: NewsInlineStatisticsProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('news-inline-statistics', className)}>
      <div className="news-inline-statistics__row" role="group" aria-label="Estadísticas">
        {items.map((statistic) => (
          <div key={statistic.id} className="news-inline-statistics__cell">
            <p className="news-inline-statistic__value">{statistic.value}</p>

            {statistic.label ? (
              <p className="news-inline-statistic__label">{statistic.label}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
