import type { NextConfig } from "next";

// Served from GitHub Pages at https://ishaghatule.github.io/Portfolio/
// so production assets/links live under the /Portfolio base path.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/Portfolio" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
