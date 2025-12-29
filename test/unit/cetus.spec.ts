import * as chai from 'chai';

import { CetusCycle } from '@/models';

const should = chai.should();

describe('CetusCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new CetusCycle(undefined as unknown as Date);
      }).should.throw(TypeError);
      (() => {
        new CetusCycle({} as Date);
      }).should.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CetusCycle(new Date(0));

      const expiry = cycle.expired;
      should.equal(expiry, true);
    });

    it('should allow active', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000));

      const expiry = cycle.expired;
      should.equal(expiry, false);
    });

    it('should allow show a day string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 30000000));
      cycle.shortString.should.include('to Night');
    });
  });
});
