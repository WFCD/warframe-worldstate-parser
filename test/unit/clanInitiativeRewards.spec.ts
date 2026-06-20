import * as chai from 'chai';

import { ClanInitiativeRewards, type WeeklyVaultBonusReward } from '@/models';
import WeeklyVaultBonusRewards from '@/data/WeeklyVaultBonusRewards.json' with {
  type: 'json',
};

const { expect } = chai;

describe('ClanInitiativeRewards', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new ClanInitiativeRewards(
          undefined as unknown as WeeklyVaultBonusReward
        );
      }).to.throw(TypeError);
      expect(() => {
        new ClanInitiativeRewards({} as WeeklyVaultBonusReward);
      }).to.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      for (const vaultRewards of WeeklyVaultBonusRewards) {
        expect(() => {
          new ClanInitiativeRewards(vaultRewards, { locale: 'en' });
        }).to.not.throw(TypeError);
      }
    });
  });
});
