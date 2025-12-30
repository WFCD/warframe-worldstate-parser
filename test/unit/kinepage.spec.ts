import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { Kinepage } from '@/models';

const expect = chai.expect;
chai.use(sinonChai);

const data = {
  ts: '1727450100',
  en: 'Amir we talked about this',
  es: 'Amir, ya hablamos de esto',
};

describe('Kinepage', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const pager = new Kinepage(data);

      expect(pager.message).to.equal('Amir we talked about this');
    });
    it('should change message based on locale', () => {
      const pager = new Kinepage(data, 'es');

      expect(pager.message).to.equal('Amir, ya hablamos de esto');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Kinepage(undefined as unknown as { [k: string]: string | number });
      }).to.throw(TypeError);
    });
  });
});
