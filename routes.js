module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply('Hello world!');
    }
  },
  {
    method: 'GET',
    path: '/pokemons',
    handler: function (request, reply) {
      const data = require("./data.json");
      reply(data);
    }
  }
];
