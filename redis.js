const { createClient } = require('redis');
const url = process.env.RDIS_URL;

let redis;

module.exports = ((url) => {
  redis ??= createClient({ url });
  return redis;
});
