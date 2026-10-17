import * as chai from 'chai';
import sinon, { type SinonStub } from 'sinon';

import { type RawSyndicateJob, type RewardDrop, SyndicateJob } from '@/models';
import CambionFTier from '@/data/CambionFTier.json' with { type: 'json' };
import CetusFTier from '@/data/CetusFTier.json' with { type: 'json' };
import isoVaultBounty from '@/data/isoVaultBounty.json' with { type: 'json' };
import NoMatchJob from '@/data/NoMatchJob.json' with { type: 'json' };
import plagueStarBounty from '@/data/plagueStarBounty.json' with {
  type: 'json',
};
import TierATableABounty from '@/data/TierATableABounty.json' with {
  type: 'json',
};

const expect = chai.expect;

const locale = 'en';

describe('SyndicateJob', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new SyndicateJob(
          undefined as unknown as RawSyndicateJob,
          undefined as unknown as Date
        );
      }).to.throw(TypeError);
      expect(() => {
        new SyndicateJob(
          {} as unknown as RawSyndicateJob,
          undefined as unknown as Date
        );
      }).to.throw(TypeError);
    });
  });

  describe('.rewardPool', () => {
    const poolTest = async (data: RawSyndicateJob) =>
      async function () {
        this.timeout(1100000000);
        const job = await SyndicateJob.build(data, new Date(), { locale });
        const verify = (rewardPool: (string | RewardDrop)[]) => {
          expect(rewardPool).to.be.an('array');
          expect(rewardPool.length).to.be.at.least(1);
        };

        if (job.rewardPool?.length) verify(job.rewardPool);
        if (job.rewardPoolDrops?.length) verify(job.rewardPoolDrops);
      };

    it('should exist when requested', async () => poolTest(isoVaultBounty));
    it('should support plague star', async () => poolTest(plagueStarBounty));
    it('should support Cetus F Tier', async () => poolTest(CetusFTier));
    it('should support Deimos F Tier', async () => poolTest(CambionFTier));
    it('should support Unmatched tiers', async () => poolTest(NoMatchJob));
  });

  describe('reward pool fetching', () => {
    const cetusKey = 'Earth/Cetus (Level 5 - 15 Cetus Bounty), Rot A';
    const cetusPool = {
      [cetusKey]: {
        rewards: [
          { item: '100X Oxium', rarity: 'Uncommon', chance: 20 },
          { item: 'Redirection', rarity: 'Uncommon', chance: 20 },
        ],
      },
    };
    let fetchStub: SinonStub;
    let logs: string[];
    const logger = { debug: (message: string) => logs.push(message) };

    /**
     * Stub global fetch with a fixed response. Also answers the
     * PROXY_URL (solverr) path used in CI, which wraps the real request.
     */
    const respondWith = (status: number, body: unknown) => {
      fetchStub = sinon
        .stub(globalThis, 'fetch')
        .callsFake(async (_input, init) => {
          const text = typeof body === 'string' ? body : JSON.stringify(body);
          if (init?.method === 'POST') {
            return new Response(
              JSON.stringify({
                solution: { response: text, responseCode: status },
              })
            );
          }
          return new Response(text, { status });
        });
    };

    beforeEach(() => {
      logs = [];
    });
    afterEach(() => sinon.restore());

    it('should map TierATableARewards (issue #821) to its drop table', async () => {
      respondWith(200, cetusPool);
      const job = await SyndicateJob.build(
        TierATableABounty as RawSyndicateJob,
        new Date(),
        { locale, logger }
      );
      expect(job.rewardPool).to.deep.equal(['100X Oxium', 'Redirection']);
      expect(job.rewardPoolDrops[0]).to.include({ item: 'Oxium', count: 100 });
      expect(logs).to.be.empty;
    });

    it('should log the HTTP status when the drops API answers with an error', async () => {
      respondWith(429, { error: 'Too Many Requests', code: 429 });
      const job = await SyndicateJob.build(
        TierATableABounty as RawSyndicateJob,
        new Date(),
        { locale, logger }
      );
      expect(job.rewardPool).to.deep.equal([
        'Pattern Mismatch. Results inaccurate.',
      ]);
      expect(job.rewardPoolDrops).to.be.empty;
      expect(logs).to.have.lengthOf(1);
      expect(logs[0]).to.contain('HTTP 429');
    });

    it('should log a real key mismatch distinctly from fetch failures', async () => {
      respondWith(200, cetusPool);
      const job = await SyndicateJob.build(
        NoMatchJob as RawSyndicateJob,
        new Date(),
        { locale, logger }
      );
      expect(job.rewardPool).to.deep.equal([
        'Pattern Mismatch. Results inaccurate.',
      ]);
      expect(logs).to.deep.equal([
        'No bounty reward pool found for "Earth/Cetus (Level 99 - 121 Cetus Bounty), Rot A"',
      ]);
    });

    it('should share one drops request between concurrent jobs of a syndicate', async () => {
      respondWith(200, cetusPool);
      const jobs = await Promise.all(
        Array.from({ length: 7 }, () =>
          SyndicateJob.build(TierATableABounty as RawSyndicateJob, new Date(), {
            locale,
            logger,
          })
        )
      );
      expect(fetchStub.callCount).to.equal(1);
      for (const job of jobs) {
        expect(job.rewardPool).to.deep.equal(['100X Oxium', 'Redirection']);
      }
      // nothing is cached once the request has settled
      await SyndicateJob.build(
        TierATableABounty as RawSyndicateJob,
        new Date(),
        {
          locale,
          logger,
        }
      );
      expect(fetchStub.callCount).to.equal(2);
    });
  });
});
