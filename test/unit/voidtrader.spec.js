'use strict';

const chai = require('chai');

chai.should();

const VoidTrader = require('../../lib/models/VoidTrader');
const mdConfig = require('../data/markdown.json');
const VaultTrader = require('../data/VaultTrader.json');

const translator = require('../../lib/utilities/translation');
const timeDate = require('../../lib/utilities/timeDate');

const deps = {
  translator,
  timeDate,
  locale: 'en',
  mdConfig,
};

describe('VoidTrader', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new VoidTrader();
      }).should.throw(TypeError);
      (() => {
        new VoidTrader({});
      }).should.throw(TypeError);
    });
    it('should parse PrimeVaultTrader', () => {
      (() => {
        new VoidTrader(VaultTrader, deps);
      }).should.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly according to the data', () => {
      const testData = {
        _id: { $oid: '1234sg' },
        Activation: { sec: 1 },
        Expiry: { sec: 3 },
        Character: 'Baro',
        Manifest: [],
      };
      const v = new VoidTrader(testData, { mdConfig, timeDate, translator });

      v.isActive = () => true;
      v.toString().should.contain('Trader at');

      v.isActive = () => false;
      v.toString().should.contain('not here');
    });
  });
});
