import * as chai from 'chai';

import { type RawWorldEvent, WorldEvent } from '@/models';
import events from '@/data/Goals.json' with { type: 'json' };

const expect = chai.expect;

describe('Event', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      expect(() => {
        new WorldEvent(undefined as unknown as RawWorldEvent);
      }).to.throw(TypeError);
      expect(() => {
        new WorldEvent({} as RawWorldEvent);
      }).to.throw(TypeError);
    });

    it('should parse mock event data', () => {
      expect(() => {
        new WorldEvent(events[0] as unknown as RawWorldEvent);
      }).to.not.throw();
    });
  });
});
