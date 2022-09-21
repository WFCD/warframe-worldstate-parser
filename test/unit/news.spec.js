'use strict';

const chai = require('chai');

chai.should();

const News = require('../../lib/News');
const mdConfig = require('../data/markdown.json');
const timeDate = require('../mocks/timeDate');

const testData = require('../data/News.json');
const realTestData = require('../data/RealNews.json');
const languageTestData = require('../data/LanguageNews.json');

const locale = 'en';
const translator = require('../../lib/translation');

describe('News', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new News();
      }).should.throw(TypeError);
      (() => {
        new News({});
      }).should.throw(TypeError);
    });
  });

  describe('#getETAString()', () => {
    it('should format the string correctly according to the data', () => {
      const n = new News(testData, {
        mdConfig,
        timeDate,
        translator,
        locale,
      });

      n.toString().should.contain('ago');
      n.endDate = new Date(123);
      n.toString().should.contain('in');
    });
  });

  describe('#isUpdate()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, {
        mdConfig,
        timeDate,
        translator,
        locale,
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
        mdConfig,
        timeDate,
        translator,
        locale,
      });
      n.isStream().should.be.true;
    });
  });

  describe('.link', () => {
    it('should resolve a url from Links if Prop is empty', () => {
      const n = new News(realTestData[1], {
        mdConfig,
        timeDate,
        translator,
        locale,
      });
      n.link.should.not.be.empty;
    });
    it('should default link if none matching is found', () => {
      const n = new News(
        {
          _id: {
            $oid: '5e42fe4010c8e45f053e6d41',
          },
          Messages: [
            {
              LanguageCode: 'tc',
              Message: 'Oberon Prime & Nekros Prime 凱旋回歸了！',
            },
          ],
          Links: [
            {
              LanguageCode: 'tc',
              Link: 'https://forums.warframe.com/topic/1253647-community-stream-schedule-march-22-26/?utm_medium=in-game&utm_source=in-game&utm_campaign=2021-03-Community-Streams',
            },
          ],
          Date: {
            $date: {
              $numberLong: '1581448380000',
            },
          },
          EventStartDate: {
            $date: {
              $numberLong: '1581448380000',
            },
          },
          EventEndDate: {
            $date: {
              $numberLong: '1581448380000',
            },
          },
          ImageUrl: 'https://n9e5v4d8.ssl.hwcdn.net/uploads/d933d8519ba49d5dab9636adeebeca84.jpg',
          Priority: false,
          MobileOnly: false,
        },
        {
          mdConfig,
          timeDate,
          translator,
          locale: 'en',
        }
      );
      n.link.should.not.be.empty;
      n.link.should.equal('https://www.warframe.com/');
    });
  });

  describe('#isPrimeAccess()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, {
        mdConfig,
        timeDate,
        translator,
        locale,
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

    it('Should return a lang when a lang is supplied', () => {
      const n = new News(languageTestData, { mdConfig, timeDate, translator });
      n.getTitle('en').should.equal('/Lotus/Language/test/test');
    });

    it('should return the localized message when a translation is present', () => {
      const n = new News(realTestData[0], {
        mdConfig,
        timeDate,
        translator,
        locale,
      });
      n.getTitle('en').should.equal('Oberon Prime & Nekros Prime Are Back!');
      n.getTitle('zh').should.equal('Oberon Prime & Nekros Prime 回来了！');
    });
  });
});
