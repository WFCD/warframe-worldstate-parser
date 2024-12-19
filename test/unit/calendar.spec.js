import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import data from '../data/Calendar.json' with { type: 'json' };
import Calendar from '../../lib/models/Calendar.js';

chai.should();
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const calendar = new Calendar(data);

      calendar.season.should.equal('Winter');
      calendar.days[0].events[0].challenge.description.should.equal('Kill 10 Eximus');
      calendar.days[1].events[0].upgrade.title.should.equal('Heavy Mags');
      calendar.days[4].events[0].reward.should.equal('Exilus Weapon Adapter Blueprint');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Calendar();
      }).should.throw(TypeError);
      (() => {
        new Calendar({});
      }).should.throw(TypeError);
    });
  });
});
