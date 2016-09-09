const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();

server.connection({ port: 3000 });

server.route(routes);

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;