import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Reward, { getItemType, type RawReward } from '../../lib/models/Reward.js';

chai.should();
chai.use(sinonChai);

describe('Reward', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Reward(undefined as unknown as RawReward);
      }).should.throw(TypeError);
      (() => {
        new Reward({} as unknown as RawReward);
      }).should.throw(TypeError);
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
          color: 0
        },
        {
          name: 'type2',
          description: 'test2',
          test: sinon.stub().returns(true),
          thumbnail: '',
          color: 0
        },
      ];
      getItemType('test', types).should.equal('type2');
      types.forEach((t) => {
        t.test.should.have.been.called
      });
    });
  });
});
