import * as chai from 'chai';

import { Fissure, type RawFissure } from '@/models';

const expect = chai.expect;

describe('Fissure', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new Fissure(undefined as unknown as RawFissure);
      }).to.throw(TypeError);
      expect(() => {
        new Fissure({} as unknown as RawFissure);
      }).to.throw(TypeError);
    });
  });
});
