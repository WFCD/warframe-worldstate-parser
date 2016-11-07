'use strict';

const chai = require('chai');

chai.should();

const Alert = require('../lib/Alert.js');

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new Alert(); }).should.throw(TypeError);
      (() => { new Alert({}); }).should.throw(TypeError);
    });
  });
});
