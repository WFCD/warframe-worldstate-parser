var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var conclaveData = require('warframe-worldstate-data').conclave;

/**
 * Create a new ConclaveChallenge instance
 *
 * @constructor
 * @param {object} data Challenges data
 */
var Challenges = function (data) {
  this.challenges = [];
  for (var index = 0; index < data.length; index++){
    var challenge = new Challenge(data[index]);
    if(!challenge.isAnyParamUndefined())
      this.challenges.push(challenge);
  }
}

/**
 * Get the daily challenges  as a string
 *
 * @return a string of daily challenges
 */
Challenges.prototype.getDailiesAsString = function(){
  var dailyString  = md.codeMulti;;
  this.challenges.forEach(function(challenge){
    if(challenge.isDaily()){
      dailyString += challenge.toString();
    }
  });
  if(dailyString === md.codeMulti)
    dailyString =  util.format('%sNo Challenges%s',  md.codeMulti, md.blockEnd);
  else
    dailyString += md.blockEnd;
  return dailyString;
}

/**
 * Get the daily challenges in an array
 *
 * @return {array} an array of daily challenges
 */
Challenges.prototype.getDailies = function(){
  var dailyArray = [];
  this.challenges.forEach(function(challenge){
    if(challenge.isDaily()){
      dailyArray.push(challenge);
    }
  });
  return dailyArray;
}

/**
* Get the weekly challenges as a string
*
* @return a string of weekly challenges
*/
Challenges.prototype.getWeekliesAsString = function(){
  var weeklyString  = md.codeMulti;
  this.challenges.forEach(function(challenge){
    if(challenge.isWeekly()){
      weeklyString += challenge.toString();
    }
  });
  if(weeklyString === md.codeMulti)
    weeklyString =  util.format('%sNo Challenges%s',  md.codeMulti, md.blockEnd)
  else
    weeklyString += md.blockEnd;
  return weeklyString;
}

/**
 * Get the weekly challenges in an array
 *
 * @return {array} an array of weekly challenges
 */
Challenges.prototype.getWeeklies = function(){
  var weeklyArray = [];
  this.challenges.forEach(function(challenge){
    if(challenge.isWeekly()){
      weeklyArray.push(challenge);
    }
  });
  return weeklyArray;
}

/**
* Get all challenges as a string
*
* @return a string of all current challenges
*/
Challenges.prototype.getAllAsString = function(){
  var allString = md.codeMulti;
  this.challenges.forEach(function(challenge){
    allString += challenge.toString();
  });
  if(allString === md.codeMulti)
    allString =  util.format('%sNo Challenges%s',  md.codeMulti, md.blockEnd);
  else
    allString += md.blockEnd;
  return allString;
}

/**
* Get all challenges in an array
*
* @return {array} an array of all current challenges
*/
Challenges.prototype.getAll = function(){
  return this.challenges;
}

/**
 * Create a new Challenge instance
 *
 * @constructor
 * @param {object} data Challenge data
 */
var Challenge = function(data) {
  try{
    if(!data.challengeTypeRefID || data.subChallenges.length > 0)
    {
      return;
    }
    this.id = data._id.$id;
    this.challengeRef = dsUtil.getLocalized(data.challengeTypeRefID);
    this.expiry = new Date(data.endDate.sec*1000);
    this.endDate = data.endDate.sec;
    this.amount = parseInt(data.params[0].v);
    this.category = dsUtil.safeGetLocalized(data.Category, conclaveData.categories);
    this.mode = dsUtil.safeGetLocalized(data.PVPMode, conclaveData.modes)
  } catch (err) {
    console.log("Conclave: " + err.message);
    console.log(JSON.stringify(data));
  } finally {
    return;
  }
}

/**
 * Get the challenge string for the conclave challenge.
 *
 * @return {string} challenge string for the conclave challenge.
 */
Challenge.prototype.getChallenge = function() {
  return this.challengeRef;
}

/**
 * Get the amount of times a challenge needs to be completed.
 *
 * @return {number} amount of times a challenge needs to be completed.
 */
Challenge.prototype.getAmount = function() {
  return this.amount;
}

/**
 * Get the category or type of challenge needing to be completed.
 *
 * @return {string} category or type of challenge needing to be completed.
 */
Challenge.prototype.getCategory = function() {
  return this.category;
}

/**
 * Get the conclave mode on which the challenge needs to be completed.
 *
 * @return {string} conclave mode on which the challenge needs to be completed.
 */
Challenge.prototype.getMode = function() {
  return this.mode;
}

/**
 * Check whether or not a challenge instance is a daily challenge or not
 *
 * @return {boolean} truthy if challenge is daily
 */
Challenge.prototype.isDaily = function(){
  return this.category.toLowerCase() == 'day'.toLowerCase();
}

/**
 * Check whether or not a challenge instance is a weekly challenge or not
 *
 * @return {boolean} truthy if challenge is weekly
 */
Challenge.prototype.isWeekly = function(){
  return this.category.toLowerCase() == 'week'.toLowerCase();
}

/**
 * Returns a string representation of this sortie object
 * 
 * @return (string) The new string object
 */
Challenge.prototype.toString = function (isIndividual) {
  return util.format('%s %s on %s %s times in a %s%s', isIndividual ? "["+this.getEndString()+"]" : "", this.challengeRef, this.mode, this.amount, this.category, md.lineEnd);
}

/**
 * Check whether or not a challenge is expired
 *
 * @return {boolean} truthy if challenge is expired
 */
Challenge.prototype.isExpired = function(){
  return this.endDate - Date.now() < 0;
}

/**
 * Return how much time is left with the 
 *
 * @return {string} The new string object
 */
Challenge.prototype.getEndString = function() {
  return dsUtil.timeDeltaToString(Math.abs(Date.now()-this.expiry.getTime()));
}

/**
 * Check whether or not a challenge instance has any undefined parameters, 
 *   in which case it is either a root, invalid, or corrupted
 *
 * @return {boolean} truthy if challenge has any undefined parameters
 */
Challenge.prototype.isAnyParamUndefined = function () {
  return typeof this.id === "undefined" 
    || typeof this.challengeRef === "undefined" 
    || typeof this.expiry === "undefined" 
    || typeof this.amount === "undefined" 
    || typeof this.category === "undefined" 
    || typeof this.mode === "undefined"
}

module.exports = Challenges;