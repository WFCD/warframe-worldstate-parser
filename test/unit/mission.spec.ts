import * as chai from 'chai';

import Mission, { type RawMission } from '../../lib/models/Mission.js';
import Alerts from '../data/Alerts.json' with { type: 'json' };

chai.should();

const mockMission = Alerts[0].MissionInfo;

describe('Mission', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new Mission(undefined as unknown as RawMission);
      }).should.throw(TypeError);
      (() => {
        new Mission({} as unknown as RawMission);
      }).should.throw(TypeError);
    });

    it('should not thow with normal data', () => {
      (() => {
        new Mission(mockMission);
      }).should.not.throw();
    });
  });
});
