'use strict';

const chai = require('chai');

chai.should();

const PersistentEnemy = require('../../lib/models/PersistentEnemy');

describe('PersistentEnemy', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new PersistentEnemy();
      }).should.throw(TypeError);
      (() => {
        new PersistentEnemy({});
      }).should.throw(TypeError);
    });
  });
});
