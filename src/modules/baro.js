var util = require('util');
var md = require('hubot-markdown');

var dsUtil = require('../lib/_utils.js');

var strings = require(dsUtil.stringsPath);
var nodes = require('../resources/solNodes.json');

/**
 * Create a new baro instance
 *
 * @constructor
 * @param {object} data Void Trader data
 */
var Baro = function(data) {
  this.start = new Date(1000 * data.Activation.sec);
  this.end = new Date(1000 * data.Expiry.sec);
  this.location = nodes[data.Node].value;
  this.manifest = data.Manifest;
}

/**
 * Return a string with info about the Void Trader
 *
 * @return {string} The new string object
 */
Baro.prototype.toString = function() {
  if(!this.isActive()) {
    return util.format('%sBaro is not here yet, he will arrive in %s at %s%s', md.codeMulti, this.getStartString(), this.location, md.blockEnd);
  }
  var baroString = util.format('%sVoid Trader at %s%s', md.codeMulti, this.location, md.doubleReturn);
  for(i in this.manifest) {
    baroString += util.format('%s - price: %d ducats + %dcr%s',
                              strings[this.manifest[i].ItemType.toLowerCase()].value,
                              this.manifest[i].PrimePrice,
                              this.manifest[i].RegularPrice,
                              md.lineEnd);
  }
  baroString += util.format('Trader departing in %s%s', this.getEndString(), md.blockEnd);

  return baroString;
}

/**
 * Return how much time is left before the Void Trader arrives
 *
 * @return {string} The new string object
 */
Baro.prototype.getStartString = function() {
  return dsUtil.timeDeltaToString(this.start.getTime() - Date.now());
}

/**
 * Return how much time is left before the Void Trader departs
 *
 * @return {string} The new string object
 */
Baro.prototype.getEndString = function() {
  return dsUtil.timeDeltaToString(this.end.getTime() - Date.now());
}

/**
 * Returns true if the Void Trader is active, false otherwise
 *
 * @return {boolean} Void trader activity state
 */
Baro.prototype.isActive = function() {
  return (this.start.getTime() < Date.now() && this.end.getTime() > Date.now());
}

/**
 * Returns the void trader's current manifest
 *
 * @return {array} Void trader's current manifest
 */
Baro.prototype.getManifest = function() {
  return this.manifest;
}

/**
 * Returns the void trader's current location
 *
 * @return {string} Void trader's current location
 */
Baro.prototype.getLocation = function() {
  return this.location;
}

module.exports = Baro;