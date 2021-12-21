import chai from 'chai';
import sinonChai from 'sinon-chai';
import WorldState from '../../lib/WorldState.js';

// Deprecated
// const rewire = require('rewire');
// const WorldState = rewire('../../lib/WorldState.js');

import * as timeDate from '../../lib/timeDate.js';
import WorldstateObject from '../../lib/WorldstateObject.js';

chai.should();
chai.use(sinonChai);

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
  // Deprecated
  // describe('parseArray()', () => {
  //   const parseArray = WorldState.__get__('parseArray');
  //   it('uses the provided class to parse each element of the array', () => {
  //     const spy = sinon.spy();
  //     const testArray = ['test'];
  //
  //     parseArray(spy, testArray);
  //     spy.should.have.been.calledWithNew;
  //     spy.should.have.been.calledWith(testArray[0]);
  //   });
  // });
});

describe('WorldStateObject', () => {
  describe('#constructor()', () => {
    it('requires some data', () => {
      (() => {
        new WorldstateObject();
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

    const wso = new WorldstateObject(mock, { timeDate });
    wso.getEndString().should.exist;
  });

  it('should honor _id.$id', () => {
    const mock = {
      _id: { $id: 'testID' },
    };

    const wso = new WorldstateObject(mock, { timeDate });
    wso.id.should.equal('testID');
  });
});
