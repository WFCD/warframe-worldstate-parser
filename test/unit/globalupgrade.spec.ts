import * as chai from 'chai';

import { GlobalUpgrade, type RawGlobalUpgrade } from '@/models';

chai.should();

describe('GlobalUpgrade', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new GlobalUpgrade(undefined as unknown as RawGlobalUpgrade);
      }).should.throw(TypeError);
      (() => {
        new GlobalUpgrade({} as unknown as RawGlobalUpgrade);
      }).should.throw(TypeError);
    });
  });
});
