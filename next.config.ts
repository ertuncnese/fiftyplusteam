import type { NextConfig } from "next";
module.exports = {
  images: {
    domains: ['cdn.rss.app', 'instagram.fxyz1-1.fna.fbcdn.net'], // feed'teki image src domainlerini ekle
  },
};

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 💥 ESLint hatalarını build sırasında yok say
  },
};

export default nextConfig;
