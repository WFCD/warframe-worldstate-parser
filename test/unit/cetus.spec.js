'use strict';

const chai = require('chai');
const CetusCycle = require('../../lib/CetusCycle');
const timeDate = require('../mocks/timeDate');
const MarkdownSettings = require('../../lib/supporting/MarkdownSettings');

const should = chai.should();
const mdConfig = new MarkdownSettings();

describe('CambionCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => { new CetusCycle(); }).should.throw(TypeError);
      (() => { new CetusCycle({}); }).should.throw(TypeError);
    });

    it('should allow expired', () => {
      const cycle = new CetusCycle(new Date(0), {
        timeDate, mdConfig,
      });

      const expiry = cycle.getExpired();
      should.equal(expiry, true);
    });

    it('should allow active', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000), {
        timeDate, mdConfig,
      });

      const expiry = cycle.getExpired();
      should.equal(expiry, false);

      cycle.toString().should.include('Operator, Cetus is currently in nighttime');
    });

    it('should allow show a night string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 75000), {
        timeDate, mdConfig,
      });

      cycle.toString().should.include('Operator, Cetus is currently in nighttime');
    });

    it('should allow show a day string', () => {
      const cycle = new CetusCycle(new Date(Date.now() + 30000000), {
        timeDate, mdConfig,
      });

      cycle.toString().should.include('Operator, Cetus is currently in daytime');
      cycle.shortString.should.include('to Night');
    });
  });
});
