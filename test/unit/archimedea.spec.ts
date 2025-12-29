import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { Archimedea, type RawArchimedea } from '@/models';
import Conquest from '@/data/Conquest.json' with { type: 'json' };

chai.should();
chai.use(sinonChai);

describe('Archimedea', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const conquest = new Archimedea(Conquest as unknown as RawArchimedea);

      conquest.missions[0].missionType.should.equal('Alchemy');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      (() => {
        new Archimedea(undefined as unknown as RawArchimedea);
      }).should.throw(TypeError);
      (() => {
        new Archimedea({} as unknown as RawArchimedea);
      }).should.throw(TypeError);
    });
  });
});
