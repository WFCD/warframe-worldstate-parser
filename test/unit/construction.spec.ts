import * as chai from 'chai';

import Construction from '../../lib/models/ConstructionProgress';

chai.should();

const ProjectPct = [3.0047668038409, 104.39419581619, 0];

describe('Construction', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new Construction(undefined as unknown as number[]);
      }).should.throw(TypeError);
      (() => {
        new Construction(['42'] as unknown as number[]);
      }).should.throw(TypeError);
    });

    it('should handle 0s', () => {
      (() => {
        new Construction([0, 0, 0]);
      }).should.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly', () => {
      const c = new Construction(ProjectPct);
      c.fomorianProgress.should.match(/3\.00/);
      c.razorbackProgress.should.match(/104\.39/);
    });
  });
});
