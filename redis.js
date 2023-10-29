const { createClient } = require('redis');
const url = process.env.REDIS_URL;

let redis;

module.exports = (() => {
  redis ??= createClient({ url });
  return redis;
})();
