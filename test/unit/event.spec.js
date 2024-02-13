import * as chai from 'chai';

import Event from '../../lib/models/WorldEvent.js';
import events from '../data/Goals.json' assert { type: 'json' };

chai.should();

describe('Event', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new Event();
      }).should.throw(TypeError);
      (() => {
        new Event({});
      }).should.throw(TypeError);
    });

    it('should parse mock event data', () => {
      (() => {
        new Event(events);
      }).should.not.throw;
    });
  });
  describe('#toString()', () => {
    it('should only include the rewards if the event has any', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } });
      e.toString().should.not.match(/Rewards/);

      e.rewards = ['reward1'];
      e.toString().should.match(/Rewards/);
    });
    it('should not include the node if the event has one', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } });
      e.toString().should.not.match(/Battle on/);

      e.node = 'Node';
      e.toString().should.match(/Battle on/);
    });
    it('should only include the victim node if the event has one', () => {
      const e = new Event({ _id: { $oid: 'id' }, Expiry: { sec: 1 } });
      e.toString().should.not.match(/Protect/);

      e.victim = 'Victim Node';
      e.toString().should.match(/Protect/);
    });
  });
});
