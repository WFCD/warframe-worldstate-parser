import * as chai from 'chai';

import { DailyDeal, type RawDailyDeal } from '@/models';

const expect = chai.expect;

describe('DailyDeal', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new DailyDeal(undefined as unknown as RawDailyDeal);
      }).to.throw(TypeError);
      expect(() => {
        new DailyDeal({} as RawDailyDeal);
      }).to.throw(TypeError);
    });
  });
});
