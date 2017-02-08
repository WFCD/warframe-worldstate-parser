'use strict';

const chai = require('chai');

chai.should();

const News = require('../lib/News.js');
const mdConfig = require('./data/markdown.json');
const timeDate = require('./mocks/timeDate.js');

const testData = {
  _id: { $oid: '1234sg' },
  Activation: { sec: 1 },
  Expiry: { sec: 3 },
  Messages: [{ Message: 'test' }],
  Date: { sec: 1000 },
  Prop: 'https://forums.warframe.com/',
};
const translator = {
  node: () => 'node',
};

describe('News', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new News(); }).should.throw(TypeError);
      (() => { new News({}); }).should.throw(TypeError);
    });
  });

  describe('#getETAString()', function () {
    it('should format the string correctly according to the data', function () {
      const n = new News(testData, { mdConfig, timeDate, translator });

      n.toString().should.contain('ago');

      n.endDate = new Date(123);

      n.toString().should.contain('in');
    });
  });

  describe('#isUpdate()', function () {
    it('should return true if the news is an update or a hotfix', function () {
      const n = new News(testData, { mdConfig, timeDate, translator });
      n.isUpdate().should.be.false;
      n.link = `${testData.Prop}update-1960`;
      n.isUpdate().should.be.true;
      n.message = `${testData.Prop}hotfix-1961`;
      n.isUpdate().should.be.true;
    });
  });

  describe('#isPrimeAccess()', function () {
    it('should return true if the news is an update or a hotfix', function () {
      const n = new News(testData, { mdConfig, timeDate, translator });
      n.isPrimeAccess().should.be.false;
      n.link = `${testData.Prop}valkyr-prime-access`;
      n.isPrimeAccess().should.be.true;
    });
  });
});
