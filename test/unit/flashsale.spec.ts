import * as chai from 'chai';

import FlashSale, { type RawFlashSale } from '../../lib/models/FlashSale.js';

chai.should();

describe('FlashSale', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new FlashSale(undefined as unknown as RawFlashSale);
      }).should.throw(TypeError);
      (() => {
        new FlashSale({} as unknown as RawFlashSale);
      }).should.throw(TypeError);
    });
  });
});
