import * as chai from 'chai';

import Construction, { type RawConstructionProgress } from '../../lib/models/ConstructionProgress';

chai.should();

const ProjectPct = [3.0047668038409, 104.39419581619, 0];

const ProjectPctWithOID = {
  ProjectPct,
  _id: {
    $oid: `${Date.now()}${ProjectPct[0]}`,
  },
};

describe('Construction', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      /* eslint-disable no-new */
      (() => {
        new Construction(undefined as unknown as RawConstructionProgress);
      }).should.throw(TypeError);
      (() => {
        new Construction({} as RawConstructionProgress);
      }).should.throw(TypeError);
      /* eslint-enable no-new */
    });

    it('should handle 0s', () => {
      (() => {
        new Construction({ ProjectPct: [0, 0, 0], _id: { $oid: `${Date.now()}${ProjectPct[0]}` } });
      }).should.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly', () => {
      const c = new Construction(ProjectPctWithOID);
      c.fomorianProgress.should.match(/3\.00/);
      c.razorbackProgress.should.match(/104\.39/);
    });
  });
});
