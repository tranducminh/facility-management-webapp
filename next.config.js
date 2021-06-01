module.exports = {
  env: {
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    PUSHER_KEY: process.env.PUSHER_KEY,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employee',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/buildings',
        permanent: true,
      },
      {
        source: '/repairman',
        destination: '/repairman/tasks',
        permanent: true,
      },
    ]
  },
}
