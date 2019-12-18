'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

chai.should();
chai.use(sinonChai);

const WorldState = rewire('../lib/WorldState.js');

describe('WorldState', () => {
  describe('#constructor()', () => {
    it('requires one string argument', () => {
      (() => {
        new WorldState();
      }).should.throw(TypeError);
    });
    it('requires valid JSON', () => {
      (() => {
        new WorldState('{');
      }).should.throw(SyntaxError);
    });
    it('requires a valid WorldState', () => {
      (() => {
        new WorldState({});
      }).should.throw(TypeError);
    });
  });
  describe('parseArray()', () => {
    const parseArray = WorldState.__get__('parseArray');
    it('uses the provided class to parse each element of the array', () => {
      const spy = sinon.spy();
      const testArray = ['test'];

      parseArray(spy, testArray);
      spy.should.have.been.calledWithNew;
      spy.should.have.been.calledWith(testArray[0]);
    });
  });
});
