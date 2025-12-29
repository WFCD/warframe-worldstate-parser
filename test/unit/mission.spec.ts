import * as chai from 'chai';

import { Mission, type RawMission } from '@/models';
import Alerts from '@/data/Alerts.json' with { type: 'json' };

const expect = chai.expect;

const mockMission = Alerts[0].MissionInfo;

describe('Mission', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      expect(() => {
        new Mission(undefined as unknown as RawMission);
      }).to.throw(TypeError);
      expect(() => {
        new Mission({} as unknown as RawMission);
      }).to.throw(TypeError);
    });

    it('should not throw with normal data', () => {
      expect(() => {
        new Mission(mockMission);
      }).to.not.throw();
    });
  });
});
