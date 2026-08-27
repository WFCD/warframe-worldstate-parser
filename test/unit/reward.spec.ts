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

    it('should fold items into countedItems with count 1 and uniqueName', function () {
      const itemPath =
        '/Lotus/StoreItems/Upgrades/Skins/Events/InfQuantaInfestedAladV';
      const countedPath = '/Lotus/StoreItems/Types/Items/MiscItems/Kuva';
      const reward = new Reward({
        items: [itemPath],
        countedItems: [{ ItemType: countedPath, ItemCount: 5 }],
        credits: 100,
      });

      expect(reward.items).to.have.length(1);
      expect(reward.countedItems).to.have.length(2);
      expect(reward.countedItems[0]).to.include({
        uniqueName: itemPath,
        count: 1,
      });
      expect(reward.countedItems[1]).to.include({
        uniqueName: countedPath,
        count: 5,
      });
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
