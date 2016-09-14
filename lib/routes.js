const handlers = require('./handlers');
const Joi = require('joi');

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
      tags : ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string().required()
        })
      }
    }
  }
];
