import chai from 'chai';
import MarkdownSettings from '../../lib/supporting/MarkdownSettings.js';
import EarthCycle from '../../lib/EarthCycle.js';
import timeDate from '../mocks/timeDate.js';

chai.should();

/* eslint-disable global-require */
const deps = {
  timeDate,
  mdConfig: new MarkdownSettings(),
};

describe('EarthCycle', () => {
  describe('#constructor()', () => {
    it('should not throw when called with valid deps', () => {
      (() => { new EarthCycle(deps); }).should.not.throw();
    });
  });
  describe('#getExpired()', () => {
    it('should never be true', () => {
      const cycle = new EarthCycle(deps);
      cycle.getExpired().should.be.false;
    });
  });
});
