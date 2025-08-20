import * as chai from 'chai';

import Nightwave, { RawNightwave } from '../../lib/models/Nightwave.js';
import nwdata from '../data/Nightwave.json' with { type: 'json' };
import Dependency from '../../lib/supporting/Dependency.js';

chai.should();

const { expect } = chai;

const deps: Dependency = {
  locale: 'en',
};

describe('Nightwave', () => {
  describe('#constructor', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Nightwave(undefined as unknown as RawNightwave);
      }).should.throw(TypeError);
      (() => {
        new Nightwave({} as unknown as RawNightwave);
      }).should.throw(TypeError);
    });
    it('should parse nightwave data', () => {
      (() => {
        new Nightwave(nwdata, deps);
      }).should.not.throw();
    });
    it('isDaily should be present', () => {
      (() => {
        const n = new Nightwave(nwdata, deps);
        const challenges = n.possibleChallenges.concat(n.activeChallenges);
        challenges.forEach((e) => expect(typeof e.isDaily !== 'undefined').to.be.true);
      }).should.not.throw();
    });
  });
});
