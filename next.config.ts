import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
        source: "/en/le-suite",
        destination: "/en#le-suite",
        permanent: true,
      },
      {
        source: "/it/le-suite",
        destination: "/it#le-suite",
        permanent: true,
      },
      {
        source: "/de/le-suite",
        destination: "/de#le-suite",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
