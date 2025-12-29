import * as chai from 'chai';

import { ConstructionProgress } from '@/models/ConstructionProgress';

chai.should();

const ProjectPct = [3.0047668038409, 104.39419581619, 0];

describe('Construction', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new ConstructionProgress(undefined as unknown as number[]);
      }).should.throw(TypeError);
      (() => {
        new ConstructionProgress(['42'] as unknown as number[]);
      }).should.throw(TypeError);
    });

    it('should handle 0s', () => {
      (() => {
        new ConstructionProgress([0, 0, 0]);
      }).should.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly', () => {
      const c = new ConstructionProgress(ProjectPct);
      c.fomorianProgress.should.match(/3\.00/);
      c.razorbackProgress.should.match(/104\.39/);
    });
  });
});
