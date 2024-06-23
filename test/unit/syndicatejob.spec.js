import * as chai from 'chai';

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
    const poolTest = async (data) =>
      async function () {
        this.timeout(1100000000);
        const job = await SyndicateJob.build(data, new Date(), { locale });
        const verify = (rewardPool) => {
          rewardPool.should.be.an('array');
          rewardPool.length.should.be.at.least(1);
        };

        if (job.rewardPool?.length) verify(job.rewardPool);
      };

    it('should exist when requested', async () => poolTest(isoVaultBounty));
    it('should support plague star', async () => poolTest(plagueStarBounty));
    it('should support Cetus F Tier', async () => poolTest(CetusFTier));
    it('should support Deimos F Tier', async () => poolTest(CambionFTier));
    it('should support Unmatched tiers', async () => poolTest(NoMatchJob));
  });
});
