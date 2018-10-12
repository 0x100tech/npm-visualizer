const assert = require('assert');
const myConsole = require('.');

/* eslint-disable no-undef */
describe('console', () => {
  it('has working debug method', () => {
    myConsole.debug('Some text');
    assert.ok(true, 'Not thrown');
  });
  it('has working error method', () => {
    myConsole.error('Some error');
    assert.ok(true, 'Not thrown');
  });
  it('has working info method', () => {
    myConsole.info('Some info');
    assert.ok(true, 'Not thrown');
  });
});
