var util = require('util');
var md = require('node-md-config');
var sortieData = require('warframe-worldstate-data').sortie;
var nodes = require('warframe-worldstate-data').solNodes;

var dsUtil = require('../lib/_utils.js');

/**
 * Create a new sortie instance
 *
 * @constructor
 * @param {object} data Sorie data
 */
var Sorties = function (data) {
  if(typeof data !== 'undefined') {
    this.id = data._id.$id;
    this.expiry = new Date(1000 * data.Expiry.sec);
    this.variants = [];
    for (var index = 0; index < data.Variants.length; index++){
      try {
        var sortie = new Sortie(data.Variants[index]);
        this.variants.push(sortie);
      } catch (err) {
        console.log(err);
        console.log(this.id);
      }
    }
    this.boss = this.variants[0].boss
  } else {
    console.error('couldn\'t initialize sortie, data is undefined')
    this.id = 0;
  }
}


Sorties.prototype.getSortie = function(){
  return this;
}

Sorties.prototype.getId = function(){
  return this.id;
}

/**
 * Returns a string representation of this sortie object
 * 
 * @return (string) The new string object
 */
Sorties.prototype.toString = function () {
  if(this.isExpired()){
    return 'None'
  }
  var sortieString = util.format('%s%s', 
    md.codeMulti, 
    this.boss);

  sortieString += util.format(': ends in %s%s', this.getETAString(),
                              md.doubleReturn);
  this.variants.forEach(function(sortie, i) {
    if(sortie.node)
      sortieString += util.format('%s %s %s%s',
                                  sortie.node,                                
                                  sortie.modifier,
                                  sortie.missionType,
                                  md.lineEnd);
    else
      sortieString += util.format('%s %s %s%s',
                                  sortie.planet,
                                  sortie.missionType,
                                  sortie.modifier,
                                  md.lineEnd);
  })
  sortieString += md.blockEnd;
  return sortieString;
}

/**
 * Return a string containing the sortie's ETA
 *
 * @return {string} The new string object
 */
Sorties.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

/** Returns true if the sortie has expired, false otherwise
 *
 * @return {boolean} Expired-ness of the sortie
 */
Sorties.prototype.isExpired = function() {
  return this.expiry.getTime() < Date.now()
}

/** Returns sortie boss
 *
 * @return {string} Name of sortie boss
 */
Sorties.prototype.getBoss = function() {
  return this.variants[0].boss;
}

var Sortie = function(data) {
  try{
    if(!data)
    {
      return;
    }
    this.boss = sortieData.endStates[data.bossIndex].bossName;
    var region =  sortieData.endStates[data.bossIndex].regions[data.regionIndex];
    this.planet = region.name;
    this.missionType = region.missions[data.missionIndex];
    this.modifier = sortieData.modifiers[data.modifierIndex];
    if(data.node){
      this.node = dsUtil.getSolNodeValue(data.node, nodes);
    }
  } catch (err) {
    console.log(JSON.stringify(data));
    console.log(err);
  } finally {
    return;
  }
}

Sortie.prototype.getBoss = function() {
  return this.boss;
}

Sortie.prototype.getPlanet = function() {
  return this.planet;
}

Sortie.prototype.getMissionType = function() {
  return this.missionType;
}

Sortie.prototype.getModifier = function() {
  return this.modifier;
}

module.exports = Sorties;
