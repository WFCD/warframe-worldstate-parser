import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import Archidemea, { type RawArchimedea } from '../../lib/models/Archidemea';
import Conquest from '../data/Conquest.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('Archimedea', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const conquest = new Archidemea(Conquest);

      conquest.missions[0].missionType.should.equal('Alchemy');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Archidemea(undefined as unknown as RawArchimedea);
      }).should.throw(TypeError);
      (() => {
        new Archidemea({} as unknown as RawArchimedea);
      }).should.throw(TypeError);
    });
  });
});
