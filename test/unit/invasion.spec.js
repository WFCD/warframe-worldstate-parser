'use strict';

const chai = require('chai');

const should = chai.should();

const Invasion = require('../../lib/models/Invasion');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate');

function Reward() {
  this.reward = 'reward';
  this.getTypes = function getTypes() {
    return [];
  };
}

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
  const translator = {
    languageString: (n) => n,
    node: (n) => n,
    faction: (n) => n,
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
      const i = new Invasion(testData, {
        Reward,
        translator,
        timeDate,
        mdConfig,
      });
      i.toString().should.match(/vs\./);
      i.vsInfestation = true;
      i.toString().should.not.match(/vs\./);
    });

    it('should set the attacker victory status correctly', () => {
      const i = new Invasion(testData, {
        Reward,
        translator,
        timeDate,
        mdConfig,
      });
      i.count = -1;
      should.equal(i.isAttackerWinning(), false);

      i.count = 5;
      should.equal(i.isAttackerWinning(), true);
    });
  });
});
