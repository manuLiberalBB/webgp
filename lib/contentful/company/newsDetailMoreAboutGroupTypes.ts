import type { Asset } from 'contentful';

import type { ResolvedNavLink } from '../resolveNavLink';

export type NewsDetailMoreAboutGroupCardItem = {
  id: string;
  title: string;
  description: string;
  image: Asset;
  link: ResolvedNavLink;
};
