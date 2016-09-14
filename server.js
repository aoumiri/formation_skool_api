const Hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const routes = require('./lib/routes');
const server = new Hapi.Server();
const config = require('./config');

server.connection({ port: config.port });

server.route(routes);

server.register([inert, vision, swagger]);

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
