const handlers = require('./handlers');

module.exports = [
  {
    method : 'GET',
    path : '/',
    config : {
      handler : handlers.helloWorld,
      tags : ['api']
    }
  },
  {
    method : 'GET',
    path : '/pokemons',
    config : {
      handler : handlers.getAllPokemons,
      tags : ['api']
    }
  },
  {
    method : 'POST',
    path : '/pokemons',
    config : {
      handler : handlers.createPokemon,
      tags : ['api']
    }
  }
];
