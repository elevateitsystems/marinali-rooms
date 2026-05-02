import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  env: {
    IS_BUILD: (phase === PHASE_PRODUCTION_BUILD).toString(),
  },
  async redirects() {
    return [
      {
        source: '/en/le-suite',
        destination: '/en#le-suite',
        permanent: true,
      },
      {
        source: '/it/le-suite',
        destination: '/it#le-suite',
        permanent: true,
      },
      {
        source: '/de/le-suite',
        destination: '/de#le-suite',
        permanent: true,
      },
    ]
  },
});

export default nextConfig;
