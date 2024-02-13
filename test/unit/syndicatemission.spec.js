import * as chai from 'chai';

import SyndicateMission from '../../lib/models/SyndicateMission.js';

chai.should();

describe('SyndicateMission', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new SyndicateMission();
      }).should.throw(TypeError);
      (() => {
        new SyndicateMission({});
      }).should.throw(TypeError);
    });
  });

  describe('#toString()', function () {
    it('should format the string correctly according to the data', function () {
      const testData = {
        _id: { $oid: '1234sg' },
        Activation: { sec: 1241 },
        Expiry: { sec: 35156 },
        Tag: 'syndicate',
        Nodes: [],
      };
      const s = new SyndicateMission(testData);

      s.toString().should.contain('No missions');

      s.nodes.push('node');

      s.toString().should.contain('has missions');
    });
  });
});
