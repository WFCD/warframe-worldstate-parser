import * as chai from 'chai';

import { type RawSortie, Sortie } from '@/models';

const expect = chai.expect;

describe('Sortie', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Sortie(undefined as unknown as RawSortie);
      }).to.throw(TypeError);
      expect(() => {
        new Sortie({} as unknown as RawSortie);
      }).to.throw(TypeError);
    });
  });
});
