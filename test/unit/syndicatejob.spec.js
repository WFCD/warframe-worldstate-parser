import chai from 'chai';

import SyndicateJob from '../../lib/models/SyndicateJob.js';
import isoVaultBounty from '../data/isoVaultBounty.json' assert { type: 'json' };
import plagueStarBounty from '../data/plagueStarBounty.json' assert { type: 'json' };
import CetusFTier from '../data/CetusFTier.json' assert { type: 'json' };
import CambionFTier from '../data/CambionFTier.json' assert { type: 'json' };
import NoMatchJob from '../data/NoMatchJob.json' assert { type: 'json' };

chai.should();

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
        const job = new SyndicateJob(data, new Date(), { locale });

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

    it('should exist when requested', poolTest(isoVaultBounty));
    it('should support plague star', poolTest(plagueStarBounty));
    it('should support Cetus F Tier', poolTest(CetusFTier));
    it('should support Deimos F Tier', poolTest(CambionFTier));
    it('should support Unmatched tiers', poolTest(NoMatchJob));
  });
});
