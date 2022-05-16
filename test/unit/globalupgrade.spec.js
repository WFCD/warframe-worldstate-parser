'use strict';

const chai = require('chai');

chai.should();

const GlobalUpgrade = require('../../lib/GlobalUpgrade');

describe('GlobalUpgrade', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new GlobalUpgrade();
      }).should.throw(TypeError);
      (() => {
        new GlobalUpgrade({});
      }).should.throw(TypeError);
    });
  });
});
