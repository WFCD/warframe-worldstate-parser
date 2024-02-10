import chai from 'chai';

import GlobalUpgrade from '../../lib/models/GlobalUpgrade.js';

chai.should();

describe('GlobalUpgrade', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new GlobalUpgrade();
      }).should.throw(TypeError);
      (() => {
        new GlobalUpgrade({});
      }).should.throw(TypeError);
    });
  });
});
