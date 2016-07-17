var md = require('hubot-markdown');
var strings = require(dsUtil.stringsPath);

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
    if(!data.LastCompletedTargetType){
      this.target = strings[data.LastCompletedTargetType].value;  
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
    syndString += "No info about Synthesis Targets, Simaris has left us alone"
  return syndString+md.blockEnd;
}
module.exports = Simaris;
