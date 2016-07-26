var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var Reward = require('../lib/reward.js');

var nodes = require('warframe-worldstate-data').solNodes;
var factions = require('warframe-worldstate-data').factions;
var missionTypes = require('warframe-worldstate-data').missionTypes;

var Invasions = function(data) {
  this.invasions = [];
  /*for(var invasion in data){
    this.invasions.push(new Invasion(invasion));
  }*/
  
  for (var index = 0; index < data.length; index++){
    this.invasions.push(new Invasion(data[index]));
  }
}

Invasions.prototype.getAll = function(){
  return this.invasions;
}

Invasions.prototype.toString = function(){
  var invasionsString = md.codeMulti;
  for(var invasion in this.invasions){
    invasionsString += invasion.toString();
  }
  return invasionsString+md.blockEnd;
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
    this.desc = dsUtil.getLocalized(data.LocTag.toLowerCase());
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
  if(this.faction1 === 'Infestation') {
    return util.format('%s%s%s' +
                       '%s (%s)%s' +
                       '%s%s' +
                       '%d% - %s%s',
                       md.codeMulti, this.node, md.lineEnd,
                       this.desc, this.type2, md.lineEnd,
                       this.reward2.toString(), md.lineEnd,
                       Math.round(this.completion * 100) / 100,
                       this.ETA, md.blockEnd);
  }

  return util.format('%s%s - %s%s' +
                     '%s (%s, %s) vs.%s' +
                     '%s (%s, %s)%s' +
                     '%d% - %s%s',
                     md.codeMulti, this.node, this.desc, md.lineEnd,
					 this.faction1, this.type1, this.reward1.toString(), md.lineEnd,
					 this.faction2, this.type2, this.reward2.toString(), md.lineEnd,
                     Math.round(this.completion * 100) / 100, this.ETA, md.blockEnd);
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
 * Parse a reward object from a string
 *
 * @param {string} text String to parse
 *
 * @return {object} Reward object
 */
function rewardFromString(text) {
  /*var credits, items, countedItems;
  credits = text.match(/(^[1-9][0-9,]+)cr/);
  if(credits) {
    credits = parseInt(credits[1].replace(',',''), 10);
  }

  items = text.match(/^(?:([1-9]+\d*)\s+)?([A-Za-z\s]+)/) || [];
  if(items[1]) {
    countedItems = [{ItemCount: items[1], ItemType: items[2]}];
    items = [];
  }
  else if(items[2]) {
    countedItems = [];
    items = [items[2]]
  }
  else {
    countedItems = [];
    items = [];
  }*/

  return new Reward({credits: credits, items: items,
                    countedItems: countedItems});
}

module.exports = Invasions;
