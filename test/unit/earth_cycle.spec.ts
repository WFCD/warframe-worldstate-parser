import * as chai from 'chai';

import EarthCycle from '../../lib/models/EarthCycle';

chai.should();

describe('EarthCycle', () => {
  describe('#constructor()', () => {
    it('should not throw when called with valid deps', () => {
      (() => {
        new EarthCycle();
      }).should.not.throw();
    });
  });
  describe('#getExpired()', () => {
    it('should never be true', () => {
      const cycle = new EarthCycle();
      cycle.expired.should.be.false;
    });
  });
});
