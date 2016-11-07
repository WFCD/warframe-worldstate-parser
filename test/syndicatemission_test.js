'use strict';

const chai = require('chai');

chai.should();

const SyndicateMission = require('../lib/SyndicateMission.js');
const mdConfig = require('./data/markdown.json');

describe('SyndicateMission', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new SyndicateMission(); }).should.throw(TypeError);
      (() => { new SyndicateMission({}); }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    it('should format the string correctly according to the data', function () {
      const testData = {
        _id: { $id: '1234sg' },
        Activation: { sec: 1241 },
        Expiry: { sec: 35156 },
        Tag: 'syndicate',
        Nodes: [],
      };
      const timeDate = {
        timeDeltaToString: () => 'timeDelta',
        fromNow: () => 1234,
      };
      const translator = {
        syndicate: () => 'syndicate',
      };
      const s = new SyndicateMission(testData, { mdConfig, timeDate, translator });

      s.toString().should.contain('No missions');

      s.nodes.push('node');

      s.toString().should.contain('has missions');
    });
  });
});
