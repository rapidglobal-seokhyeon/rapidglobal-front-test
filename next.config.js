/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ["cdn.heyseller.kr"],
  },
};

module.exports = nextConfig;
