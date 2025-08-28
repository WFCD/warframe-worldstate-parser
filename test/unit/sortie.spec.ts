import * as chai from 'chai';

import Sortie, { type RawSortie } from '../../lib/models/Sortie.js';

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
