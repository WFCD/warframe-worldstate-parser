import chai from 'chai';

import Sortie from '../../lib/models/Sortie.js';

chai.should();

describe('Sortie', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Sortie();
      }).should.throw(TypeError);
      (() => {
        new Sortie({});
      }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    const testData = {
      _id: { $oid: '1235sdgas' },
      Activation: { sec: 1000 },
      Expiry: { sec: 123124 },
      Variants: [],
      Boss: 'SORTIE_BOSS_CORRUPTED_VOR',
    };
    it('should format the string correctly according to the data', function () {
      let s = new Sortie(testData);
      s.toString().should.contain('no sortie');

      testData.Expiry.sec = 1000000000000;
      s = new Sortie(testData);
      s.toString().should.contain('ends in');
      s.getFaction().should.equal('Corrupted');
    });
  });
});
