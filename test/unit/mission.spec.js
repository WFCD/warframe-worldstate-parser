import * as chai from 'chai';

import Mission from '../../lib/models/Mission.js';
import Alerts from '../data/Alerts.json' with { type: 'json' };

chai.should();

const mockMission = Alerts[0].MissionInfo;

describe('Mission', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => {
        new Mission();
      }).should.throw(TypeError);
      (() => {
        new Mission({});
      }).should.throw(TypeError);
    });

    it('should not thow with normal data', () => {
      (() => {
        new Mission(mockMission);
      }).should.not.throw();
    });
  });
});
