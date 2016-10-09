'use strict';

const chai = require('chai');

chai.should();

const Event = require('../src/Event.js');
const testData = require('./data/Event.json');

describe('Event', function () {
  describe('#constructor()', function () {
    it('requires one argument', function () {
      (() => { new Event(); }).should.throw(TypeError);
    });
  });
  describe('#toString()', function () {
    it('should return a string', function () {
      const e = new Event(testData);
      e.toString().should.be.a('string');
    });
  });
  describe('#expired()', function () {
    it('should return a boolean', function () {
      const e = new Event(testData);
      e.expired.should.be.a('boolean');
    });
  });
});
