import * as chai from 'chai';

import { type RawSortie, Sortie } from '@/models';

chai.should();

describe('Sortie', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Sortie(undefined as unknown as RawSortie);
      }).should.throw(TypeError);
      (() => {
        new Sortie({} as unknown as RawSortie);
      }).should.throw(TypeError);
    });
  });
});
