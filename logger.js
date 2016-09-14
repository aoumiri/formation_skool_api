const bunyan = require('bunyan');
const config = require('./config');

module.exports = bunyan.createLogger({
  name : require('./package.json').name,
  level : config.level,
  streams: [
    { path: './today.log' },
    { stream: process.stdout }
  ]
});
