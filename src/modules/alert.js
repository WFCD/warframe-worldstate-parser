var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var Reward = require('../lib/reward.js');
var Mission = require('../lib/mission.js');

var strings = require(dsUtil.stringsPath);
var solNodes = require('../resources/solNodes.json');
var missionTypes = require('../resources/missionTypes.json');
var factions = require('../resources/factionsData.json');

var Alerts = function(data) {
  this.alerts = [];
  for (var index = 0; index < data.length; index++){
    this.alerts.push(new Alert(data[index]));
  }
}

Alerts.prototype.getAll = function() {
  return this.alerts;
}

Alerts.prototype.getAllString = function() {
  var allString = '';
  for(var alert in this.alerts){
    allString += alert.toString();
  }
  return allString;
}

/** Create a new alert instance
 *
 * @constructor
 * @param {object} data Alert data
 */
var Alert = function(data) {
  this.id = data.id;
  this.activation = new Date(1000 * data.Activation.sec);
  this.expiry = new Date(1000 * data.Expiry.sec);
  this.mission = new Mission(data.MissionInfo);
  this.desctiption = this.mission.getDescription();
  this.reward = this.mission.getReward();
}

/**
 * Return a string representation of this alert object
 *
 * @return {string} The new string object
 */
Alert.prototype.toString = function() {
  var alertString = util.format('%s%s%s' +
                                '%s (%s)%s' +
                                '%s%s' +
                                'level %d - %d%s' +
                                'Expires in %s%s',
                                md.codeMulti, this.mission.getLocation(), md.lineEnd,
                                this.mission.getMissionType(), this.reward.getFaction(), md.lineEnd,
                                this.reward.toString(), md.lineEnd,
                                this.mission.getMinEnemyLevel(), this.mission.getMaxEnemyLevel(), md.lineEnd,
                                this.getETAString(), md.blockEnd);

  return alertString;
}

/**
 * Return a string containing the alert's ETA
 *
 * @return {string} The new string object
 */
Alert.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

/**
 * Returns an array of strings each representing a reward type
 * Empty for credit only alerts
 *
 * @return {array} The reward type array
 */
Alert.prototype.getRewardTypes = function() {
  return this.reward.getTypes();
}

/** Returns true if the alert has expired, false otherwise
 *
 * @return {boolean} Expired-ness of the alert
 */
Alert.prototype.isExpired = function() {
  return this.expiry.getTime() < Date.now();
}

module.exports = Alerts;