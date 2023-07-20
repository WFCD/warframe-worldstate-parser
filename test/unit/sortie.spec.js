'use strict';

const chai = require('chai');

chai.should();

const Sortie = require('../../lib/models/Sortie');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate');

describe('Sortie', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Sortie();
      }).should.throw(TypeError);
      (() => {
        new Sortie({});
      }).should.throw(TypeError);
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
    const translator = {
      languageString: (s) => s,
      sortieBoss: (s) => s,
      sortieFaction: (s) => s,
    };
    it('should format the string correctly according to the data', function () {
      timeDate.fromNow = () => -1;

      const s = new Sortie(testData, { mdConfig, timeDate, translator });
      s.toString().should.contain('no sortie');

      timeDate.fromNow = () => 1;

      s.toString().should.contain('ends in');

      s.getFaction().should.equal('theBoss');
    });
  });
});
