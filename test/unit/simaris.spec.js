import chai from 'chai';
import mdConfig from '../mocks/mdConfig.js';
import * as translator from '../mocks/translation.js';
import Simaris from '../../lib/Simaris.js';

chai.should();
const locale = 'en';

describe('Simaris', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => { new Simaris(); }).should.throw(TypeError);
      (() => { new Simaris({}); }).should.throw(TypeError);
    });

    it('should default to empty data', () => {
      (() => { new Simaris(undefined, { mdConfig, translator, locale }); }).should.not.throw();
    });
  });
});
