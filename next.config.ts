import { NextConfig } from 'next'
import linguiConfig from './lingui.config'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 't.me',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'crypto-token-logos-production.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  output: 'standalone',
  eslint: {
    dirs: ['src'],
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
  i18n: {
    locales: linguiConfig.locales,
    defaultLocale: linguiConfig.sourceLocale,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'pino-pretty': false,
      }
    }
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader', // https://github.com/lingui/js-lingui/issues/1782
      },
    })

    return config
  },
}

export default nextConfig
