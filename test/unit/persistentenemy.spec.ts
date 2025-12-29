import * as chai from 'chai';

import { PersistentEnemy, type RawPersistentEnemy } from '@/models';

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
