import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { Calendar, type RawCalender } from '@/models';
import data from '@/data/Calendar.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const calendar = new Calendar(data);

      calendar.season.should.equal('Winter');
      calendar.days[0].events[0].challenge!.description.should.equal(
        'Kill 10 Eximus'
      );
      calendar.days[1].events[0].upgrade!.title.should.equal('Heavy Mags');
      calendar.days[4].events[0].reward!.should.equal(
        'Exilus Weapon Adapter Blueprint'
      );
      calendar.days[0].date.should.equal('1999-01-06T00:00:00.000Z');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Calendar(undefined as unknown as RawCalender);
      }).should.throw(TypeError);
      (() => {
        new Calendar({} as RawCalender);
      }).should.throw(TypeError);
    });
  });
});
