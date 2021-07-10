'use strict';

const chai = require('chai');

chai.should();

const VoidTrader = require('../../lib/VoidTrader');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate');

describe('VoidTrader', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new VoidTrader(); }).should.throw(TypeError);
      (() => { new VoidTrader({}); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    it('should format the string correctly according to the data', function () {
      const testData = {
        _id: { $oid: '1234sg' },
        Activation: { sec: 1 },
        Expiry: { sec: 3 },
        Character: 'Baro',
        Manifest: [],
      };
      const translator = {
        node: () => 'node',
      };
      const v = new VoidTrader(testData, { mdConfig, timeDate, translator });

      v.isActive = () => true;
      v.toString().should.contain('Trader at');

      v.isActive = () => false;
      v.toString().should.contain('not here');
    });
  });
});
