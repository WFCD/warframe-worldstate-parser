import * as chai from 'chai';

import { type RawSortieVariant, SortieVariant } from '@/models';

const expect = chai.expect;

describe('SortieVariant', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new SortieVariant(undefined as unknown as RawSortieVariant);
      }).to.throw(TypeError);
      expect(() => {
        new SortieVariant({} as unknown as RawSortieVariant);
      }).to.throw(TypeError);
    });
  });
});
