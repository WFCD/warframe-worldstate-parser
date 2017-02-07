'use strict';

const chai = require('chai');

chai.should();

const Event = require('../lib/Event.js');
const mdConfig = require('./data/markdown.json');

describe('Event', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new Event(); }).should.throw(TypeError);
      (() => { new Event({}); }).should.throw(TypeError);
    });
  });
  describe('#toString()', function () {
    const translator = { faction: f => f, languageString: l => l, node: n => n };
    it('should only include the rewards if the event has any', function () {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, { RewardParser: {}, translator, mdConfig });
      e.toString().should.not.match(/Rewards/);

      e.rewards = ['reward1'];
      e.toString().should.match(/Rewards/);
    });
    it('should not include the node if the event has one', function () {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, { RewardParser: {}, translator, mdConfig });
      e.toString().should.not.match(/Battle on/);

      e.node = 'Node';
      e.toString().should.match(/Battle on/);
    });
    it('should only include the victim node if the event has one', function () {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } }, { RewardParser: {}, translator, mdConfig });
      e.toString().should.not.match(/Protect/);

      e.victim = 'Victim Node';
      e.toString().should.match(/Protect/);
    });
  });
});
