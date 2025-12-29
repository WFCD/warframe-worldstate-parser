import * as chai from 'chai';

import { Invasion, type RawInvasion } from '@/models';

const should = chai.should();

describe('Invasion', () => {
  const testData: RawInvasion = {
    _id: { $oid: 'testID' },
    Node: 'node',
    Activation: { sec: 1000 },
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
      (() => {
        new Invasion(undefined as unknown as RawInvasion);
      }).should.throw(TypeError);
      (() => {
        new Invasion({} as unknown as RawInvasion);
      }).should.throw(TypeError);
    });

    it('should set the attacker victory status correctly', () => {
      const i = new Invasion(testData);
      i.count = -1;
      should.equal(i.isAttackerWinning, false);

      i.count = 5;
      should.equal(i.isAttackerWinning, true);
    });
  });
});
