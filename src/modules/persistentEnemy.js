var util = require('util');
var md = require('node-md-config');

var persistentEnemyData = require('warframe-worldstate-data').persistentEnemy;
var nodes = require('warframe-worldstate-data').solNodes;

var dsUtil = require('../lib/_utils.js');

/**
 * Create a new Enemies instance
 *
 * @constructor
 * @param {object} data PersistentEnemies data
 */
var Enemies = function (data) {
  this.enemies = [];
  for (var index = 0; index < data.length; index++){
    var enemy = new Enemy(data[index]);
    if(!enemy.isAnyParamUndefined())
      this.enemies.push(enemy);
  }
  this.noEnemyString = util.format('%sOperator, there is no sign of enemies, stay alert.', 
                        md.codeMulti);
}

/**
* Get the hidden enemies as a string
*
* @return {string} a string of  hidden enemies
*/
Enemies.prototype.getHiddenAsString = function(){
  var hidden = md.codeMulti;
  this.enemies.forEach(function(enemy){
    if(!enemy.isDiscovered){
      hidden += enemy.toString();
    }
  });
  if(hidden === md.codeMulti)
    hidden = this.noEnemyString;
  return hidden+md.blockEnd;
}

/**
* Get the hidden enemies in an array
*
* @return {array} an array of  hidden enemies
*/
Enemies.prototype.getHidden = function(){
  var hidden = [];
  this.enemies.forEach(function(enemy){
    if(!enemy.isDiscovered){
      hidden.push(enemy);
    }
  });
  return hidden;
}

/**
* Get the discovered enemies as a string
*
* @return {string} a string of discovered enemies
*/
Enemies.prototype.getDiscoveredAsString = function(){
  var discovered = md.codeMulti;
  this.enemies.forEach(function(enemy){
    if(enemy.isDiscovered){
      discovered += enemy.toString();
    }
  });
  if(discovered === md.codeMulti)
    discovered = this.noEnemyString;
  return discovered+md.blockEnd;
}

/**
* Get the discovered enemies in an array
*
* @return {array} an array of discovered enemies
*/
Enemies.prototype.getDiscovered = function(){
  var discovered = [];
  this.enemies.forEach(function(enemy){
    if(enemy.isDiscovered){
      discovered.push(enemy);
    }
  });
  return discovered;
}

/**
* Get all enemies as a string
*
* @return {string} a string of all enemies
*/
Enemies.prototype.getAllAsString = function(){
  var allString = md.codeMulti;
  this.enemies.forEach(function(enemy){
    allString += enemy.toString();
  });
  if(allString === md.codeMulti)
    allString = this.noEnemyString;
  return allString+md.blockEnd;
}

/**
* Get all enemies in an array
*
* @return {array} an array of all enemies
*/
Enemies.prototype.getAll = function(){
  return this.enemies;
}

/**
 * Create a new Enemy instance
 *
 * @constructor
 * @param {object} data Enemy data
 */
var Enemy = function(data) {
  try{
    if(!data)
    {
      return;
    }
    this.id = data._id.$id;
    this.agentType = dsUtil.getLocalized(data.AgentType);
    this.locationTag = dsUtil.getLocalized(data.LocTag);
    this.rank = data.Rank;
    this.healthPercent = (parseFloat(data.HealthPercent)*100).toFixed(2);
    this.fleeDamage = parseFloat(data.FleeDamage);
    this.region = persistentEnemyData.regions[data.Region];
    this.lastDiscoveredAt = dsUtil.getSolNodeValue(data.LastDiscoveredLocation, nodes);
    this.isDiscovered = data.Discovered;
    this.isUsingTicketing = data.UseTicketing;
  } catch (err) {
    console.log("Persistent Enemy: " + err.message);
  } finally {
    return;
  }
}

/**
* Get the enemy agent type string
*
* @return {string} enemy agent type string
*/
Enemy.prototype.getAgentType = function() {
  return this.agentType;
}

/**
* Get the enemy location tag string
*
* @return {string} enemy location tag string
*/
Enemy.prototype.getLocationTag = function() {
  return this.locationTag;
}

/**
* Get the enemy rank string
*
* @return {string} enemy rank string
*/
Enemy.prototype.getRank = function() {
  return this.rank;
}

/**
* Get the enemy's remaining health percent
*
* @return {number} remaining health percent
*/
Enemy.prototype.getHealthPercent = function() {
  return this.healthPercent;
}

/**
* Get the enemy's flee damage
*
* @return {number} flee damage
*/
Enemy.prototype.getFleeDamage = function() {
  return this.fleeDamage;
}

/**
* Get the enemy's current region
*
* @return {string} enemy's current region
*/
Enemy.prototype.getRegion = function() {
  return this.region;
}

/**
* Get the enemy's last discovered location
*
* @return {string} enemy's last discovered location
*/
Enemy.prototype.getLastDiscoveredLocation = function() {
  return this.lastDiscoveredAt;
}

/**
* Get whether or not the enemy is discovered
*
* @return {boolean} whether or not the enemy is discovered
*/
Enemy.prototype.getIsDiscovered = function() {
  return this.isDiscovered;
}

/**
 * Returns a string representation of this sortie object
 * 
 * @return (string) The new string object
 */
Enemy.prototype.toString = function () {
  return util.format('%s last discovered at %s. %s    It has %d% health remaining and is currently %s%s', this.agentType, this.lastDiscoveredAt, md.lineEnd, this.healthPercent, this.isDiscovered ? 'discovered' : 'not discovered', md.lineEnd);
}

/**
 * Check whether or not a challenge instance has any undefined parameters, 
 *   in which case it is either a root, invalid, or corrupted
 *
 * @return {boolean} truthy if challenge has any undefined parameters
 */
Enemy.prototype.isAnyParamUndefined = function () {
  return typeof this.id === "undefined" 
    || typeof this.agentType === "undefined" 
    || typeof this.locationTag === "undefined" 
    || typeof this.rank === "undefined" 
    || typeof this.healthPercent === "undefined" 
    || typeof this.fleeDamage === "undefined"
    || typeof this.region === "undefined"
    || typeof this.lastDiscoveredAt === "undefined"
    || typeof this.isDiscovered === "undefined"
    || typeof this.isUsingTicketing === "undefined"
}

module.exports = Enemies;
