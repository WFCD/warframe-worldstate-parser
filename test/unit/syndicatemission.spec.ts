import * as chai from 'chai';

import { type RawSyndicateMission, SyndicateMission } from '@/models';

const expect = chai.expect;

describe('SyndicateMission', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new SyndicateMission(undefined as unknown as RawSyndicateMission);
      }).to.throw(TypeError);
      expect(() => {
        new SyndicateMission({} as unknown as RawSyndicateMission);
      }).to.throw(TypeError);
    });
  });
});
