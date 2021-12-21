import chai from 'chai';
import PersistentEnemy from '../../lib/PersistentEnemy.js';

chai.should();

describe('PersistentEnemy', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new PersistentEnemy(); }).should.throw(TypeError);
      (() => { new PersistentEnemy({}); }).should.throw(TypeError);
    });
  });
});
