var request = require('request');

var Events = require('./modules/events.js');
var News = require('./modules/news.js');
var Sorties = require('./modules/sortie.js');
var GlobalModifiers = require('./modules/globalModifiers.js');
var DarkSectors = require('./modules/badlands.js');
var Challenges = require('./modules/conclave.js');
var Enemies = require('./modules/persistentEnemy.js');

var Invasion = require('./modules/invasion.js');
var Alerts = require('./modules/alert.js');
var VoidTrader = require('./modules/baro.js');
var Deals = require('./modules/deal.js');
var FlashDeals = require('./modules/flashDeals.js');

var maxCachedTime = process.env.WORLDSTATE_CACHE_LENGTH || 300000;

const platformURL = {
  PC: 'http://content.warframe.com/dynamic/worldState.php',
  PS4: 'http://content.ps4.warframe.com/dynamic/worldState.php',
  X1: 'http://content.xb1.warframe.com/dynamic/worldState.php'
}

var Worldstate = function (wsplatform) {
  var platform = wsplatform;
  var data = undefined;
  var events = undefined;
  var news = undefined;
  var sorties = undefined;
  var globalModifiers = undefined;
  var creation = undefined;
  this.getWorldState(platform, this.setup);
}

Worldstate.prototype.setup = function(err, data, wsplatform) {
  if(err) {
    console.error(err);
    return;
  }
  this.platform = wsplatform;
  this.data = data;
  if(this.data.Goals)
    this.events = new Events(data.Goals);
  this.news = new News(data.Events);
  this.sorties = new Sorties(data.Sorties[0]);
  this.globalModifiers = new GlobalModifiers(data.GlobalUpgrades);
  this.conclaveChallenge = new Challenges(data.PVPChallengeInstances);
  this.enemies = new Enemies(data.PersistentEnemies);

  /*
  this.darkSectors = new DarkSectors(data.BadlandNodes);
  this.invasion = new Invasion(data.Invasions);
  this.alerts =  new Alerts(data.Alerts);
  this.voidTrader = new VoidTrader(data.VoidTraders[0]);
  this.deals = new Deals(data.DailyDeals);
  this.flashDeals = new FlashDeals(data.FlashSales);*/
  this.creation = Date.now();
}

Worldstate.prototype.getWorldState = function(platform, callback) {
  request.get(platformURL[platform], function(err, response, body) {
    if(err) {
      console.error(err);
    }
    if(response.statusCode !== 200) {
      var error
      error = new Error(url + ' returned HTTP status ' + response.statusCode)
      console.error(error);
    }
    var data

    try {
      data = JSON.parse(body);
    } catch(e) {
      data = null;
    }

    if(!data) {
      var error
      error = new Error('Invalid JSON from ' + url);
      console.error(err);
    }
    callback(null, data, platform);
  });
}

Worldstate.prototype.checkExpired = function(platform) {
 if(typeof this.creation === 'undefined' 
     || this.creation.getMilliseconds() - Date.now() > maxCachedTime
     || typeof this.data === 'undefined' 
     || typeof this.events === 'undefined' 
     || typeof this.sorties === 'undefined'
     || typeof this.globalModifiers === 'undefined'
     || typeof this.conclaveChallenge === 'undefined'
   ){
      this.getWorldState(platform, this.setup);
    }
}

//Sortie
Worldstate.prototype.getSortie = function(){
  this.checkExpired(platform);
  return sorties;
}
Worldstate.prototype.getSortieString = function(){
  this.checkExpired(platform);
  return sorties.toString();
}

//Conclave
Worldstate.prototype.getConclaveDailies = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getDailies();
}
Worldstate.prototype.getConclaveDailiesString = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getDailiesAsString();
}
Worldstate.prototype.getConclaveWeeklies = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getConclaveWeeklies();
}
Worldstate.prototype.getConclaveWeekliesString = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getWeekliesAsString();
}
Worldstate.prototype.getConclaveAll = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getConclaveAll();
}
Worldstate.prototype.getConclaveAllString = function(){
  this.checkExpired(platform);
  return conclaveChallenge.getAllAsString();
}

//Persistent enemies
Worldstate.prototype.getAllPersistentEnemies = function() {
  this.checkExpired(platform);
  return enemies.getAll();
}
Worldstate.prototype.getAllPersistentEnemiesString = function() {
  this.checkExpired(platform);
  return enemies.getAllAsString();
}
Worldstate.prototype.getDisoveredPersistentEnemies = function() {
  this.checkExpired(platform);
  return enemies.getDiscovered();
}
Worldstate.prototype.getDisoveredPersistentEnemiesString = function() {
  this.checkExpired(platform);
  return enemies.getDiscoveredAsString();
}
Worldstate.prototype.getHiddenPersistentEnemies = function() {
  this.checkExpired(platform);
  return enemies.getHidden();
}
Worldstate.prototype.getHiddenPersistentEnemies = function() {
  this.checkExpired(platform);
  return enemies.getHiddenAsString();
}

//events
Worldstate.prototype.getEvents = function() {
  this.checkExpired(platform);
  return events.getAll();
}
Worldstate.prototype.getEventsString = function() {
  this.checkExpired(platform);
  return events.toString();
}

//news
Worldstate.prototype.getNews = function() {
  this.checkExpired(platform);
  return news.getAll();
}
Worldstate.prototype.getNewsString = function() {
  this.checkExpired(platform);
  return news.toString();
}
Worldstate.prototype.getUpdates = function() {
  this.checkExpired(platform);
  return news.getUpdates();
}
Worldstate.prototype.getUpdatesString = function() {
  this.checkExpired(platform);
  return news.getUpdatesString();
}
Worldstate.prototype.getPrimeAccess = function() {
  this.checkExpired(platform);
  return news.getPrimeAccess();
}
Worldstate.prototype.getPrimeAccessString = function() {
  this.checkExpired(platform);
  return news.getPrimeAccessString();
}

//invasions
Worldstate.prototype.getInvasions = function(){
  this.checkExpired(platform);
  return invasion;
}
Worldstate.prototype.getInvasionsString = function(){
  this.checkExpired(platform);
  return invasion.toString();
}

//alerts
Worldstate.prototype.getAlerts = function() {
  this.checkExpired(platform);
  return alerts.getAll();
}
Worldstate.prototype.getAlertsString = function () {
  this.checkExpired(platform);
  return alerts.getAllString();
}

//baro
Worldstate.prototype.getVoidTrader = function() {
  this.checkExpired(platform);
  return voidTrader;
}
Worldstate.prototype.getVoidTraderString = function() {
  this.checkExpired(platform);
  return voidTrader.toString();
}

//darvo
Worldstate.prototype.getDeals = function(){
  this.checkExpired(platform);
  return deals;
}
Worldstate.prototype.getDealsString = function() {
  this.checkExpired(platform);
  return deals.toString();
}

//flash deals
Worldstate.prototype.getFlashDeals = function() {
  this.checkExpired(platform);
  return flashDeals;
}
Worldstate.prototype.getFlashDealsString = function() {
  this.checkExpired(platform);
  return flashDeals.toString();
}

//Dark sectors
Worldstate.prototype.getDarkSectors = function() {
  this.checkExpired(platform);
  return darkSectors.getAll();
}
Worldstate.prototype.getDarkSectorsString = function() {
  this.checkExpired(platform);
  return darkSectors.toString();
}

//Global Modifiers
Worldstate.prototype.getGlobalModifers = function() {
  this.checkExpired(platform);
  return globalModifiers.getAll();
}
Worldstate.prototype.getGlobalModifersString = function() {
  this.checkExpired(platform);
  return globalModifiers.toString();
}

module.exports = Worldstate;