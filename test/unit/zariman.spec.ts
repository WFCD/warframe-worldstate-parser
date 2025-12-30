import * as chai from 'chai';

import { ZarimanCycle } from '@/models';

const { expect } = chai;

// these are confirmed corpus and grineer cycle time
// the zariman cycle logic depends on zariman bounty expiry time
const confirmedCorpus = 1655059552000;
const confirmedGrineer = 1655181672000;

describe('ZarimanCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new ZarimanCycle(undefined as unknown as Date);
      }).to.throw(TypeError);
      expect(() => {
        new ZarimanCycle({} as unknown as Date);
      }).to.throw(TypeError);
    });

    it('should allow active', () => {
      const cycle = new ZarimanCycle(new Date(Date.now() + 75000));

      const expiry = cycle.expired;
      expect(expiry).to.eq(false);
    });

    it('should show corpus cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedCorpus));
      expect(cycle.state).to.include('corpus');
    });

    it('should show grineer cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedGrineer));
      expect(cycle.state).to.include('grineer');
    });
  });
});
