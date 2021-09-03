'use strict';

const chai = require('chai');

chai.should();

const Alert = require('../../lib/Alert');
const Mission = require('../../lib/Mission');
const Alerts = require('../data/Alerts.json');

const translator = require('../mocks/translation');
const timeDate = require('../mocks/timeDate');
const MarkdownSettings = require('../../lib/supporting/MarkdownSettings');

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
