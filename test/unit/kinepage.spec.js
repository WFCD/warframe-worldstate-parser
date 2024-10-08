import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import Kinepage from '../../lib/models/Kinepage.js';

chai.should();
chai.use(sinonChai);

const data = {
  ts: '1727450100',
  en: 'Amir we talked about this',
  fr: 'Amir, on en a parlé',
  it: 'Amir ne abbiamo già parlato',
  de: 'Amir, wir haben darüber geredet',
  es: 'Amir, ya hablamos de esto',
  pt: 'Amir, já falamos sobre isso',
  ru: 'Амир, мы говорили об этом.',
  pl: 'Amir gadalismy o tym',
  uk: 'Аміре, ми про це говорили',
  tr: 'Amir bunu konuşmuştuk',
  ja: '前にも言ったろAmir',
  zh: '阿米尔，我们讨论过这个问题了',
  ko: '아미르 예전에 얘기 안 했냐',
  tc: '阿米爾，我們談過這個了',
  th: 'Amir we talked about this',
};

describe('Kinepage', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const pager = new Kinepage(data);

      pager.message.should.equal('Amir we talked about this');
    });
    it('should change message based on locale', () => {
      const pager = new Kinepage(data, 'es');

      pager.message.should.equal('Amir, ya hablamos de esto');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        Kinepage();
      }).should.throw(TypeError);
      (() => {
        Kinepage({});
      }).should.throw(TypeError);
    });
  });
});
