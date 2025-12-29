import * as chai from 'chai';

import { GlobalUpgrade, type RawGlobalUpgrade } from '@/models';

const expect = chai.expect;

describe('GlobalUpgrade', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new GlobalUpgrade(undefined as unknown as RawGlobalUpgrade);
      }).to.throw(TypeError);
      expect(() => {
        new GlobalUpgrade({} as unknown as RawGlobalUpgrade);
      }).to.throw(TypeError);
    });
  });
});
