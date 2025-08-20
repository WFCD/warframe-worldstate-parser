import * as chai from 'chai';

import CetusCycle from '../../lib/models/CetusCycle';

const should = chai.should();

describe('CambionCycle', function () {
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

      const expiry = cycle.getExpired();
      should.equal(expiry, true);
    });

    it('should allow active', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000));

      const expiry = cycle.getExpired();
      should.equal(expiry, false);

      cycle.toString().should.include('Operator, Cetus is currently in nighttime');
    });

    it('should allow show a night string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000));

      cycle.toString().should.include('Operator, Cetus is currently in nighttime');
    });

    it('should allow show a day string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 30000000));

      cycle.toString().should.include('Operator, Cetus is currently in daytime');
      cycle.shortString.should.include('to Night');
    });
  });
});
