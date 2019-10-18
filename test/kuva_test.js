'use strict';

const chai = require('chai');

chai.should();

const Kuva = require('../lib/Kuva.js');

const real = new Kuva({ translator: { nodeMissionType: () => {} }, locale: 'en' });

describe('Kuva', () => {
  describe('#constructor()', () => {
    afterEach(() => {
      real.cache.stopUpdating();
    });

    it('should throw TypeError when called with no argument', () => {
      (() => { new Kuva(); }).should.throw(TypeError);
    });

    it('should have real data', () => {
      (() => {
        real.should.be.an('object').that.has.all.keys('kuva', 'arbitration');
        real.kuva.should.be.an('array');
        real.arbitration.should.be.an('object');
      });
    });
  });
});
