import { createClient, type CreateClientParams } from 'contentful';

import { env } from '@/lib/env';

export function getContentfulClient() {
  const config: CreateClientParams = {
    space: env.contentful.spaceId(),
    environment: env.contentful.environment(),
    accessToken: env.contentful.accessToken(),
    host: env.contentful.host(),
  };

  return createClient(config);
}
