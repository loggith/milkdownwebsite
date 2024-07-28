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
  assetPrefix: "./", // 配置静态资源访问路径
  // basePath: "/hello", // 配置路由跳转时的前baseUrl
  // trailingSlash: true, //启用 hash 路由模式
  images: { unoptimized: true },
};

// module.exports = withPWA(nextConfig);

module.exports = nextConfig;
