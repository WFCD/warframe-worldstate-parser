import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import DeepArchidemea, { RawArchimedea } from '../../lib/models/Archidemea';
import deepData from '../data/DeepArchimedea.json' with { type: 'json' };
import temporalData from '../data/TemporalArchimedea.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('Archimedea', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const now = new Date();
      const deep = new DeepArchidemea(now, now, deepData);
      const temporal = new DeepArchidemea(now, now, temporalData);

      deep.missions[0].mission.should.equal('Extermination');
      temporal.missions[0].mission.should.equal('Extermination');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new DeepArchidemea(undefined as unknown as Date, undefined as unknown as Date,undefined as unknown as RawArchimedea);
      }).should.throw(TypeError);
      (() => {
        new DeepArchidemea({} as unknown as Date, {} as unknown as Date,{} as unknown as RawArchimedea);
      }).should.throw(TypeError);
    });
  });
});
