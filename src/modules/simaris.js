var md = require('node-md-config');
var strings = require(require('../lib/_utils.js').stringsPath);
var dsUtil = require('../lib/_utils.js');

/**
 * Create a new Simaris instance
 *
 * @constructor
 * @param {object} data Simaris data
 */
var Simaris = function(data) {
  try{
    if(!data)
    {
      return;
    }
    if(data.LastCompletedTargetType){
      this.target = dsUtil.getLocalized(data.LastCompletedTargetType.toLowerCase());
      this.isTargetActive = false;
    }
    else{
      this.isTargetActive = true;
      this.target = "N/A";
    }
  } catch (err) {
    console.log("Simaris: " + err.message);
  } finally {
    return;
  }
}

Simaris.prototype.getSimaris = function(){
  return this;
}

/**
 * Returns a string representation of this Simaris object
 * 
 * @return (string) The new string object
 */
Simaris.prototype.toString = function () {
  var simString = md.codeMulti;
  if(this.isTargetActive)
    simString += "Simaris's current objective is " + this.target;
  else
    simString += "Simaris's previous objective was " + this.target;
  if(simString === md.codeMulti)
    simString += "No info about Synthesis Targets, Simaris has left us alone"
  return simString+md.blockEnd;
}
module.exports = Simaris;
