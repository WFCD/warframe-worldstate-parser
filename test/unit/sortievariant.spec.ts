import * as chai from 'chai';

import SortieVariant, { RawSortieVariant } from '../../lib/models/SortieVariant.js';

chai.should();

describe('SortieVariant', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new SortieVariant(undefined as unknown as RawSortieVariant);
      }).should.throw(TypeError);
      (() => {
        new SortieVariant({} as unknown as RawSortieVariant);
      }).should.throw(TypeError);
    });
  });
});
