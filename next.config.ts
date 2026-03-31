import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  sassOptions: {
    additionalData: `@use "@/styles/_variables.scss" as *;`
  }
};

export default nextConfig;
