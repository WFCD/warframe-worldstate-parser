 var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var nodes = require('warframe-worldstate-data').solNodes;
var modifiers = require('warframe-worldstate-data').fissureModifiers;

/**
 * Create a new void fissures list
 * 
 * @constructor
 * @param {object} data VoidFissure data
 */
var VoidFissures = function(data) {
  this.voidFissures = [];
  for (var index = 0; index < data.length; index++){
    this.voidFissures.push(new VoidFissure(data[index]));
  }
  if(this.voidFissures.length > 0){
    this.voidFissures.sort(function(a, b){
      if(a.tierNum > b.tierNum)
        return 1;
      else if (a.tierNum < b.tierNum)
        return -1;
      else
        return 0;    
    });
  }
}

/**
 * Get a list of all void fissure objects
 *
 * @return {array} The list of void fissure instances
 */
VoidFissures.prototype.getAll = function() {
  return this.voidFissures;
}

VoidFissures.prototype.getString = function() {
  var fissureString = md.codeMulti;
  this.voidFissures.forEach(function(voidFissure){
    fissureString += voidFissure.toString()+md.lineEnd;
  });
  if(fissureString === md.codeMulti)
    return util.format("%sOperator, there are no Void Fissures active%s", md.codeMulti, md.blockEnd);
  else 
    fissureString += md.blockEnd;
  return fissureString;
}

/**
 * Create a new void fissure instance
 *
 * @constructor
 * @param {object} data VoidFissure data for a particular instance
 */
var VoidFissure = function(data) {
  try{
    this.id = data._id.$id;
    this.location = dsUtil.getSolNodeValue(data.Node, nodes);
    this.missionType = dsUtil.getSolNodeType(data.Node, nodes);
    this.voidTier = modifiers[data.Modifier] ? modifiers[data.Modifier].value : data.Modifier;
    this.tierNum = modifiers[data.Modifier] ? modifiers[data.Modifier].num : 0;
    this.enemy =  dsUtil.getSolNodeEnemy(data.Node, nodes);
    if(data.Activation) {
      this.startTime = new Date(1000 * data.Activation.sec);
    }
    if(data.Expiry) {
      this.endTime = new Date(1000 * data.Expiry.sec);
    }
  } catch (err) {
    console.log("Mission: " + err.message);
    console.log(JSON.stringify(data));
  }
}

/**
 * Return a string representation of this Void Fissure
 *
 * @return {string} This mission in string format
 */
VoidFissure.prototype.toString = function() {
  return util.format("%s %s Fissure at %s - %s %s", this.getETAString(), this.voidTier, this.location, this.enemy, this.missionType);
}

/**
 * Return a string representation of how long the void fissure will remain active
 *
 * @return {string} Time Remaining for this VoidFissure to be open
 */
VoidFissure.prototype.getETAString = function() {
  var etaString = "["+dsUtil.timeDeltaToString(Math.abs(Date.now()-this.endTime.getTime()))+"]";
  var paddString = "";
  for(var i = etaString.length; i< 12; i++)
    paddString += " ";
  return etaString + paddString
}

module.exports = VoidFissures;
