'use strict';

const chai = require('chai');

chai.should();

const Mission = require('../../lib/models/Mission');
const Reward = require('../../lib/models/Reward');

const Alerts = require('../data/Alerts.json');
const mdConfig = require('../data/markdown.json');
const translation = require('../mocks/translation');

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
        new Mission(mockMission, {
          mdConfig,
          translator: translation,
          Reward,
          locale: 'en',
        });
      }).should.not.throw();
    });
  });
});
