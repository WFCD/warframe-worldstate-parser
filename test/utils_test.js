'use strict';

const chai = require('chai');

chai.should();

const utils = require('../src/utils.js');

describe('utils', function () {
  describe('timeDeltaToString()', function () {
    it('requires one numeric argument', function () {
      (() => { utils.timeDeltaToString(); }).should.throw(TypeError);
      (() => { utils.timeDeltaToString('23'); }).should.throw(TypeError);
      (() => { utils.timeDeltaToString(23); }).should.not.throw();
    });
    it('only shows seconds if millis is less than a minute', function () {
      utils.timeDeltaToString(3000).should.match(/^\d{1,2}s$/);
    });
    it('shows both seconds and minutes if millis is between a minute and an hour', function () {
      utils.timeDeltaToString(100000).should.match(/^\d{1,2}m \d{1,2}s$/);
    });
    it('shows seconds, minutes, and hours if millis is between an hour and a day', function () {
      utils.timeDeltaToString(4000000).should.match(/^\d{1,2}h \d{1,2}m \d{1,2}s$/);
    });
    it('shows seconds, minutes, hours and days if millis is more than a day', function () {
      utils.timeDeltaToString(100000000).should.match(/^\d+d \d{1,2}h \d{1,2}m \d{1,2}s$/);
    });
  });
});
