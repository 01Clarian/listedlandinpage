import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**", // ✅ Allow all images from Contentful
      },
    ],
  },
};

export default nextConfig;
