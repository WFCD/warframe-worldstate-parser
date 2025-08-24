import * as chai from 'chai';

import Fissure, { type RawFissure } from '../../lib/models/Fissure.js';

chai.should();

describe('Fissure', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Fissure(undefined as unknown as RawFissure);
      }).should.throw(TypeError);
      (() => {
        new Fissure({} as unknown as RawFissure);
      }).should.throw(TypeError);
    });
  });
});
