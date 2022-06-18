'use strict';

const chai = require('chai');
const ZarimanCycle = require('../../lib/ZarimanCycle');
const timeDate = require('../mocks/timeDate');
const MarkdownSettings = require('../../lib/supporting/MarkdownSettings');

const should = chai.should();
const mdConfig = new MarkdownSettings();
// these are confirmed corpus and grineer cycle time
// the zariman cycle logic depends on zariman bounty expiry time
const confirmedCorpus = 1655059552000;
const confirmedGrineer = 1655181672000;

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

    it('should show corpus cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedCorpus), {
        timeDate,
        mdConfig,
      });
      cycle.toString().should.include('occupied by corpus');
    });

    it('should show grineer cycle string', () => {
      const cycle = new ZarimanCycle(new Date(confirmedGrineer), {
        timeDate,
        mdConfig,
      });
      cycle.toString().should.include('occupied by grineer');
    });
  });
});
