/** @type {import('next').NextConfig} */
import type { Configuration as WebpackConfig } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    // Properly handle Node.js modules on the client side
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
        aws4: false
      };
    }
    return config;
  },
};

module.exports = nextConfig;