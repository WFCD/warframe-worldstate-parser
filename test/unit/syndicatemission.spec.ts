import * as chai from 'chai';

import SyndicateMission, { type RawSyndicateMission } from '../../lib/models/SyndicateMission.js';

chai.should();

describe('SyndicateMission', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      (() => {
        new SyndicateMission(undefined as unknown as RawSyndicateMission);
      }).should.throw(TypeError);
      (() => {
        new SyndicateMission({} as unknown as RawSyndicateMission);
      }).should.throw(TypeError);
    });
  });
});
