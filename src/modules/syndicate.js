var util = require('util');
var md = require('hubot-markdown');

var dsUtil = require('../lib/_utils.js');

var strings = require(dsUtil.stringsPath);
var syndicatesData = require('../resources/syndicatesData.json');
var solNodes = require('../resources/solNodes.json');

/**
 * Create a new Syndicates instance
 *
 * @constructor
 * @param {object} data SyndicateMissions data
 */
var Syndicates = function (data) {
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
    this.name = syndicatesData[data.Tag];
    this.nodes = [];
    for(var n : data.Nodes){
      this.nodes.push(solNodes[n].value);
    }
    
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
Syndicate.prototype.toString = function () {
  var syndString = util.format("%s currently  has missions available on: ", this.name);
  var syndicateNodeFormat = "%s  %s"
  for(var n : this.nodes)
    syndString += util.format(syndicateNodeFormat, md.lineEnd, n)
  if (this.nodes.length < 1)
    syndString += util.format(syndicateNodeFormat, md.lineEnd, util.format("No missions available for %s", this.name));
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
