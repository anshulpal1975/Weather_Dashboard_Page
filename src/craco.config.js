const path = require('path');

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: {
      resolve: {
        fallback: {
          http: require.resolve('stream-http'),
        },
      },
    },
  },
};
