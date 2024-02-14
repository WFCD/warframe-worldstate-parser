import * as chai from 'chai';

import Invasion from '../../lib/models/Invasion.js';

const should = chai.should();

describe('Invasion', () => {
  const testData = {
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
  };

  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Invasion();
      }).should.throw(TypeError);
      (() => {
        new Invasion({});
      }).should.throw(TypeError);
    });
  });

  describe('#toString()', () => {
    it('should choose the right format according to the factions that are fighting', () => {
      const i = new Invasion(testData);
      i.toString().should.match(/vs\./);
      i.vsInfestation = true;
      i.toString().should.not.match(/vs\./);
    });

    it('should set the attacker victory status correctly', () => {
      const i = new Invasion(testData);
      i.count = -1;
      should.equal(i.isAttackerWinning(), false);

      i.count = 5;
      should.equal(i.isAttackerWinning(), true);
    });
  });
});
