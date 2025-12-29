import * as chai from 'chai';

import { PersistentEnemy, type RawPersistentEnemy } from '@/models';

const expect = chai.expect;

describe('PersistentEnemy', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new PersistentEnemy(undefined as unknown as RawPersistentEnemy);
      }).to.throw(TypeError);
      expect(() => {
        new PersistentEnemy({} as unknown as RawPersistentEnemy);
      }).to.throw(TypeError);
    });
  });
});
