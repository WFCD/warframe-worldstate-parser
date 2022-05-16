'use strict';

const chai = require('chai');

chai.should();

const SortieVariant = require('../../lib/SortieVariant');

describe('SortieVariant', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new SortieVariant();
      }).should.throw(TypeError);
      (() => {
        new SortieVariant({});
      }).should.throw(TypeError);
    });
  });
});
