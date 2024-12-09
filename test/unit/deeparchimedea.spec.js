import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import DeepArchidemea from '../../lib/models/DeepArchidemea.js';
import data from '../data/DeepArchimedea.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('SentientOutpost', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const archimedea = new DeepArchidemea(Date.now(), Date.now(), data);

      archimedea.missions[0].mission.should.equal('Extermination');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new DeepArchidemea();
      }).should.throw(TypeError);
      (() => {
        new DeepArchidemea({});
      }).should.throw(TypeError);
    });
  });
});
