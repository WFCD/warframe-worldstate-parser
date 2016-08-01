var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');


/**
 * Create a new deal instance
 *
 * @constructor
 * @param {object} data Deal data
 */
var Deal = function(data) {
  try{
    this.id = data.Activation.sec;
  } catch (error){
    console.error(error);
    console.error (JSON.stringify(data));
  }  
  this.item = dsUtil.getLocalized(data.StoreItem);
  try{
    this.expiry = new Date(1000 * data.Expiry.sec);
  } catch (error){
    console.error(error);
    console.error (JSON.stringify(data));
  }
  
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
  var dealString = util.format('Daily Deal: %s%s' +
                               '%dp (original %dp)%s' +
                               '%d / %d sold%s' +
                               'Expires in %s',
                               this.item, md.lineEnd,
                               this.salePrice, this.originalPrice, md.lineEnd,
                               this.sold, this.total, md.lineEnd,
                               this.getETAString());
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


var Deals = function(data) {
  this.deals = [];
  for (var index = 0; index < data.length; index++){
    this.deals.push(new Deal(data[index]));
  }
}

Deals.prototype.getAll = function () {
  return this.deals;
}

Deals.prototype.toString = function () {
  var allString = md.codeMulti;
  allString += this.deals.join(md.doubleReturn);
  if(allString === md.codeMulti) {
    allString += "Operator, there are no deals right now";
  }
  return allString+md.blockEnd;
}

module.exports = Deals;
