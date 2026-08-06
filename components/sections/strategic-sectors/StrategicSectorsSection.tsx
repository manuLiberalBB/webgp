import type { StrategicSectorGridItem } from '@/lib/contentful/strategicSector/types';

import { StrategicSectorsInteractive } from './StrategicSectorsInteractive';

type StrategicSectorsSectionProps = {
  title?: string;
  subtitle?: string;
  items: StrategicSectorGridItem[];
  className?: string;
};

export function StrategicSectorsSection(props: StrategicSectorsSectionProps) {
  return <StrategicSectorsInteractive {...props} />;
}
