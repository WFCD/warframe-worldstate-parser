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
  this.allString = '';
  
  this.arbitersMissions = [];
  this.arbitersString = '';
  
  this.lokaMissions = [];
  this.lokaString = '';
  
  this.sudaMissions = [];
  this.sudaString = '';
  
  this.perrinMissions = [];
  this.perrinString = '';
  
  this.steelMeridianMissions = [];
  this.steelString = '';
  
  this.redVeilMissions = [];
  this.redVeilString = '';
  
  for (var index = 0; index < data.length; index++){
    var syndicate = new Syndicate(data[index]);
    this.syndicates.push(syndicate);
    switch(data[index].Tag) {
      case "ArbitersSyndicate":
        this.arbitersMissions = syndicate.planNodes;
        this.arbitersString = syndicate.toString();
        break;
      case "CephalonSudaSyndicate":
        this.sudaMissions = syndicate.planNodes;
        this.sudaString = syndicate.toString();
        break;
      case "NewLokaSyndicate":
        this.lokaMissions = syndicate.planNodes;
        this.lokaString  = syndicate.toString();
        break;
      case "RedVeilSyndicate":
        this.redVeilMissions = syndicate.planNodes;
        this.redVeilString = syndicate.toString();
        break;
      case "PerrinSyndicate":
        this.perrinMissions = syndicate.planNodes;
         this.perrinString = syndicate.toString();
        break;
      case "SteelMeridianSyndicate":
        this.steelMeridianMissions = syndicate.planNodes;
        this.steelString = syndicate.toString();
        break;
    } 
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
  if(allString === md.codeMulti)
    allString = this.noSyndicatesString;
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
 * @return {array} an array of Arbiters of Hexis syndicate missions
 */
Syndicates.prototype.getArbitersOfHexisMissions = function(){
  return this.arbitersMissions;
}

/**
  Get Arbiters of Hexis syndicate as a string
  @return {string} a string representation of Arbiters of Hexis syndicate
 */
Syndicates.prototype.getArbitersOfHexisString = function(){
  return util.format(syndFormat, md.codeMulti, this.arbitersString, md.blockEnd);
}

/**
 * Get Cephalon Suda syndicate missions in an array
 *
 * @return {array} an array of Cephalon Suda syndicate missions
 */
Syndicates.prototype.getCephalonSudaMissions = function(){
  return this.sudaMissions;
}

/**
  Get Cephalon Suda syndicate as a string
  @return {string} a string representation of Cephalon Suda syndicate
 */
Syndicates.prototype.getCephalonSudaString = function(){
  return util.format(syndFormat, md.codeMulti, this.sudaString, md.blockEnd);
}

/**
 * Get New Loka syndicate missions in an array
 *
 * @return {array} an array of New Loka syndicate missions
 */
Syndicates.prototype.getNewLokaMissions = function(){
  return this.lokaMissions;
}

/**
  Get New Loka syndicate as a string
  @return {string} a string representation of New Loka syndicate
 */
Syndicates.prototype.getNewLokaString = function(){
  return util.format(syndFormat, md.codeMulti, this.lokaString, md.blockEnd);
}

/**
 * Get Perrin Sequence syndicate missions in an array
 *
 * @return {array} an array of Perrin Sequence syndicate missions
 */
Syndicates.prototype.getPerrinSequenceMissions = function(){
  return this.perrinMissions;
}

/**
  Get Perrin Sequence syndicate as a string
  @return {string} a string representation of Perrin Sequence syndicate
 */
Syndicates.prototype.getPerrinSequenceString = function(){
  return util.format(syndFormat, md.codeMulti, this.perrinString, md.blockEnd);
}

/**
 * Get Steel Meridian syndicate missions in an array
 *
 * @return {array} an array of Steel Meridian syndicate missions
 */
Syndicates.prototype.getSteelMeridianMissions = function(){
  return this.steelMeridianMissions;
}

/**
  Get Steel Meridian syndicate as a string
  @return {string} a string representation of Steel Meridian syndicate
 */
Syndicates.prototype.getSteelMeridianString = function(){
  return util.format(syndFormat, md.codeMulti, this.steelString, md.blockEnd);
}
/**
 * Get Red Veil syndicate missions in an array
 *
 * @return {array} an array of Red Veil syndicate missions
 */
Syndicates.prototype.getRedVeilMissions = function(){
  return this.redVeilMissions;
}

/**
  Get Red Veil syndicate as a string
  @return {string} a string representation of Red Veil syndicate
 */
Syndicates.prototype.getRedVeilString = function(){
  return util.format(syndFormat, md.codeMulti, this.redVeilString, md.blockEnd);
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
  syndString = syndString.concat(syndStringPre, this.planNodes.join(util.format("%s  \u2022 ", md.lineEnd)));
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
