const path = require('path');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
  };
  return config;
};
