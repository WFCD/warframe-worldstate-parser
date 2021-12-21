import chai from 'chai';
import Mission from '../../lib/Mission.js';
import Reward from '../../lib/Reward.js';
import mdConfig from '../mocks/mdConfig.js';
import * as translation from '../mocks/translation.js';
import Alerts from '../data/Alerts.json' assert { type: 'json' };

chai.should();

const mockMission = Alerts[0].MissionInfo;

describe('Mission', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument or an invalid argument', () => {
      (() => { new Mission(); }).should.throw(TypeError);
      (() => { new Mission({}); }).should.throw(TypeError);
    });

    it('should not thow with normal data', () => {
      (() => {
        new Mission(mockMission, {
          mdConfig, translator: translation, Reward, locale: 'en',
        });
      }).should.not.throw();
    });
  });
});
