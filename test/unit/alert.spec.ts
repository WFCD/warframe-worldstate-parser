import * as chai from 'chai';

import { Alert, type RawAlert } from '@/models';
import Alerts from '@/data/Alerts.json' with { type: 'json' };

const { expect } = chai;

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Alert(undefined as unknown as RawAlert);
      }).to.throw(TypeError);
      expect(() => {
        new Alert({} as RawAlert);
      }).to.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      for (const alert of Alerts) {
        expect(() => {
          new Alert(alert, { locale: 'en' });
        }).to.not.throw(TypeError);
      }
    });
  });
});
