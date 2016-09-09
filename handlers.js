module.exports = {
  helloWorld (request, reply) {
    reply('Hello world!');
  },
  getAllPokemons (request, reply) {
    const data = require("./data.json");
    reply(data);
  }
};
