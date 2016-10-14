'use strict';

const chai = require('chai');

chai.should();

const Fissure = require('../lib/Fissure.js');

describe('Fissure', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new Fissure(); }).should.throw(TypeError);
      (() => { new Fissure({}); }).should.throw(TypeError);
    });
  });
});
