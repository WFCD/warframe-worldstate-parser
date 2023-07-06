'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const timeDate = require('../mocks/timeDate');
const WorldStateObject = require('../../lib/models/WorldstateObject');

chai.should();
chai.use(sinonChai);

const WorldState = rewire('../../lib/WorldState.js');

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

describe('WorldStateObject', () => {
  describe('#constructor()', () => {
    it('requires some data', () => {
      (() => {
        new WorldStateObject();
      }).should.throw();
    });
  });

  it('should make the end string correctly', () => {
    const mock = {
      _id: { $oid: 'testID' },
      Activation: {
        $date: {
          $numberLong: '1586372400000',
        },
      },
      Expiry: {
        $date: {
          $numberLong: '1586977200000',
        },
      },
    };

    const wso = new WorldStateObject(mock, { timeDate });
    wso.getEndString().should.exist;
  });

  it('should honor _id.$id', () => {
    const mock = {
      _id: { $id: 'testID' },
    };

    const wso = new WorldStateObject(mock, { timeDate });
    wso.id.should.equal('testID');
  });
});
