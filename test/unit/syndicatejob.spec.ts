import * as chai from 'chai';

import SyndicateJob, { type RawSyndicateJob } from '../../lib/models/SyndicateJob.js';
import CambionFTier from '../data/CambionFTier.json' with { type: 'json' };
import CetusFTier from '../data/CetusFTier.json' with { type: 'json' };
import isoVaultBounty from '../data/isoVaultBounty.json' with { type: 'json' };
import NoMatchJob from '../data/NoMatchJob.json' with { type: 'json' };
import plagueStarBounty from '../data/plagueStarBounty.json' with { type: 'json' };

chai.should();

const locale = 'en';

describe('SyndicateJob', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new SyndicateJob(undefined as unknown as RawSyndicateJob, undefined as unknown as Date);
      }).should.throw(TypeError);
      (() => {
        new SyndicateJob(undefined as unknown as RawSyndicateJob, undefined as unknown as Date);
      }).should.throw(TypeError);
    });
  });

  describe('.rewardPool', () => {
    const poolTest = async (data: RawSyndicateJob) =>
      async function () {
        this.timeout(1100000000);
        const job = await SyndicateJob.build(data, new Date(), { locale });
        const verify = (rewardPool: string[]) => {
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
