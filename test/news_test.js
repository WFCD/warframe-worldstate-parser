'use strict';

const chai = require('chai');

chai.should();

const News = require('../src/News.js');
const testData = require('./data/News.json');

describe('News', function () {
  describe('#constructor()', function () {
    it('requires one argument', function () {
      (function () {
        new News();
      }).should.throw(TypeError);
    });
  });
  describe('#toString()', function () {
    it('should return a string', function () {
      const n = new News(testData);
      n.toString().should.be.a('string');
    });
  });
});
