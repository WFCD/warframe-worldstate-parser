var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');

var FlashDeals = function(data) {
  this.flashDeals = [];
  for (var index = 0; index < data.length; index++){
    this.flashDeals.push(new FlashDeal(data[index]));
  }
}

FlashDeals.prototype.getAll = function() {
  return this.flashDeals;
}

FlashDeals.prototype.toString = function() {
  var flashDealsString = '';
  for(var i in this.flashDeals){
    if(this.flashDeals[i].discount > 0){
      flashDealsString += this.flashDeals[i].toString();
    }
  }
  if(flashDealsString === ''){
    flashDealsString = md.codeMulti+"Operator, there are currently no flash deals"+md.blockEnd;
  }
  return flashDealsString;
}

/**
 * Create a new deal instance
 *
 * @constructor
 * @param {object} data FlashDeal data
 */
var FlashDeal = function(data) {
  this.id = data._id;
  this.item = dsUtil.getLocalized(data.TypeName);
  this.expiry = new Date(1000 * data.EndDate.sec);
  
  this.discount = data.Discount;
  this.premiumOverride = data.PremiumOverride;
  this.isFeatured = data.Featured;
  this.isPopular = data.Popular;
}

/** Return a string representation of the deal
 *
 * @return {string} The new string
 */
FlashDeal.prototype.toString = function() {
  var dealString = util.format('%s%s%s, %sp%s' +
                               'Expires in %s%s',
                               md.codeMulti, 
                               this.discount > 0  ? this.discount+"% off!"+md.lineEnd : 
                               (this.isPopular ? ("**Popular**"+md.lineEnd) : 
                               (this.isFeatured ? "**Featured**"+md.lineEnd : "")),
                               this.item, this.premiumOverride, md.lineEnd,
                               this.getETAString(), md.blockEnd);
  return dealString;
}

/**
 * Return how much time is left before the deal expires
 *
 * @return {string} Deal ETA
 */
FlashDeal.prototype.getETAString = function() {
  return dsUtil.timeDeltaToString(this.expiry.getTime() - Date.now());
}

module.exports = FlashDeals;
