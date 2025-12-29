import * as chai from 'chai';

import { CambionCycle, type CetusCycle } from '@/models';

const should = chai.should();

describe('CambionCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new CambionCycle(undefined as unknown as CetusCycle);
      }).should.throw(TypeError);
      (() => {
        new CambionCycle({} as CetusCycle);
      }).should.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      } as CetusCycle);

      const expiry = cycle.expired;
      should.equal(expiry, true);
    });

    it('should show fass for day', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: true,
      } as CetusCycle);

      should.equal(cycle.state, 'fass');
    });

    it('should show vome for night', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      } as CetusCycle);

      should.equal(cycle.state, 'vome');
    });
  });
});
