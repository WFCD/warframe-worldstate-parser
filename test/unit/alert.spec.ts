import * as chai from 'chai';

import { Alert, type RawAlert } from '@/models';
import Alerts from '@/data/Alerts.json' with { type: 'json' };

const { expect } = chai;

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Alert(undefined as unknown as RawAlert);
      }).to.throw(TypeError);
      expect(() => {
        new Alert({} as RawAlert);
      }).to.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      for (const alert of Alerts) {
        expect(() => {
          new Alert(alert, { locale: 'en' });
        }).to.not.throw(TypeError);
      }
    });

    it('should preserve item uniqueNames on countedItems and exclusiveWeapon', () => {
      const raw = Alerts[0];
      const alert = new Alert(raw, { locale: 'en' });
      const itemPath = raw.MissionInfo.missionReward.items[0];

      expect(alert.mission.reward!.countedItems).to.have.length(1);
      expect(alert.mission.reward!.countedItems[0].uniqueName).to.equal(
        itemPath
      );
      expect(alert.mission.reward!.countedItems[0].count).to.equal(1);
      expect(alert.mission.exclusiveWeaponUniqueName).to.equal(
        raw.MissionInfo.exclusiveWeapon
      );
    });
  });
});
