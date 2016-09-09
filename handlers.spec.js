const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const handlers = require('./handlers');
chai.use(require('sinon-chai'));

describe('Handlers', () => {

  describe('.helloWorld()', () => {
    it('should reply with Hello World !', () => {
      // Given
      const mySpy = sinon.spy();

      // When
      handlers.helloWorld({}, mySpy);

      // Then
      expect(mySpy).to.have.been.calledWith('Hello world!');
    });
  });

  describe('.getAllPokemons()', () => {
    it('should reply with Hello World !', () => {
      // Given
      const mySpy = sinon.spy();

      // When
      handlers.getAllPokemons({}, mySpy);

      // Then
      expect(mySpy).to.have.been.calledWith(require('./data.json'));
    });
  });
});