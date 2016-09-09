const chai = require('chai');
const expect = chai.expect;
const server = require('./server');

describe('Server', () => {
  it('should return the appropriate string', (done) => {
    server.inject('/', (res) => {
      expect(res.result).to.equal('Hello world!');
      done();
    });
  })
})