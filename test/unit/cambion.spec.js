import chai from 'chai';

import CambionCycle from '../../lib/CambionCycle.js';
import timeDate from '../mocks/timeDate.js';

const should = chai.should();
describe('CambionCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new CambionCycle(); }).should.throw(TypeError);
      (() => { new CambionCycle({}); }).should.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      }, {
        timeDate,
      });

      const expiry = cycle.getExpired();
      should.equal(expiry, true);
    });

    it('should show fass for day', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: true,
      }, {
        timeDate,
      });

      should.equal(cycle.active, 'fass');
    });

    it('should show vome for night', () => {
      const cycle = new CambionCycle({
        activation: new Date(0),
        expiry: new Date(0),
        isDay: false,
      }, {
        timeDate,
      });

      should.equal(cycle.active, 'vome');
    });
  });
});
