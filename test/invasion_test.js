'use strict';

const chai = require('chai');

chai.should();

const Invasion = require('../lib/Invasion.js');
const mdConfig = require('./data/markdown.json');
const timeDate = require('./mocks/timeDate.js');

describe('Invasion', function describeInvasion() {
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
    languageString: n => n,
    node: n => n,
    faction: n => n,
  };
  const Reward = function CreateReward() {
    this.reward = 'reward';
    this.getTypes = function getTypes() {
      return [];
    };
  };

  describe('#constructor()', function describeConstructor() {
    it('should throw TypeError when called with no arguments or an invalid argument', function reuireConstructor() {
      (() => { new Invasion(); }).should.throw(TypeError);
      (() => { new Invasion({}); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function describeToString() {
    it('should choose the right format according to the factions that are fighting', function requireToString() {
      const i = new Invasion(testData, { Reward, translator, timeDate, mdConfig });
      i.toString().should.match(/vs\./);
      i.vsInfestation = true;
      i.toString().should.not.match(/vs\./);
    });
  });
});
