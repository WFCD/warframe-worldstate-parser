var util = require('util');
var md = require('hubot-markdown');

var dsUtil = require('../lib/_utils.js');

var strings = require(dsUtil.stringsPath);
var upgrades = require('../resources/upgradeTypes.json');
var operations = require('../resources/operationTypes.json');

var GlobalModifiers = function(data) {
  this.globalModifiers = [];
  for (var index = 0; index < data.length; index++){
    this.globalModifiers.push(new GlobalModifier(data[index]));
  }
  this.noGlobalModifierString = util.format('%sOperator, no enhancements have been granted to all Tenno at this time.')
}

GlobalModifiers.prototype.getAll = function() {
  return this.globalModifiers;
}

GlobalModifiers.prototype.toString = function() {
  var globlaModifierString = md.codeMulti;
  for(var globalModifier in this.globalModifiers){
    globlaModifierString += globalModifier.toString();
  }
  if(globlaModifierString === md.codeMulti)
    globlaModifierString = this.noGlobalModifierString;
  return globlaModifierString+md.blockEnd;
}


var GlobalModifier = function(data) {
  this.start = new Date(1000 * data.Activation.sec);
  this.end = new Date(1000 * data.ExpiryDate.sec);
  this.upgrade = upgrades[data.UpgradeType].value;
  this.operation = operations[data.OperationType].value;
  this.upgradeOperationValue = data.Value;
}

GlobalModifier.prototype.toString = function() {
  return util.format("%s[%s] %s %s %s%s",md.codeMulti, this.getETAString(), this.upgrade, this.operation, this.upgradeOperationValue, md.blockEnd);
}

GlobalModifier.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.end.getTime() - Date.now());
}

module.exports = GlobalModifiers;