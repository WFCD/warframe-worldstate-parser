'use strict';

const chai = require('chai');

chai.should();

const utils = require('../lib/timeDate.js');

describe('timeDateUtils', function () {
  describe('timeDeltaToString()', function () {
    it('should throw TypeError when called without arguments', function () {
      (() => { utils.timeDeltaToString(); }).should.throw(TypeError);
    });
    it('only shows seconds if the difference is less than a minute', function () {
      utils.timeDeltaToString(30000).should.match(/^\d{1,2}s$/);
    });
    it('shows both seconds and minutes if the difference is between a minute and an hour', function () {
      utils.timeDeltaToString(120000).should.match(/^\d{1,2}m \d{1,2}s$/);
    });
    it('shows seconds, minutes, and hours if the difference is between an hour and a day', function () {
      utils.timeDeltaToString(4000000)
        .should.match(/^\d{1,2}h \d{1,2}m \d{1,2}s$/);
    });
    it('shows seconds, minutes, hours and days if the difference is more than a day', function () {
      utils.timeDeltaToString(120000000)
        .should.match(/^\d+d \d{1,2}h \d{1,2}m \d{1,2}s$/);
    });
  });
});
