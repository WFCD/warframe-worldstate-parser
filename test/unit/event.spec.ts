import * as chai from 'chai';

import { type RawWorldEvent, WorldEvent } from '@/models';
import events from '@/data/Goals.json' with { type: 'json' };

chai.should();

describe('Event', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new WorldEvent(undefined as unknown as RawWorldEvent);
      }).should.throw(TypeError);
      (() => {
        new WorldEvent({} as RawWorldEvent);
      }).should.throw(TypeError);
    });

    it('should parse mock event data', () => {
      (() => {
        new WorldEvent(events[0] as unknown as RawWorldEvent);
      }).should.not.throw;
    });
  });
});
