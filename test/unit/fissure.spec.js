'use strict';

const chai = require('chai');

chai.should();

const Fissure = require('../../lib/Fissure');

describe('Fissure', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Fissure();
      }).should.throw(TypeError);
      (() => {
        new Fissure({});
      }).should.throw(TypeError);
    });
  });
});
