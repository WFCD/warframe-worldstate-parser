'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

chai.should();
chai.use(sinonChai);

const WorldState = rewire('../lib/WorldState.js');

describe('WorldState', function () {
  describe('#constructor()', function () {
    it('requires one string argument', function () {
      (function () {
        new WorldState();
      }).should.throw(TypeError);
    });
    it('requires valid JSON', function () {
      (function () {
        new WorldState('{');
      }).should.throw(SyntaxError);
    });
    it('requires a valid WorldState', function () {
      (function () {
        new WorldState({});
      }).should.throw(TypeError);
    });
  });
  describe('parseArray()', function () {
    const parseArray = WorldState.__get__('parseArray');
    it('uses the provided class to parse each element of the array', function () {
      const spy = sinon.spy();
      const testArray = ['test'];

      parseArray(spy, testArray);
      spy.should.have.been.calledWithNew;
      spy.should.have.been.calledWith(testArray[0]);
    });
  });
});
