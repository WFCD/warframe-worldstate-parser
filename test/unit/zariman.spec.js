'use strict';

const chai = require('chai');
const ZarimanCycle = require('../../lib/ZarimanCycle');
const timeDate = require('../mocks/timeDate');
const MarkdownSettings = require('../../lib/supporting/MarkdownSettings');

const should = chai.should();
const mdConfig = new MarkdownSettings();

describe('ZarimanCycle', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new ZarimanCycle();
      }).should.throw(TypeError);
      (() => {
        new ZarimanCycle({});
      }).should.throw(TypeError);
    });

    it('should allow active', () => {
      const cycle = new ZarimanCycle(new Date(Date.now() + 75000), {
        timeDate,
        mdConfig,
      });

      const expiry = cycle.getExpired();
      should.equal(expiry, false);

      cycle.toString().should.include('Operator, Zariman Ten Zero is currently occupied by');
    });

    it('should show a corpus string', () => {
      const cycle = new ZarimanCycle(new Date(1654725600), {
        timeDate,
        mdConfig,
      });

      cycle.toString().should.include('Operator, Zariman Ten Zero is currently occupied by corpus');
    });

    it('should allow show a day string', () => {
      const cycle = new ZarimanCycle(new Date(1654725600 + 14400), {
        timeDate,
        mdConfig,
      });

      cycle.toString().should.include('Operator, Zariman Ten Zero is currently occupied by grineer');
      cycle.shortString.should.include('until corpus takeover');
    });
  });
});