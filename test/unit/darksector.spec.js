import chai from 'chai';

import DarkSector from '../../lib/models/DarkSector.js';

chai.should();
describe('DarkSector', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new DarkSector();
      }).should.throw();
      (() => {
        new DarkSector({});
      }).should.throw();
    });
  });
});
