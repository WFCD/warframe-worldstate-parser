import * as chai from 'chai';

import PersistentEnemy, { RawPersistentEnemy } from '../../lib/models/PersistentEnemy.js';

chai.should();

describe('PersistentEnemy', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new PersistentEnemy(undefined as unknown as RawPersistentEnemy);
      }).should.throw(TypeError);
      (() => {
        new PersistentEnemy({} as unknown as RawPersistentEnemy);
      }).should.throw(TypeError);
    });
  });
});
