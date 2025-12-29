import * as chai from 'chai';

import { DarkSector, type RawDarkSector } from '@/models';

const expect = chai.expect;
describe('DarkSector', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new DarkSector(undefined as unknown as RawDarkSector);
      }).to.throw();
      expect(() => {
        new DarkSector({} as RawDarkSector);
      }).to.throw();
    });
  });
});
