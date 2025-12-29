import * as chai from 'chai';

import { Simaris } from '@/models';

const expect = chai.expect;

const locale = 'en';

describe('Simaris', function () {
  describe('#constructor()', function () {
    it('should default to empty data', () => {
      expect(() => {
        new Simaris(undefined, { locale });
      }).to.not.throw();
      expect(() => {
        new Simaris();
      }).to.not.throw();
      expect(() => {
        new Simaris({} as unknown as undefined);
      }).to.not.throw();
    });
  });
});
