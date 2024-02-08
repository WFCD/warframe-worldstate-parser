import chai from 'chai';
import DailyDeal from '../../lib/models/DailyDeal.js';

chai.should();

describe('DailyDeal', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new DailyDeal();
      }).should.throw(TypeError);
      (() => {
        new DailyDeal({});
      }).should.throw(TypeError);
    });
  });
});
