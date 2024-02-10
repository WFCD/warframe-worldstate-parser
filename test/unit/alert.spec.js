import chai from 'chai';

import Alert from '../../lib/models/Alert.js';
import Alerts from '../data/Alerts.json' assert { type: 'json' };

chai.should();

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Alert();
      }).should.throw(TypeError);
      (() => {
        new Alert({});
      }).should.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      (() => {
        new Alert(Alerts, {
          locale: 'en',
        });
      }).should.throw(TypeError);
    });
  });
});
