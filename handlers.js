module.exports = {
  helloWorld (request, reply) {
    reply('Hello world!');
  },
  getAllPokemons (request, reply) {
    const data = require('./data.json');
    if (request.query && request.query.fields === 'name') {
      return reply(data.map(pokemon => {
        return {
          name: pokemon.name
        }
      }))
    }
    reply(data);
  }
};
