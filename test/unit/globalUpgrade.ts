import * as chai from 'chai';

import { GlobalUpgrade, type RawGlobalUpgrade } from '@/models';
import data from '@/data/GlobalUpgrade.json' with { type: 'json' };

const expect = chai.expect;

describe('GlobalUpgrade', function () {
  describe('#constructor()', function () {
    it('should be able to handle raw data', function () {
      const globalUpgrade = new GlobalUpgrade(data);
      expect(globalUpgrade.expiry).to.not.equal(undefined);
    });
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new GlobalUpgrade(undefined as unknown as RawGlobalUpgrade);
      }).to.throw(TypeError);
    });
  });
});
