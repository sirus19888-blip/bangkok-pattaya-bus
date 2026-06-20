import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "192.168.1.7",
    "192.168.1.7:3000",
    "192.168.8.174",
    "192.168.8.174:3000",
  ],
  async redirects() {
    return [
      { source: "/routes", destination: "/en", permanent: true },
      { source: "/routes/:slug", destination: "/en/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
