'use strict';

const chai = require('chai');

chai.should();

const Simaris = require('../../lib/Simaris.js');

describe('Simaris', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new Simaris(); }).should.throw(TypeError);
      (() => { new Simaris({}); }).should.throw(TypeError);
    });
  });
});
