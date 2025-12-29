import * as chai from 'chai';

import { ZarimanCycle } from '@/models';

const should = chai.should();
// these are confirmed corpus and grineer cycle time
// the zariman cycle logic depends on zariman bounty expiry time
const confirmedCorpus = 1655059552000;
const confirmedGrineer = 1655181672000;

describe('ZarimanCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new ZarimanCycle(undefined as unknown as Date);
      }).should.throw(TypeError);
      (() => {
        new ZarimanCycle({} as unknown as Date);
      }).should.throw(TypeError);
    });

    it('should allow active', () => {
      const cycle = new ZarimanCycle(new Date(Date.now() + 75000));

      const expiry = cycle.expired;
      should.equal(expiry, false);
    });

    it('should show corpus cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedCorpus));
      cycle.state.should.include('corpus');
    });

    it('should show grineer cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedGrineer));
      cycle.state.should.include('grineer');
    });
  });
});
