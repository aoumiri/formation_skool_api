const Hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const routes = require('./lib/routes');
const config = require('./config');
const logger = require('./logger');
const boom = require('boom');

const server = new Hapi.Server();

server.connection({ port : process.env.PORT || config.port });

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
  logger.info({
    id: request.id,
    method: request.method,
    path: request.path
  });

  if (request.path.startsWith('/documentation')) {
    return reply.continue();
  }
  if (require('./api_keys').indexOf(request.query.api_key) === -1) {
    return reply(boom.unauthorized('Invalid api_key'));
  }
  return reply.continue();
});

server.ext('onPreResponse', (request, reply) => {
  logger.info({
    id: request.id,
    statusCode: request.response.statusCode
  });
  return reply.continue();
});

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
