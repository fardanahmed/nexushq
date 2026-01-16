import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-2f3dfe3f80674a67ba699efc1fa9e51f.r2.dev',
      },
    ],
    qualities: [75, 90],
  },
};

export default nextConfig;
