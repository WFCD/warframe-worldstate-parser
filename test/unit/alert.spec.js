'use strict';

const chai = require('chai');
const mdConfig = require('node-md-config');

chai.should();

const Alert = require('../../lib/Alert');
const Mission = require('../../lib/Mission');
const Alerts = require('../data/Alerts');

const translator = require('../mocks/translation');
const timeDate = require('../mocks/timeDate');

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
