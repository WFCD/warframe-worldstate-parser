var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var Reward = require('../lib/reward.js');

var nodes = require('warframe-worldstate-data').solNodes;
var factions = require('warframe-worldstate-data').factions;
var missionTypes = require('warframe-worldstate-data').missionTypes;

var Invasions = function(data) {
  this.invasions = [];
  for (var index = 0; index < data.length; index++){
    this.invasions.push(new Invasion(data[index]));
  }
}

Invasions.prototype.getAll = function(){
  return this.invasions;
}

Invasions.prototype.toString = function(){
  var invasionsString = '';
  console.log(this.invasions.length)
  for(var invasion in this.invasions){
    invasionsString += this.invasions[invasion].toString();
  }
  if(this.invasions.length < 1){
    invasionsString = md.codeMulti+"There are no invasions"+md.blockEnd;
  }
  return invasionsString;
}
/**
 * Create a new invasion instance
 *
 * @constructor
 * @param {object} data Invasion data
 */
var Invasion = function(data) {
  try{
    this.id = data._id.$id;
    this.node = nodes[data.Node] ? nodes[data.Node].value : data.Node;

    this.faction1 = dsUtil.safeGetLocalized(data.AttackerMissionInfo.faction, factions);
    this.type1 = dsUtil.safeGetLocalized(data.AttackerMissionInfo.missionType, missionTypes);
    this.reward1 = rewardFromString(data.AttackerMissionInfo.missionReward);
    this.minLevel1 = data.AttackerMissionInfo.minEnemyLevel;
    this.maxLevel1 = data.AttackerMissionInfo.maxEnemyLevel;

    this.faction2 = dsUtil.safeGetLocalized(data.DefenderMissionInfo.faction, factions);
    this.type2 = dsUtil.safeGetLocalized(data.DefenderMissionInfo.missionType, missionTypes);
    this.reward2 = rewardFromString(data.DefenderMissionInfo.missionReward);
    this.minLevel2 = data.DefenderMissionInfo.minEnemyLevel;
    this.maxLevel2 = data.DefenderMissionInfo.maxEnemyLevel;

    this.completion = 100*((data.Goal-data.Count)/data.Goal);
    this.ETA = new Date(1000* data.Activation.sec);
    this.desc = dsUtil.getLocalized(data.LocTag);
  }
  catch (err) {
    console.log("Invasion: " + err.message);
  }
}

/**
 * Returns a string representation of this invasion
 *
 * @return {string} This invasion in string format
 */
Invasion.prototype.toString = function() {
  var infestReg = /infest(ed)?(ation)?/ig;
  if(infestReg.test(this.faction1) || infestReg.test(this.faction2)){
    return util.format('%s%s%s' +
                       '%s (%s)%s' +
                       '%s%s' +
                       '%d% - %s%s',
                       md.codeMulti, this.node, md.lineEnd,
                       this.desc, this.type2, md.lineEnd,
                       this.reward2.toString(), md.lineEnd,
                       Math.round(this.completion * 100) / 100,
                       this.getETAString(), md.blockEnd);
  }

  return util.format('%s%s - %s%s' +
                     '%s (%s, %s) vs.%s' +
                     '%s (%s, %s)%s' +
                     '%d% - %s%s',
                     md.codeMulti, this.node, this.desc, md.lineEnd,
					 this.faction1, this.type1, this.reward1.toString(), md.lineEnd,
					 this.faction2, this.type2, this.reward2.toString(), md.lineEnd,
                     Math.round(this.completion * 100) / 100, this.getETAString(), md.blockEnd);
}

/**
 * Return an array of strings each representing a reward type
 * Empty for credit only invasions
 *
 * @return {array} This invasion's reward types
 */
Invasion.prototype.getRewardTypes = function() {
  return this.reward1.getTypes().concat(this.reward2.getTypes());
}

/**
 * Return an the ETA string for this invaion
 *
 * @return {string} The ETA string for this invaion
 */
Invasion.prototype.getETAString = function() {
  
  return dsUtil.timeDeltaToString(Math.abs(Date.now()-this.ETA.getTime()));
}

/**
 * Parse a reward object from a string
 *
 * @param {string} text String to parse
 *
 * @return {object} Reward object
 */
function rewardFromString(text) {
  try{
    return new Reward({credits: text.credits, items: text.items,
                      countedItems: text.countedItems});
  } catch(err){
    console.error(err);
  } 
}

module.exports = Invasions;
