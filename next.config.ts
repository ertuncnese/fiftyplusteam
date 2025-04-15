import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    // 🚫 Build sırasında ESLint hatalarını göz ardı et
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      'cdn.rss.app',
      'instagram.fxyz1-1.fna.fbcdn.net',
      'scontent.cdninstagram.com'
    ],
  },
};

export default nextConfig;
