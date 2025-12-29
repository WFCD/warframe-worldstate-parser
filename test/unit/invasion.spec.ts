import * as chai from 'chai';

import { Invasion, type RawInvasion } from '@/models';

const expect = chai.expect;

describe('Invasion', () => {
  const testData: RawInvasion = {
    _id: { $oid: 'testID' },
    Node: 'node',
    Activation: { $date: { $numberLong: '1767042454251' } },
    Count: 0,
    Goal: 100000,
    AttackerMissionInfo: {
      faction: 'faction1',
    },
    DefenderMissionInfo: {
      faction: 'faction2',
    },
    LocTag: '',
    AttackerReward: { items: [] },
    DefenderReward: { items: [] },
    Completed: false,
  };

  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new Invasion(undefined as unknown as RawInvasion);
      }).to.throw(TypeError);
      expect(() => {
        new Invasion({} as unknown as RawInvasion);
      }).to.throw(TypeError);
    });

    it('should set the attacker victory status correctly', () => {
      const i = new Invasion(testData);
      i.count = -1;
      expect(i.isAttackerWinning).to.be.false;

      i.count = 5;
      expect(i.isAttackerWinning).to.be.true;
    });
  });
});
