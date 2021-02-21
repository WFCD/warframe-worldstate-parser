'use strict';

const chai = require('chai');

const should = chai.should();

const challenges = require('../data/PVPChallengeInstances');

const translator = require('../../lib/translation');
const timeDate = require('../../lib/timeDate');

const ConclaveChallenge = require('../../lib/ConclaveChallenge.js');

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
