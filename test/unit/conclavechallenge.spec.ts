import * as chai from 'chai';

import { ConclaveChallenge, type RawChallenge } from '@/models';
import challenges from '@/data/PVPChallengeInstances.json' with {
  type: 'json',
};

const expect = chai.expect;

describe('ConclaveChallenge', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      expect(() => {
        new ConclaveChallenge(undefined as unknown as RawChallenge);
      }).to.throw(TypeError);
      expect(() => {
        new ConclaveChallenge({} as RawChallenge);
      }).to.throw(TypeError);
    });

    challenges
      .filter((challenge) => !challenge.Category.includes('_ROOT'))
      .forEach((challenge) => {
        it('should construct a valid challenge when provided with data', () => {
          expect(() => new ConclaveChallenge(challenge)).to.not.throw();

          const c = new ConclaveChallenge(challenge);
          expect(c.title).to.exist;
          expect(c.standing).to.exist;
          expect(c.description).to.exist;
        });
      });
  });
});
