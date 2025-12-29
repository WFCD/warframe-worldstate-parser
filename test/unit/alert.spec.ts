import * as chai from 'chai';

import { Alert, type RawAlert } from '@/models';
import Alerts from '@/data/Alerts.json' with { type: 'json' };

chai.should();

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Alert(undefined as unknown as RawAlert);
      }).should.throw(TypeError);
      (() => {
        new Alert({} as RawAlert);
      }).should.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      for (const alert of Alerts) {
        (() => {
          new Alert(alert, { locale: 'en' });
        }).should.not.throw(TypeError);
      }
    });
  });
});
