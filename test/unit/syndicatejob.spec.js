'use strict';

const chai = require('chai');

chai.should();

const SyndicateJob = require('../../lib/models/SyndicateJob');
const timeDate = require('../mocks/timeDate');
const translator = require('../mocks/translation');

const locale = 'en';

describe('SyndicateJob', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new SyndicateJob();
      }).should.throw(TypeError);
      (() => {
        new SyndicateJob({});
      }).should.throw(TypeError);
    });
  });

  describe('.rewardPool', () => {
    const poolTest = (data) =>
      function (done) {
        this.timeout(1100000000);
        const job = new SyndicateJob(data, new Date(), { translator, timeDate, locale });

        let interval;
        const verify = (rewardPool) => {
          rewardPool.should.be.an('array');
          rewardPool.length.should.be.at.least(1);
          done();
          clearInterval(interval);
        };

        interval = setInterval(() => {
          if (job.rewardPool.length) verify(job.rewardPool);
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          verify(job.rewardPool);
        }, 10000);
      };

    it('should exist when requested', poolTest(require('../data/isoVaultBounty.json')));
    it('should support plague star', poolTest(require('../data/plagueStarBounty.json')));
    it('should support Cetus F Tier', poolTest(require('../data/CetusFTier.json')));
    it('should support Deimos F Tier', poolTest(require('../data/CambionFTier.json')));
    it('should support Unmatched tiers', poolTest(require('../data/NoMatchJob.json')));
  });
});
