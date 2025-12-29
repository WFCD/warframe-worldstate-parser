import * as chai from 'chai';

import { FlashSale, type RawFlashSale } from '@/models';

const expect = chai.expect;

describe('FlashSale', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new FlashSale(undefined as unknown as RawFlashSale);
      }).to.throw(TypeError);
      expect(() => {
        new FlashSale({} as unknown as RawFlashSale);
      }).to.throw(TypeError);
    });
  });
});
