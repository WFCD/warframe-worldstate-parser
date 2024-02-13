import * as chai from 'chai';

import ZarimanCycle from '../../lib/models/ZarimanCycle.js';

const should = chai.should();
// these are confirmed corpus and grineer cycle time
// the zariman cycle logic depends on zariman bounty expiry time
const confirmedCorpus = 1655059552000;
const confirmedGrineer = 1655181672000;

describe('ZarimanCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new ZarimanCycle();
      }).should.throw(TypeError);
      (() => {
        new ZarimanCycle({});
      }).should.throw(TypeError);
    });

    it('should allow active', () => {
      const cycle = new ZarimanCycle(new Date(Date.now() + 75000));

      const expiry = cycle.getExpired();
      should.equal(expiry, false);

      cycle.toString().should.include('Operator, Zariman Ten Zero is currently occupied by');
    });

    it('should show corpus cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedCorpus));
      cycle.toString().should.include('occupied by corpus');
    });

    it('should show grineer cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedGrineer));
      cycle.toString().should.include('occupied by grineer');
    });
  });
});
