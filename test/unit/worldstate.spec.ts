import * as chai from 'chai';
import sinon, { type SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';

import { type BaseContentObject, WorldStateObject } from '@/models';

import { type InitialWorldState, parseArray, WorldState } from '@/WorldState';

chai.use(sinonChai);

const { expect } = chai;

describe('WorldState', () => {
  describe('#constructor()', () => {
    it('requires one string argument', () => {
      expect(() => {
        new WorldState(undefined as unknown as InitialWorldState);
      }).to.throw(TypeError);
    });
    it('requires valid JSON', () => {
      expect(() => {
        new WorldState(JSON.parse('{'));
      }).to.throw(SyntaxError);
    });
    it('requires a valid WorldState', () => {
      expect(() => {
        new WorldState({} as unknown as InitialWorldState);
      }).to.throw(TypeError);
    });
  });
  describe('parseArray()', () => {
    it('uses the provided class to parse each element of the array', () => {
      const spy: SinonSpy = sinon.spy();
      const testArray = ['test'];

      // @ts-expect-error kinda annoying, but no good way to give it a proper type here
      parseArray(spy, testArray, { locale: 'en' });
      expect(spy).to.have.been.calledWithNew;
      expect(spy).to.have.been.calledWith(testArray[0]);
    });
  });
});

describe('WorldStateObject', () => {
  describe('#constructor()', () => {
    it('requires some data', () => {
      expect(() => {
        new WorldStateObject(undefined as unknown as BaseContentObject);
      }).to.throw();
    });
  });

  it('should make the end string correctly', () => {
    const mock = {
      _id: { $id: 'testID' },
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

    const wso = new WorldStateObject(mock);
    expect(wso.endString).to.exist;
  });

  it('should honor _id.$id', () => {
    const mock = {
      _id: { $id: 'testID' },
    };

    const wso = new WorldStateObject(mock);
    expect(wso.id).to.equal('testID');
  });
});
