import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getItemType, type RawReward, Reward } from '@/models';

const expect = chai.expect;
chai.use(sinonChai);

describe('Reward', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Reward(undefined as unknown as RawReward);
      }).to.throw(TypeError);
      expect(() => {
        new Reward({} as unknown as RawReward);
      }).to.throw(TypeError);
    });
  });
  describe('getItemType', function () {
    it('should categorize the items using the provided functions', function () {
      const types = [
        {
          name: 'type1',
          description: 'test1',
          test: sinon.stub().returns(false),
          thumbnail: '',
          color: 0,
        },
        {
          name: 'type2',
          description: 'test2',
          test: sinon.stub().returns(true),
          thumbnail: '',
          color: 0,
        },
      ];
      expect(getItemType('test', types)).to.equal('type2');
      types.forEach((t) => {
        expect(t.test).to.have.been.called;
      });
    });
  });
});
