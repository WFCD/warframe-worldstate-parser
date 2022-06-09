'use strict';

const chai = require('chai');
const ZarimanCycle = require('../../lib/ZarimanCycle');
const timeDate = require('../mocks/timeDate');
const MarkdownSettings = require('../../lib/supporting/MarkdownSettings');

const should = chai.should();
const mdConfig = new MarkdownSettings();
// this is a confirmed corpus cycle time
// the zariman cycle logic depends on the current time
const confirmedCorpus = 1654725600001;

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
      // 14400000 is 4 hours in millis, by adding 4 hours, it should show
      // a grineer cycle
      const cycle = new ZarimanCycle(new Date(confirmedCorpus + 14400000), {
        timeDate,
        mdConfig,
      });
      cycle.toString().should.include('occupied by grineer');
    });
  });
});
