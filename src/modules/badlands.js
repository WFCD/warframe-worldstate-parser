var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var Reward = require('../lib/reward.js');
var Mission = require('../lib/mission.js');

var strings = require(dsUtil.stringsPath);

var Badlands = function(data) {
  this.badlands = [];
  for (var index = 0; index < data.length; index++){
    this.badlands.push(new DarkSector(data[index]));
  }
}

Badlands.prototype.getAll = function() {
  return this.badlands;
}

Badlands.prototype.toString = function() {
  var darkSectorsString = '';
  for(var darkSector in this.badlands){
    darkSectorsString += darkSector.toString();
  }
  return darkSectorsString;
}

/**
 * Create a new deal instance
 *
 * @constructor
 * @param {object} data FlashDeal data
 */
var DarkSector = function(data) {
  try{
    this.id = data._id.$id;
    this.creditTaxRate = data.DefenderInfo.CreditsTaxRate;
    this.memberCreditsTaxRate = data.DefenderInfo.MemberCreditsTax;
    this.itemsTaxRate = data.DefenderInfo.ItemsTaxRate;
    this.memberItemsTaxRate = data.DefenderInfo.MemberItemsTaxRate;
    this.isAlliance = data.DefenderInfo.IsAlliance;
    this.defenderName = data.DefenderInfo.Name;
    this.defenderPoolRemaining = data.DefenderInfo.StrengthRemaining;
    this.defenderMaxPool = data.DefenderInfo.MaxStrength;
    this.defenderDeployemntActivation = new Date(1000*data.DefenderInfo.DeploymentActivationTime.sec);
    this.railType = strings[data.DefenderInfo.RailType.toLowerCase()].value;
    this.defenderMOTD = data.DefenderInfo.MOTD;
    this.deployerName = data.DefenderInfo.DeployerName;
    this.deployerClan = data.DefenderInfo.DeployerClan;
    this.defenderRailHealReserve = data.DefenderInfo.RailHealReserve;
    this.healRate = data.DefenderInfo.healRate;
    this.damagePerMission = data.DefenderInfo.DamagePerMission;
    this.mission = new Mission(data.DefenderInfo.MissionInfo);
    this.battlePayReserve = data.DefenderInfo.BattlePayReserve;
    this.perMissionBattlePay = data.DefenderInfo.MissionBattlePay;
    this.battlePaySetBy = data.DefenderInfo.BattlePaySetBy;
    this.battlePaySetByClan = data.DefenderInfo.BattlePaySetByClan;
    this.taxChangedBy = data.DefenderInfo.TaxLastChangedBy;
    this.taxChangedByClan = data.DefenderInfo.TaxLastChangedByClan;
    this.history = [];
    this.historyJson = data.History;
  } catch (err) {
    console.log("Dark Sectors: " + err.message);
    //console.log(JSON.stringify(data));
  }
}

DarkSector.prototype.generateHistory = function() {
  this.history = [];
  for (var index = 0; index < this.historyJson.length; index++){
    this.history.push(new DarkSectorHistory(this.historyJson[index]));
  }
}

DarkSector.prototype.getHistory = function() {
  return this.history;
}

/** 
 * Return a string representation of the DarkSector
 * @return {string} The new string
 */
DarkSector.prototype.toString = function() {
  var darkSectorString = util.format();
  return darkSectorString;
}

DarkSector.prototype.getCreditTaxRate = function () {
  return this.creditTaxRate;
}
DarkSector.prototype.getMemberCreditsTaxRate = function () {
  return this.memberCreditsTaxRate;
}
DarkSector.prototype.getItemsTaxRate = function () {
  return this.itemsTaxRate;
}
DarkSector.prototype.getMemberItemsTaxRate = function () {
  return this.memberItemsTaxRate;
}
DarkSector.prototype.getIsAlliance = function () {
  return this.isAlliance;
}
DarkSector.prototype.getDefenderName = function () {
  return this.defenderName;
}
DarkSector.prototype.getDefenderPoolRemaining = function () {
  return this.defenderPoolRemaining;
}
DarkSector.prototype.getDefenderMaxPool = function () {
  return this.defenderMaxPool;
}
DarkSector.prototype.getDefenderDeployemntActivation = function () {
  return this.defenderDeployemntActivation;
}
DarkSector.prototype.getRailType = function () {
  return this.railType;
}
DarkSector.prototype.getDefenderMOTD = function () {
  return this.defenderMOTD;
}
DarkSector.prototype.getDeployerName = function () {
  return this.deployerName;
}
DarkSector.prototype.getDeployerClan = function () {
  return this.deployerClan;
}
DarkSector.prototype.getDefenderRailHealReserve = function () {
  return this.defenderRailHealReserve;
}
DarkSector.prototype.getHealRate = function () {
  return this.healRate;
}
DarkSector.prototype.getDamagePerMission = function () {
  return this.damagePerMission;
}
DarkSector.prototype.getMission = function () {
  return this.mission;
}
DarkSector.prototype.getBattlePayReserve = function () {
  return this.battlePayReserve;
}
DarkSector.prototype.getPerMissionBattlePay = function () {
  return this.perMissionBattlePay;
}
DarkSector.prototype.getBattlePaySetBy = function () {
  return this.battlePaySetBy;
}
DarkSector.prototype.getBattlePaySetByClan = function () {
  return this.battlePaySetByClan;
}
DarkSector.prototype.getTaxChangedBy = function () {
  return this.taxChangedBy;
}
DarkSector.prototype.getTaxChangedByClan = function () {
  return this.taxChangedByClan;
}

/**
 * Return how much time is left before the deal expires
 *
 * @return {string} Deal ETA
 */
DarkSector.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

var DarkSectorHistory = function(history) {
  this.defender = history.Def;
  this.defenderIsAlliance = history.DefAli;
  this.attacker = history.Att;
  this.attackerisAlliance = history.AttAli;
  this.winner = '';
  if(history.DefId.$id === history.WinId.$id){
    this.winner = this.defender;
  } else {
    this.winner = this.attacker;
  }
  this.start = new Date(1000 * history.Start.sec);
  this.end = new Date(1000 * history.End.sec);
}

module.exports = Badlands;
