/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/, // only JS/TS files can import SVG
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
