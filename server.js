const Hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const routes = require('./lib/routes');
const server = new Hapi.Server();
const config = require('./config');

server.connection({ port : config.port });

server.route(routes);

server.register([
  inert,
  vision,
  {
    register: swagger,
    options: {
      swaggerUIPath: '/documentation/swaggerui/',
      jsonPath: '/documentation/swagger.json'
    }
  }
]);

server.ext('onRequest', (request, reply) => {
  if (request.path.startsWith('/documentation')) {
    return reply.continue();
  }
  if (require('./api_keys').indexOf(request.query.api_key) === -1) {
    return reply().code(401);
  }
  return reply.continue();
});

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
