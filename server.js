const Hapi = require("hapi");

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello world!');
  }
});

server.route({
  method: 'GET',
  path: '/pokemons',
  handler: function (request, reply) {
    const data = require("./data.json");
    reply(data);
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;