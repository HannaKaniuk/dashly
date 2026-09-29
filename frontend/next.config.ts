import type { NextConfig } from "next";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:1337";

let strapiHost = "127.0.0.1";
try {
  strapiHost = new URL(strapiUrl).hostname;
} catch {
  strapiHost = "127.0.0.1";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: strapiHost,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: strapiHost,
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
