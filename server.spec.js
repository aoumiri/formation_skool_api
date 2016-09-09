const chai = require('chai');
const expect = chai.expect;
const server = require('./server');

describe('Server', () => {
  describe('GET /', () => {
    it('should return the appropriate string', (done) => {
      server.inject('/', (res) => {
        expect(res.result).to.equal('Hello world!');
        done();
      });
    });
  });
  describe('GET /pokemons', () => {
    it('should return a 200', (done) => {
      server.inject('/pokemons', (res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('should return an array', (done) => {
      server.inject('/pokemons', (res) => {
        expect(res.result).to.be.an('array');
        done();
      });
    });

    it('should return a list of pokemons', (done) => {
      server.inject('/pokemons', (res) => {
        const pokemons = [
          { name: "Pikachu" },
          { name: "Dracaufeu" },
          { name: "Rattata" },
          { name: "Roucool" },
          { name: "Nidoran" },
          { name: "Hypocéan" },
          { name: "Kabuto" }
        ];
        expect(res.result).to.deep.equal(pokemons);
        done();
      });
    });
  });
});