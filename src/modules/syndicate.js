var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');

var syndicatesData = require('warframe-worldstate-data').syndicates;
var solNodes = require('warframe-worldstate-data').solNodes;

var syndFormat = "%s%s%s";
/**
 * Create a new Syndicates instance
 *
 * @constructor
 * @param {object} data SyndicateMissions data
 */
var Syndicates = function (data) {
  if(!data){
    console.error("No data in syndicate data ");
    return;
  }
  this.syndicates = [];

  for (var index = 0; index < data.length; index++){
    var syndicate = new Syndicate(data[index]);
    this.syndicates.push(syndicate);
  }
  this.noSyndicatesString = util.format('%sOperator, there is no sign of syndicate missions, stay alert.', 
                        md.codeMulti);
}

/**
 * Get all syndicates as a string
 *
 * @return {string} a string of all syndicates
 */
Syndicates.prototype.getAllAsString = function(){
  var allString = md.codeMulti;
  this.syndicates.forEach(function(syndicate){
    allString += syndicate.toString();
  });
  if(allString === md.codeMulti){
    allString = this.noSyndicatesString;
  }
  return allString+md.blockEnd;
}

/**
 * Get all syndicates in an array
 *
 * @return {array} an array of all syndicates
 */
Syndicates.prototype.getAll = function(){
  return this.syndicates;
}

/**
 * Get Arbiters of Hexis syndicate missions in an array
 *
 * @return {syndicate} Arbiters of Hexis syndicate
 */
Syndicates.prototype.getArbitersOfHexisMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Arbiters of Hexis"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get Arbiters of Hexis syndicate as a string
  @return {string} a string representation of Arbiters of Hexis syndicate
 */
Syndicates.prototype.getArbitersOfHexisString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Arbiters of Hexis"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}

/**
 * Get Cephalon Suda syndicate missions in an array
 *
 * @return {array} an array of Cephalon Suda syndicate missions
 */
Syndicates.prototype.getCephalonSudaMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Cephalon Suda"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get Cephalon Suda syndicate as a string
  @return {string} a string representation of Cephalon Suda syndicate
 */
Syndicates.prototype.getCephalonSudaString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Cephalon Suda"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}

/**
 * Get New Loka syndicate missions in an array
 *
 * @return {array} an array of New Loka syndicate missions
 */
Syndicates.prototype.getNewLokaMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "New Loka"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get New Loka syndicate as a string
  @return {string} a string representation of New Loka syndicate
 */
Syndicates.prototype.getNewLokaString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "New Loka"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}

/**
 * Get Perrin Sequence syndicate missions in an array
 *
 * @return {array} an array of Perrin Sequence syndicate missions
 */
Syndicates.prototype.getPerrinSequenceMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Perrin Sequence"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get Perrin Sequence syndicate as a string
  @return {string} a string representation of Perrin Sequence syndicate
 */
Syndicates.prototype.getPerrinSequenceString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Perrin Sequence"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}

/**
 * Get Steel Meridian syndicate missions in an array
 *
 * @return {array} an array of Steel Meridian syndicate missions
 */
Syndicates.prototype.getSteelMeridianMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Steel Meridian"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get Steel Meridian syndicate as a string
  @return {string} a string representation of Steel Meridian syndicate
 */
Syndicates.prototype.getSteelMeridianString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Steel Meridian"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}

/**
 * Get Red Veil syndicate missions in an array
 *
 * @return {array} an array of Red Veil syndicate missions
 */
Syndicates.prototype.getRedVeilMissions = function(){
  var syndicateToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Red Veil"  && !syndicateFound){
      syndicateToReturn = syndicate;
      syndicateFound = true;
    }
  });
  return syndicateToReturn;
}

/**
  Get Red Veil syndicate as a string
  @return {string} a string representation of Red Veil syndicate
 */
Syndicates.prototype.getRedVeilString = function(){
  var syndicateStringToReturn = null;
  var syndicateFound = false;
  this.syndicates.forEach(function(syndicate){
    if(syndicate.name === "Red Veil"  && !syndicateFound){
      syndicateStringToReturn = syndicate.toString();
      syndicateFound = true;
    }
  });
  return util.format(syndFormat, md.codeMulti, syndicateStringToReturn, md.blockEnd);
}
/**
 * Create a new Syndicate instance
 *
 * @constructor
 * @param {object} data Syndicate data
 */
var Syndicate = function(data) {
  try{
    if(!data)
    {
      return;
    }
    this.id = data._id.$id;
    if(data.Expiry) {
      this.endTime = new Date(1000 * data.Expiry.sec);
    }
    this.name = syndicatesData[data.Tag].name;
    this.planNodes = [];
    var self = this;
    data.Nodes.forEach(function(node){
      self.planNodes.push(solNodes[node] ? solNodes[node].value : node);
    });    
  } catch (err) {
    console.log("Syndicate: " + err.message);
  } finally {
    return;
  }
}

/**
 * Returns a string representation of this syndicate object
 * 
 * @return (string) The new string object
 */
Syndicate.prototype.toString = function() {
  var syndStringPre = util.format("%s %s currently  has missions available on: %s  \u2022 ", this.getETAString(), this.name, md.lineEnd);
  var syndString = '';
  syndString = syndString.concat(syndStringPre, this.planNodes.join(util.format(md.lineEnd +"  \u2022 ")));
  if(syndString === syndStringPre)
  {
    syndString = util.format("No missions available for %s", this.name);
  }
  return syndString;
}

/**
 * Return a string representation of how long the syndicate missions will remain active
 *
 * @return {string} Time Remaining for the syndicate missions to remain active
 */
Syndicate.prototype.getETAString = function() {
  return "["+dsUtil.timeDeltaToString(Math.abs(Date.now()-this.endTime.getTime()))+"]";
}

module.exports = Syndicates;
