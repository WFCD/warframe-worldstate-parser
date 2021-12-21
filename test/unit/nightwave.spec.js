import chai from 'chai';
import Nightwave from '../../lib/Nightwave.js';
import mdConfig from '../mocks/mdConfig.js';
import * as translator from '../mocks/translation.js';
import timeDate from '../mocks/timeDate.js';

import nwdata from '../data/Nightwave.json' assert { type: 'json' };

chai.should();

const deps = {
  translator,
  timeDate,
  locale: 'en',
  mdConfig,
};

describe('Nightwave', () => {
  describe('#constructor', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => { new Nightwave(); }).should.throw(TypeError);
      (() => { new Nightwave({}); }).should.throw(TypeError);
    });
    it('should parse nightwave data', () => {
      (() => { new Nightwave(nwdata, deps); }).should.not.throw();
    });
  });
});
