import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import DeepArchidemea from '../../lib/models/DeepArchidemea.js';
import deepData from '../data/DeepArchimedea.json' with { type: 'json' };
import temporalData from '../data/TemporalArchimedea.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('Archimedea', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const deep = new DeepArchidemea(Date.now(), Date.now(), deepData);
      const temporal = new DeepArchidemea(Date.now(), Date.now(), temporalData);

      deep.missions[0].mission.should.equal('Extermination');
      temporal.missions[0].mission.should.equal('Extermination');
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
