import * as chai from 'chai';

import { type RawSyndicateMission, SyndicateMission } from '@/models';

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
