'use strict';

const chai = require('chai');

chai.should();

const ConclaveChallenge = require('../lib/ConclaveChallenge.js');

describe('ConclaveChallenge', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new ConclaveChallenge(); }).should.throw(TypeError);
      (() => { new ConclaveChallenge({}); }).should.throw(TypeError);
    });
  });
});
