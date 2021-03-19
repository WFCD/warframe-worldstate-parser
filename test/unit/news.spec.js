'use strict';

const chai = require('chai');

chai.should();

const News = require('../../lib/News.js');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate.js');

const testData = require('../data/News.json');
const realTestData = require('../data/RealNews.json');

const locale = 'en';

const translator = {
  node: () => 'node',
};

describe('News', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => { new News(); }).should.throw(TypeError);
      (() => { new News({}); }).should.throw(TypeError);
    });
  });

  describe('#getETAString()', () => {
    it('should format the string correctly according to the data', () => {
      const n = new News(testData, {
        mdConfig, timeDate, translator, locale,
      });

      n.toString().should.contain('ago');

      n.endDate = new Date(123);

      n.toString().should.contain('in');
    });
  });

  describe('#isUpdate()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, {
        mdConfig, timeDate, translator, locale,
      });
      n.isUpdate().should.be.false;
      n.link = `${testData.Prop}update-1960`;
      n.isUpdate().should.be.true;
      n.message = `${testData.Prop}hotfix-1961`;
      n.isUpdate().should.be.true;
    });
  });

  describe('#isStream()', () => {
    it('should return true if the message indicates a stream', () => {
      const n = new News(realTestData[1], {
        mdConfig, timeDate, translator, locale,
      });
      n.isStream().should.be.true;
    });
  });

  describe('.link', () => {
    it('should resolve a url from Links if Prop is empty', () => {
      const n = new News(realTestData[1], {
        mdConfig, timeDate, translator, locale,
      });
      n.link.should.not.be.empty;
    });
  });

  describe('#isPrimeAccess()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, {
        mdConfig, timeDate, translator, locale,
      });
      n.isPrimeAccess().should.be.false;
      n.link = `${testData.Prop}valkyr-prime-access`;
      n.isPrimeAccess().should.be.true;
    });
  });

  describe('#getTitle()', () => {
    it('should return the original message when no translations are present', () => {
      const n = new News(testData, { mdConfig, timeDate, translator });
      n.getTitle('en').should.equal('test');
    });

    it('should return the localized message when a translation is present', () => {
      const n = new News(realTestData[0], {
        mdConfig, timeDate, translator, locale,
      });
      n.getTitle('en').should.equal('Oberon Prime & Nekros Prime Are Back!');
      n.getTitle('zh').should.equal('Oberon Prime & Nekros Prime 回来了！');
    });
  });
});
