var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');
var strings = require(dsUtil.stringsPath);


/**
 * Create a new deal instance
 *
 * @constructor
 * @param {object} data Deal data
 */
var Deal = function(data) {
  this.id = data._id;
  this.item = strings[data.StoreItem.toLowerCase()].value;
  this.expiry = new Date(1000 * data.Expiry.sec);
  this.originalPrice = data.OriginalPrice;
  this.salePrice = data.SalePrice;
  this.total = data.AmountTotal;
  this.sold = data.AmountSold;
}

/** Return a string representation of the deal
 *
 * @return {string} The new string
 */
Deal.prototype.toString = function() {
  var dealString = util.format('%sDaily Deal: %s%s' +
                               '%dp (original %dp)%s' +
                               '%d / %d sold%s' +
                               'Expires in %s%s',
                               md.codeMulti,
                               this.item, md.lineEnd,
                               this.salePrice, this.originalPrice, md.lineEnd,
                               this.sold, this.total, md.lineEnd,
                               this.getETAString(), md.blockEnd);
  return dealString;
}

/**
 * Return how much time is left before the deal expires
 *
 * @return {string} Deal ETA
 */
Deal.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

module.exports = Deal;
