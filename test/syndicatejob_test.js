'use strict';

const chai = require('chai');

chai.should();

const SyndicateJob = require('../lib/SyndicateJob');
const timeDate = require('./mocks/timeDate');
const translator = require('./mocks/translation');

const isoVault = require('./data/isoVaultBounty');

const locale = 'en';

describe('SyndicateJob', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => { new SyndicateJob(); }).should.throw(TypeError);
      (() => { new SyndicateJob({}); }).should.throw(TypeError);
    });
  });

  describe('.rewardPool', () => {
    it('should exist when requested', function (done) {
      this.timeout(11000);
      const job = new SyndicateJob(isoVault, new Date(), { translator, timeDate, locale });

      const verify = (rewardPool) => {
        rewardPool.should.be.an('array');
        rewardPool.length.should.be.at.least(1);
        done();
        clearInterval(interval); // eslint-disable-line no-use-before-define
      };

      const interval = setInterval(() => {
        if (job.rewardPool.length) verify(job.rewardPool);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        verify(job);
      }, 10000);
    });
  });
});
