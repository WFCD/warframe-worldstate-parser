import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { SentientOutpost } from '@/models';
import type { Dependency } from '@/supporting';

const expect = chai.expect;
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const outpost = new SentientOutpost(554, {
        locale: 'en',
        logger: console,
      });

      expect(outpost.id).to.equal('CrewBattleNode554:true');
      expect(outpost.mission?.node).to.equal('H-2 Cloud (Veil)');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new SentientOutpost(undefined, undefined as unknown as Dependency);
      }).to.throw(TypeError);
      expect(() => {
        new SentientOutpost(
          {} as unknown as string,
          undefined as unknown as Dependency
        );
      }).to.throw(TypeError);
    });
  });
});
