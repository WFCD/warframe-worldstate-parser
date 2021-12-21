import chai from 'chai';
import Fissure from '../../lib/Fissure.js';

chai.should();

describe('Fissure', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => { new Fissure(); }).should.throw(TypeError);
      (() => { new Fissure({}); }).should.throw(TypeError);
    });
  });
});
