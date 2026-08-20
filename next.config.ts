import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.7'],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    const allowIndexing = process.env.ALLOW_INDEXING === 'true';

    return [
      {
        source: '/:path*',
        headers: [
          ...(allowIndexing
            ? []
            : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]),
          {
            key: 'Link',
            value: '<https://images.ctfassets.net>; rel=preconnect; crossorigin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
