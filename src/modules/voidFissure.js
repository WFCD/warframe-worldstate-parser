var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var strings = require(dsUtil.stringsPath);
var nodes = require('../resources/solNodes.json');
var modifiers = require('../resources/fissureModifiers.json');

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
    this.location = nodes[data.Node].value;
    this.voidTier = modifiers[data.Modifier].value;
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
  return util.format("%s %s Fissure Discovered at %s", this.getETAString(), this.voidTier, this.location);
}

/**
 * Return a string representation of how long the void fissure will remain active
 *
 * @return {string} Time Remaining for this VoidFissure to be open
 */
VoidFissure.prototype.getETAString = function() {
  return "["+dsUtil.timeDeltaToString(Math.abs(Date.now()-this.endTime.getTime()))+"]";
}

module.exports = VoidFissures;
