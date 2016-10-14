'use strict';

const chai = require('chai');

chai.should();

const News = require('../lib/News.js');
const mdConfig = require('./data/markdown.json');

describe('News', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new News(); }).should.throw(TypeError);
      (() => { new News({}); }).should.throw(TypeError);
    });
  });

  describe('#getETAString()', function () {
    it('should format the string correctly according to the data', function () {
      const testData = {
        _id: { $id: '1234sg' },
        Activation: { sec: 1 },
        Expiry: { sec: 3 },
        Messages: [{ Message: 'test' }],
        Date: { sec: 1000 },
      };
      const timeDate = {
        timeDeltaToString: () => 'timeDelta',
        fromNow: n => n.getTime() - 2000,
        toNow: n => n.getTime() - 2000,
      };
      const translator = {
        node: () => 'node',
      };
      const n = new News(testData, { mdConfig, timeDate, translator });

      n.toString().should.contain('ago');

      n.endDate = new Date(123);

      n.toString().should.contain('in');
    });
  });
});
