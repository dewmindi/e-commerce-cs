// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   "output": 'standalone',
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//     qualities: [80],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//         pathname: "/**",
//       },
//     ],
//   },
// }

// export default nextConfig

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,

  // ✅ Required for VPS / PM2 deployments
  output: 'standalone',

  // ✅ Remove console logs in production (clean & secure)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Image optimization (balanced for performance)
  images: {
    unoptimized: false, // enable optimization
    qualities: [75, 80],
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ Enable compression (better performance)
  compress: true,

  // ✅ Security headers (VERY important)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;