import chai from 'chai';

import { createRequire } from 'module';
import Alert from '../../lib/Alert.js';
import Mission from '../../lib/Mission.js';

import * as translator from '../mocks/translation.js';
import timeDate from '../mocks/timeDate.js';
import MarkdownSettings from '../../lib/supporting/MarkdownSettings.js';

chai.should();
const req = createRequire(import.meta.url);
const Alerts = req('../data/Alerts.json');

const mdConfig = new MarkdownSettings();

describe('Alert', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new Alert(); }).should.throw(TypeError);
      (() => { new Alert({}); }).should.throw(TypeError);
    });

    it('should successfully build alert objects when called with real data', () => {
      (() => {
        new Alert(Alerts, {
          Mission, translator, timeDate, mdConfig,
        });
      }).should.throw(TypeError);
    });
  });
});
