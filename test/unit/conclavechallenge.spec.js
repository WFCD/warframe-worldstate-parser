import chai from 'chai';
import * as translator from '../mocks/translation.js';
import timeDate from '../mocks/timeDate.js';
import ConclaveChallenge from '../../lib/ConclaveChallenge.js';

import challenges from '../data/PVPChallengeInstances.json' assert { type: 'json' };

const should = chai.should();

describe('ConclaveChallenge', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => { new ConclaveChallenge(); }).should.throw(TypeError);
      (() => { new ConclaveChallenge({}); }).should.throw(TypeError);
    });

    challenges.filter((challenge) => !challenge.Category.includes('_ROOT'))
      .forEach((challenge) => {
        it('should construct a valid challenge when provided with data', () => {
          (() => new ConclaveChallenge(challenge, { translator, timeDate })).should.not.throw;

          const c = new ConclaveChallenge(challenge, { translator, timeDate });
          should.exist(c.title);
          should.exist(c.standing);
          should.exist(c.description);
        });
      });
  });
});
