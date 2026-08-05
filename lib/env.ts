const required = ['CONTENTFUL_SPACE_ID', 'CONTENTFUL_ACCESS_TOKEN'] as const;

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  contentful: {
    spaceId: () => getEnv('CONTENTFUL_SPACE_ID'),
    accessToken: () => {
      const isPreview = process.env.CONTENTFUL_PREVIEW_DRAFT_CONTENT === 'true';
      if (isPreview) {
        return getEnv('CONTENTFUL_PREVIEW_ACCESS_TOKEN');
      }
      return getEnv('CONTENTFUL_ACCESS_TOKEN');
    },
    environment: () => process.env.CONTENTFUL_ENVIRONMENT ?? 'master',
    host: () => {
      const isPreview = process.env.CONTENTFUL_PREVIEW_DRAFT_CONTENT === 'true';
      if (isPreview) {
        return process.env.CONTENTFUL_PREVIEW_HOST ?? 'preview.contentful.com';
      }
      return process.env.CONTENTFUL_HOST ?? 'cdn.contentful.com';
    },
    isPreview: () => process.env.CONTENTFUL_PREVIEW_DRAFT_CONTENT === 'true',
  },
  site: {
    baseUrl: () => process.env.BASE_URL ?? 'http://localhost:3000',
  },
  revalidate: {
    secret: () => process.env.REVALIDATE_SECRET,
  },
};

export function assertContentfulEnv(): void {
  required.forEach((key) => getEnv(key));
}
