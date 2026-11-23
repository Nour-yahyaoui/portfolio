import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: false },
      { source: "/projects/:slug", destination: "/work/:slug", permanent: false },
      { source: "/classic", destination: "/", permanent: false },
      { source: "/emerald", destination: "/", permanent: false },
      { source: "/about", destination: "/", permanent: false },
      { source: "/contact", destination: "/", permanent: false },
      { source: "/skills", destination: "/work", permanent: false },
      { source: "/test", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
