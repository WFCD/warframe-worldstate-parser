'use strict';

const chai = require('chai');

chai.should();

const Event = require('../../lib/WorldEvent.js');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate.js');
const translation = require('../mocks/translation.js');

const events = require('../data/Goals.json');

describe('Event', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => { new Event(); }).should.throw(TypeError);
      (() => { new Event({}); }).should.throw(TypeError);
    });

    it('should parse mock event data', () => {
      (() => { new Event(events, { mdConfig, timeDate, translator: translation }); })
        .should.not.throw;
    });
  });
  describe('#toString()', () => {
    const translator = { faction: (f) => f, languageString: (l) => l, node: (n) => n };
    it('should only include the rewards if the event has any', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, {
        timeDate, RewardParser: {}, translator, mdConfig,
      });
      e.toString().should.not.match(/Rewards/);

      e.rewards = ['reward1'];
      e.toString().should.match(/Rewards/);
    });
    it('should not include the node if the event has one', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, {
        timeDate, RewardParser: {}, translator, mdConfig,
      });
      e.toString().should.not.match(/Battle on/);

      e.node = 'Node';
      e.toString().should.match(/Battle on/);
    });
    it('should only include the victim node if the event has one', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, {
        timeDate, RewardParser: {}, translator, mdConfig,
      });
      e.toString().should.not.match(/Protect/);

      e.victim = 'Victim Node';
      e.toString().should.match(/Protect/);
    });
  });
});
