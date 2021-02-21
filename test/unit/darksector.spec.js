'use strict';

const chai = require('chai');

chai.should();

const DarkSector = require('../../lib/DarkSector.js');

describe('DarkSector', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new DarkSector(); }).should.throw();
      (() => { new DarkSector({}); }).should.throw();
    });
  });
});
