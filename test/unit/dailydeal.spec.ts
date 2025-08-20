import * as chai from 'chai';

import DailyDeal, { RawDailyDeal } from '../../lib/models/DailyDeal';

chai.should();

describe('DailyDeal', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new DailyDeal(undefined as unknown as RawDailyDeal);
      }).should.throw(TypeError);
      (() => {
        new DailyDeal({} as RawDailyDeal);
      }).should.throw(TypeError);
    });
  });
});
