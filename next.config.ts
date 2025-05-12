import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'], 
    },
  },
  productionBrowserSourceMaps: false,
  swcMinify: true,
}

export default nextConfig
