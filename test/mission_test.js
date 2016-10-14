'use strict';

const chai = require('chai');

chai.should();

const Mission = require('../lib/Mission.js');

describe('Mission', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new Mission(); }).should.throw(TypeError);
      (() => { new Mission({}); }).should.throw(TypeError);
    });
  });
});
