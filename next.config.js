/* eslint-disable @typescript-eslint/no-var-requires */

const localeSubpaths = {}

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employee',
        permanent: true,
      },
    ]
  },
}
