'use strict';

const chai = require('chai');

chai.should();

/* eslint-disable global-require */
const deps = {
  timeDate: require('../../lib/timeDate'),
  mdConfig: require('node-md-config'),
};

const EarthCycle = require('../../lib/EarthCycle.js');

describe('EarthCycle', () => {
  describe('#constructor()', () => {
    it('should not throw when called with valid deps', () => {
      (() => { new EarthCycle(deps); }).should.not.throw();
    });
  });
  describe('#getExpired()', () => {
    it('should never be true', () => {
      const cycle = new EarthCycle(deps);
      cycle.getExpired().should.be.false;
    });
  });
});
