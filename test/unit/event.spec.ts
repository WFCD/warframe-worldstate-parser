import * as chai from 'chai';

import Reward from '../../lib/models/Reward';
import Event, { RawWorldEvent } from '../../lib/models/WorldEvent';
import events from '../data/Goals.json' with { type: 'json' };

chai.should();

describe('Event', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new Event(undefined as unknown as RawWorldEvent);
      }).should.throw(TypeError);
      (() => {
        new Event({} as RawWorldEvent);
      }).should.throw(TypeError);
    });

    it('should parse mock event data', () => {
      (() => {
        new Event(events[0]);
      }).should.not.throw;
    });
  });
  describe('#toString()', () => {
    for (const event of events) {
      it('should only include the rewards if the event has any', async () => {
        const sc: RawWorldEvent = { ...event };
        delete sc.Reward;
        delete sc.InterimRewards;

        const e = await Event.build(sc, { locale: 'en' });
        e.toString().should.not.match(/Rewards/);

        e.rewards = [new Reward({ items: ['reward1'] })];
        e.toString().should.match(/Rewards/);
      });
      it('should not include the node if the event has one', async () => {
        const sc: RawWorldEvent = { ...event };
        delete sc.Node;

        const e = await Event.build(sc, { locale: 'en' });
        e.toString().should.not.match(/Battle on/);

        e.node = 'Node';
        e.toString().should.match(/Battle on/);
      });
      it('should only include the victim node if the event has one', async () => {
        const sc: RawWorldEvent = { ...event };
        delete sc.VictimNode;

        const e = await Event.build(sc, { locale: 'en' });
        e.toString().should.not.match(/Protect/);

        e.victim = 'Victim Node';
        e.toString().should.match(/Protect/);
      });
    }
  });
});
