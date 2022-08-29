const { createClient } = require('redis');
const url = 'redis://kvs:6379';

let redis;

module.exports = redis ?? createClient({ url });
