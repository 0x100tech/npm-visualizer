const assert = require('assert');
const server = require('.');

/* eslint-disable no-undef */
describe('server', () => {
  it('has method start', () => {
    assert.equal('function', typeof server.start);
  });
});
