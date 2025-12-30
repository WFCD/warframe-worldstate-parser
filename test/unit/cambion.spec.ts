import * as chai from 'chai';

import { CambionCycle, type CetusCycle } from '@/models';

const expect = chai.expect;

describe('CambionCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new CambionCycle(undefined as unknown as CetusCycle);
      }).to.throw(TypeError);
      expect(() => {
        new CambionCycle({} as CetusCycle);
      }).to.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      } as CetusCycle);

      const expiry = cycle.expired;
      expect(expiry).to.equal(true);
    });

    it('should show fass for day', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: true,
      } as CetusCycle);

      expect(cycle.state).to.equal('fass');
    });

    it('should show vome for night', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      } as CetusCycle);

      expect(cycle.state).to.equal('vome');
    });
  });
});
