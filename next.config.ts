import type { NextConfig } from "next";
module.exports = {
  images: {
    domains: ['cdn.rss.app', 'instagram.fxyz1-1.fna.fbcdn.net'], // feed'teki image src domainlerini ekle
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
