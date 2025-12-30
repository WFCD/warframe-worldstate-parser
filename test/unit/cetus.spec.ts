import * as chai from 'chai';

import { CetusCycle } from '@/models';

const expect = chai.expect;

describe('CetusCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new CetusCycle(undefined as unknown as Date);
      }).to.throw(TypeError);
      expect(() => {
        new CetusCycle({} as Date);
      }).to.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CetusCycle(new Date(0));
      const expiry = cycle.expired;
      expect(expiry).to.equal(true);
    });

    it('should allow active', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000));
      const expiry = cycle.expired;
      expect(expiry).to.equal(false);
    });

    it('should allow show a day string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 30000000));
      expect(cycle.shortString).to.include('to Night');
    });
  });
});
