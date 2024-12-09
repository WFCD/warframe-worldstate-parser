import * as chai from 'chai';

import Nightwave from '../../lib/models/Nightwave.js';
import nwdata from '../data/Nightwave.json' with { type: 'json' };

chai.should();

const { expect } = chai;

const deps = {
  locale: 'en',
};

describe('Nightwave', () => {
  describe('#constructor', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Nightwave();
      }).should.throw(TypeError);
      (() => {
        new Nightwave({});
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
