import chai from 'chai';

import Simaris from '../../lib/models/Simaris.js';

chai.should();

const locale = 'en';

describe('Simaris', function () {
  describe('#constructor()', function () {
    it('should default to empty data', () => {
      (() => {
        new Simaris(undefined, { locale });
      }).should.not.throw();
      (() => {
        new Simaris();
      }).should.not.throw();
      (() => {
        new Simaris({});
      }).should.not.throw();
    });
  });
});
