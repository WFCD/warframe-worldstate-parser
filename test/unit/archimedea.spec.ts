import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { Archimedea, type RawArchimedea } from '@/models';
import Conquest from '@/data/Conquest.json' with { type: 'json' };

chai.use(sinonChai);

const { expect } = chai;

describe('Archimedea', function () {
  describe('#constructor()', function () {
    it('should be able to handle some raw data', () => {
      const conquest = new Archimedea(Conquest as RawArchimedea);

      expect(conquest.missions[0].missionType).to.equal('Alchemy');
    });
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Archimedea(undefined as unknown as RawArchimedea);
      }).to.throw(TypeError);
      expect(() => {
        new Archimedea({} as unknown as RawArchimedea);
      }).to.throw(TypeError);
    });
  });
});
