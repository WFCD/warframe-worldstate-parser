'use strict';

const chai = require('chai');

chai.should();

const Construction = require('../../lib/ConstructionProgress');
const mdConfig = require('../data/markdown.json');

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
        new Construction();
      }).should.throw(TypeError);
      (() => {
        new Construction({});
      }).should.throw(TypeError);
      /* eslint-enable no-new */
    });

    it('should handle 0s', () => {
      (() => {
        new Construction({ ProjectPct: [0, 0, 0], _id: { $oid: `${Date.now()}${ProjectPct[0]}` } }, { mdConfig });
      }).should.not.throw();
    });
  });

  describe('#toString()', () => {
    it('should format the string correctly', () => {
      const c = new Construction(ProjectPctWithOID, { mdConfig });
      c.toString().should.match(/Razorback: 104\.39%/);
      c.toString().should.match(/Fomorian: 3\.00%/);
      c.toString().should.match(/Unknown: 0\.00%/);
      c.fomorianProgress.should.match(/3\.00/);
      c.razorbackProgress.should.match(/104\.39/);
    });
  });
});
