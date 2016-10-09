'use strict';

const chai = require('chai');

chai.should();

const WorldstateObject = require('../src/WorldstateObject.js');

describe('WorldstateObject', function () {
  describe('#constructor()', function () {
    it('requires one argument', function () {
      (() => { new WorldstateObject(); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    it('returns a string', function () {
      const testData = { _id: { $id: 'test' } };
      const o = new WorldstateObject(testData);
      o.toString().should.be.a('string');
    });
  });
});
