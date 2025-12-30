import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { Calendar, type RawCalender } from '@/models';
import data from '@/data/Calendar.json' with { type: 'json' };

const expect = chai.expect;
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const calendar = new Calendar(data);

      expect(calendar.season).to.equal('Winter');
      expect(calendar.days[0].events[0].challenge!.description).to.equal(
        'Kill 10 Eximus'
      );
      expect(calendar.days[1].events[0].upgrade!.title).to.equal('Heavy Mags');
      expect(calendar.days[4].events[0].reward!).to.equal(
        'Exilus Weapon Adapter Blueprint'
      );
      expect(calendar.days[0].date).to.equal('1999-01-06T00:00:00.000Z');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Calendar(undefined as unknown as RawCalender);
      }).to.throw(TypeError);
      expect(() => {
        new Calendar({} as RawCalender);
      }).to.throw(TypeError);
    });
  });
});
