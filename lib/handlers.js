const pokemons = require('./../data')

module.exports = {
  helloWorld (request, reply) {
    reply('Hello world!');
  },

  getAllPokemons (request, reply) {
    const data = require('./../data.json');
    if (request.query && request.query.fields === 'name') {
      return reply(data.map(pokemon => {
        return {
          name: pokemon.name
        }
      }))
    }
    reply(data);
  },

  createPokemon (request, reply) {
    if (!request.payload) {
      return reply().code(400)
    }
    pokemons.push(request.payload)
    reply().code(201);
  }
};
