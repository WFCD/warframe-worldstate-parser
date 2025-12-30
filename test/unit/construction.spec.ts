import * as chai from 'chai';

import { ConstructionProgress } from '@/models/ConstructionProgress';

const expect = chai.expect;

const ProjectPct = [3.0047668038409, 104.39419581619, 0];

describe('Construction', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new ConstructionProgress(undefined as unknown as number[]);
      }).to.throw(TypeError);
      expect(() => {
        new ConstructionProgress(['42'] as unknown as number[]);
      }).to.throw(TypeError);
    });

    it('should handle 0s', () => {
      expect(() => {
        new ConstructionProgress([0, 0, 0]);
      }).to.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly', () => {
      const c = new ConstructionProgress(ProjectPct);
      expect(c.fomorianProgress).to.match(/3\.00/);
      expect(c.razorbackProgress).to.match(/104\.39/);
    });
  });
});
