'use strict';

const chai = require('chai');

chai.should();

const DailyDeal = require('../../lib/DailyDeal');

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
