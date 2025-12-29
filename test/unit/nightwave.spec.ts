import * as chai from 'chai';

import { Nightwave, type RawNightwave } from '@/models';
import type { Dependency } from '@/supporting';
import nwdata from '@/data/Nightwave.json' with { type: 'json' };

const expect = chai.expect;

const deps: Dependency = {
  locale: 'en',
};

describe('Nightwave', () => {
  describe('#constructor', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new Nightwave(undefined as unknown as RawNightwave);
      }).to.throw(TypeError);
      expect(() => {
        new Nightwave({} as unknown as RawNightwave);
      }).to.throw(TypeError);
    });
    it('should parse nightwave data', () => {
      expect(() => {
        new Nightwave(nwdata, deps);
      }).to.not.throw();
    });
    it('isDaily should be present', () => {
      expect(() => {
        const n = new Nightwave(nwdata, deps);
        const challenges = n.possibleChallenges.concat(n.activeChallenges);
        challenges.forEach((e) => {
          expect(typeof e.isDaily !== 'undefined').to.be.true;
        });
      }).to.not.throw();
    });
  });
});
