var util = require('util');
var md = require('node-md-config');

var dsUtil = require('../lib/_utils.js');

/**
 * Create a new Events instance
 *
 * @constructor
 * @param {object} data Goals data
 */
var News = function (data) {
  this.newsItems = [];
  for (var index = 0; index < data.length; index++){
    this.newsItems.push(new NewsItem(data[index]));
  }
}
News.prototype.getAll = function() {
  return this.newsItems;
}
News.prototype.toString = function() {
  var newsString = '';
  this.newsItems.forEach(function(newsItem){
    newsString += newsItem.toString();
  });
  if(newsString === '')
    return util.format("%sOperator, there is no news at the moment%s", md.codeMulti, md.blockEnd);
  return newsString;
}
News.prototype.getPrimeAccess = function() {
  var primeAccessItems = [];
  this.newsItems.forEach(function(newsItem){
    if(newsItem.isPrimeAccess()){
      primeAccessItems.push(newsItem);
    }
  });
  return primeAccessItems;
}
News.prototype.getPrimeAccessString = function() {
  var paString = '';
  this.newsItems.forEach(function(newsItem){
    if(newsItem.isPrimeAccess()){
      paString += newsItem.toString();
    }
  });
  if(paString === '')
    return util.format("%sOperator, there is no information pertaining to Prime Access at the moment%s", md.codeMulti, md.blockEnd);
  return paString;
}
News.prototype.getUpdates = function() {
  var updateItems = [];
  this.newsItems.forEach(function(newsItem){
    if(newsItem.isUpdate()){
      updateItems.push(newsItem);
    }
  });
  return updateItems;
}
News.prototype.getUpdatesString = function() {
  var updateString = '';
  this.newsItems.forEach(function(newsItem){
    if(newsItem.isUpdate()){
      updateString += newsItem.toString();
    }
  });
  if(updateString === '')
    return util.format("%sOperator, there are no updates at the moment%s", md.codeMulti, md.blockEnd);
  return updateString;
}

var NewsItem = function(data) {
  this.id = data._id.$id;
  this.date = new Date(1000 * data.Date.sec);
  if(data.EventStartDate) {
    this.startTime = new Date(1000 * data.EventStartDate.sec);
  }
  if(data.EventEndDate) {
    this.endTime = new Date(1000 * data.EventEndDate.sec);
  }
  this.message = data.Messages[0].Message;
  this.link = data.Prop;
  this.imageLink = data.ImageURL;
  this.priority = data.Priority;
}
NewsItem.prototype.isPrimeAccess = function() {
  var mlower = this.message.toLowerCase();
  return mlower.includes('access');
}
NewsItem.prototype.isUpdate = function() {
  var mlower = this.message.toLowerCase();
  return mlower.includes('update') || mlower.includes('hotfix');
}
NewsItem.prototype.toString = function() {
  return util.format('[%s] %s%s%s%s%s', this.getETAString(), md.linkBegin, this.message, md.linkMid, this.link, md.linkEnd);
}
NewsItem.prototype.getETAString = function() {
  var dateToUse = this.startTime || this.date;
  return dsUtil.timeDeltaToString(Math.abs(Date.now()-dateToUse.getTime()));
}

module.exports = News;
