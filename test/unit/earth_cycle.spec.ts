import * as chai from 'chai';

import { EarthCycle } from '@/models';

const expect = chai.expect;

describe('EarthCycle', () => {
  describe('#constructor()', () => {
    it('should not throw when called with valid deps', () => {
      expect(() => {
        new EarthCycle();
      }).to.not.throw();
    });
  });
  describe('#getExpired()', () => {
    it('should never be true', () => {
      const cycle = new EarthCycle();
      expect(cycle.expired).to.be.false;
    });
  });
});
