const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // For PWA Updater
  skipWaiting: false,
  register: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  // exportPathMap: async function () {
  //   return {
  //     "/": { page: "/" },
  //   };
  // },
};

// module.exports = withPWA(nextConfig);

module.exports = nextConfig;
