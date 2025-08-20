import * as chai from 'chai';

import GlobalUpgrade, { RawGlobalUpgrade } from '../../lib/models/GlobalUpgrade.js';

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
