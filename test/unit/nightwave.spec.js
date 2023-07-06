'use strict';

const chai = require('chai');

chai.should();

const { expect } = require('chai');
const Nightwave = require('../../lib/models/Nightwave');
const mdConfig = require('../data/markdown.json');
const nwdata = require('../data/Nightwave.json');

const translator = require('../../lib/utilities/translation');
const timeDate = require('../../lib/utilities/timeDate');

const deps = {
  translator,
  timeDate,
  locale: 'en',
  mdConfig,
};

describe('Nightwave', () => {
  describe('#constructor', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Nightwave();
      }).should.throw(TypeError);
      (() => {
        new Nightwave({});
      }).should.throw(TypeError);
    });
    it('should parse nightwave data', () => {
      (() => {
        new Nightwave(nwdata, deps);
      }).should.not.throw();
    });
    it('isDaily should be present', () => {
      (() => {
        const n = new Nightwave(nwdata, deps);
        const challenges = n.possibleChallenges.concat(n.activeChallenges);
        challenges.forEach((e) => expect(typeof e.isDaily !== 'undefined').to.be.true);
      }).should.not.throw();
    });
  });
});
