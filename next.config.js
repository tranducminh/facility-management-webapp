/* eslint-disable @typescript-eslint/no-var-requires */
const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  async redirects() {
    return [
      {
        source: '/../components/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/../../components/:slug',
        destination: '/',
        permanent: true,
      },
      {
        source: '/manager',
        destination: '/manager/rooms',
        permanent: true,
      },
    ]
  },
}
