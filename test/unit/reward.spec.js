import * as chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Reward, { getItemType } from '../../lib/models/Reward.js';

chai.should();
chai.use(sinonChai);

describe('Reward', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Reward();
      }).should.throw(TypeError);
      (() => {
        new Reward({});
      }).should.throw(TypeError);
    });
  });
  describe('#toString()', function () {
    it('should only include credits if the reward has any', function () {
      const translator = { languageString: (s) => s };
      const r = new Reward({ items: [], countedItems: [] }, { translator });
      r.toString().should.not.match(/cr/);

      r.credits = 100;
      r.toString().should.match(/cr/);
    });
  });
  describe('getItemType', function () {
    it('should categorize the items using the provided functions', function () {
      const types = [
        {
          name: 'type1',
          description: 'test1',
          test: sinon.stub().returns(false),
        },
        {
          name: 'type2',
          description: 'test2',
          test: sinon.stub().returns(true),
        },
      ];
      getItemType('test', types).should.equal('type2');
      types.forEach((t) => t.test.should.have.been.called);
    });
  });
});
