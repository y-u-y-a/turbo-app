/**
 * @type {import('next').NextConfig}
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports
 */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
}
