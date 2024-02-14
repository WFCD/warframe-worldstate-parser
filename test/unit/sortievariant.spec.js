import * as chai from 'chai';

import SortieVariant from '../../lib/models/SortieVariant.js';

chai.should();

describe('SortieVariant', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new SortieVariant();
      }).should.throw(TypeError);
      (() => {
        new SortieVariant({});
      }).should.throw(TypeError);
    });
  });
});
