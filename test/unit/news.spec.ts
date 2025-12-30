import * as chai from 'chai';

import { News, type RawNews } from '@/models';
import languageTestData from '@/data/LanguageNews.json' with { type: 'json' };
import testData from '@/data/News.json' with { type: 'json' };
import realTestData from '@/data/RealNews.json' with { type: 'json' };

const expect = chai.expect;

const locale = 'en';

describe('News', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      expect(() => {
        new News(undefined as unknown as RawNews);
      }).to.throw(TypeError);
      expect(() => {
        new News({} as unknown as RawNews);
      }).to.throw(TypeError);
    });
  });

  describe('#getETAString()', () => {
    it('should format the string correctly according to the data', () => {
      const n = new News(testData, {
        locale,
      });

      expect(n.eta).to.contain('ago');
      n.expiry = new Date(123);
      expect(n.eta).to.contain('in');
    });
  });

  describe('#isUpdate()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, { locale });

      expect(n.isUpdate()).to.be.false;
      n.link = `${testData.Prop}update-1960`;
      expect(n.isUpdate()).to.be.true;
      n.message = `${testData.Prop}hotfix-1961`;
      expect(n.isUpdate()).to.be.true;
    });
  });

  describe('#isStream()', () => {
    it('should return true if the message indicates a stream', () => {
      const n = new News(realTestData[1], { locale });
      expect(n.isStream()).to.be.true;
    });
  });

  describe('.link', () => {
    it('should resolve a url from Links if Prop is empty', () => {
      const n = new News(realTestData[1], { locale });
      expect(n.link).to.not.be.empty;
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
          Prop: '',
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
          ImageUrl:
            'https://n9e5v4d8.ssl.hwcdn.net/uploads/d933d8519ba49d5dab9636adeebeca84.jpg',
          Priority: false,
          MobileOnly: false,
        },
        {
          locale: 'en',
        }
      );
      expect(n.link).to.not.be.empty;
      expect(n.link).to.equal('https://www.warframe.com/');
    });
  });

  describe('#isPrimeAccess()', () => {
    it('should return true if the news is an update or a hotfix', () => {
      const n = new News(testData, { locale });

      expect(n.isPrimeAccess()).to.be.false;
      n.link = `${testData.Prop}valkyr-prime-access`;
      expect(n.isPrimeAccess()).to.be.true;
    });
  });

  describe('#getTitle()', () => {
    it('should return the original message when no translations are present', () => {
      const n = new News(testData);
      expect(n.getTitle('en')).to.equal('test');
    });

    it('Should return a serilized lang when a lang is supplied', () => {
      const n = new News(languageTestData);
      expect(n.getTitle('en')).to.equal('Test');
    });

    it('should return the localized message when a translation is present', () => {
      const n = new News(realTestData[0], {
        locale,
      });
      expect(n.getTitle('en')).to.equal(
        'Oberon Prime & Nekros Prime Are Back!'
      );
      expect(n.getTitle('zh')).to.equal('Oberon Prime & Nekros Prime 回来了！');
    });
  });
});
