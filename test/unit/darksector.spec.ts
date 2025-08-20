import * as chai from 'chai';

import DarkSector, { RawDarkSector } from '../../lib/models/DarkSector';

chai.should();
describe('DarkSector', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new DarkSector(undefined as unknown as RawDarkSector);
      }).should.throw();
      (() => {
        new DarkSector({} as RawDarkSector);
      }).should.throw();
    });
  });
});
