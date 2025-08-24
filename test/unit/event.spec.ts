import * as chai from 'chai';

import Event, { type RawWorldEvent } from '../../lib/models/WorldEvent';
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
});
