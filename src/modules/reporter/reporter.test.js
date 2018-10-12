const assert = require('assert');
const reporter = require('.');

/* eslint-disable no-undef */
describe('reporter', () => {
  it('has method write', () => {
    assert.equal('function', typeof reporter.write);
  });
});
