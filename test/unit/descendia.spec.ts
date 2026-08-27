import * as chai from 'chai';

import { Descendia, type RawDescent } from '@/models';
import data from '@/data/Descendia.json' with { type: 'json' };

const expect = chai.expect;

describe('Descendia', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no argument or an invalid argument', function () {
      expect(() => {
        new Descendia(undefined as unknown as RawDescent);
      }).to.throw(TypeError);
      expect(() => {
        new Descendia({} as unknown as RawDescent);
      }).to.throw(TypeError);
      expect(() => {
        new Descendia({
          Activation: { $date: { $numberLong: '1787529600000' } },
          Expiry: { $date: { $numberLong: '1788134400000' } },
        } as unknown as RawDescent);
      }).to.throw(TypeError);
    });

    it('should parse live-shaped descent data', () => {
      const descendia = new Descendia(data as RawDescent);

      expect(descendia.seed).to.equal(data.RandSeed);
      expect(descendia.challenges).to.have.length(21);
      expect(descendia.challenges[0].index).to.equal(1);
      expect(descendia.challenges[0].typeKey).to.equal(data.Challenges[0].Type);
      expect(descendia.challenges[0].challengeKey).to.equal(
        data.Challenges[0].Challenge
      );
      expect(descendia.challenges[0].levelUniqueName).to.equal(
        data.Challenges[0].Level
      );
      expect(descendia.challenges[0].auras[0].uniqueName).to.equal(
        data.Challenges[0].Auras[0]
      );
      expect(descendia.challenges[20].challengeKey).to.equal('Devil');
      expect(descendia.challenges[20].typeKey).to.equal('DT_PROTOFRAME');
    });
  });
});
