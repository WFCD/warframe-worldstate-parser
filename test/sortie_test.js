'use strict';

const chai = require('chai');

chai.should();

const Sortie = require('../lib/Sortie.js');
const mdConfig = require('./data/markdown.json');

describe('Sortie', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new Sortie(); }).should.throw(TypeError);
      (() => { new Sortie({}); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    const testData = {
      _id: { $oid: '1235sdgas' },
      Activation: { sec: 1000 },
      Expiry: { sec: 123124 },
      Variants: [],
      Boss: 'theBoss',
    };
    const timeDate = {
      fromNow: () => -1,
      timeDeltaToString: () => 'timeDelta',
    };
    const translator = {
      languageString: s => s,
      sortieBoss: s => s,
    };
    it('should format the string correctly according to the data', function () {
      const s = new Sortie(testData, { mdConfig, timeDate, translator });
      console.log(s.toString());
      s.toString().should.contain('no sortie');

      timeDate.fromNow = () => 1;

      s.toString().should.contain('ends in');
    });
  });
});
