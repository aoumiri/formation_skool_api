const Hapi = require('hapi');
const swagger = require('hapi-swagger');
const inert = require('inert');
const vision = require('vision');
const routes = require('./lib/routes');
const config = require('./config');
const bunyan = require('bunyan');
const pkg = require('./package');

const server = new Hapi.Server();

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
  },
  {
    register: require('hapi-bunyan'),
    options: {
      logger: bunyan.createLogger({ name: pkg.name, level: 'info' })
    }
  }
]);

server.ext('onRequest', (request, reply) => {
  request.log.info({
    id: request.id,
    method: request.method,
    path: request.path
  });

  if (request.path.startsWith('/documentation')) {
    return reply.continue();
  }
  if (require('./api_keys').indexOf(request.query.api_key) === -1) {
    return reply().code(401);
  }
  return reply.continue();
});

server.ext('onPreResponse', (request, reply) => {
  request.log.info({
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
