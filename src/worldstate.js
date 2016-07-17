var Events = require('./modules/events.js');
var News = require('./modules/news.js');
var Sorties = require('./modules/sortie.js');
var GlobalModifiers = require('./modules/globalModifiers.js');
var DarkSectors = require('./modules/badlands.js');
var Challenges = require('./modules/conclave.js');
var Enemies = require('./modules/persistentEnemy.js');
var Fissures = require('./modules/voidFissure.js');

var Invasion = require('./modules/invasion.js');
var Alerts = require('./modules/alert.js');
var VoidTrader = require('./modules/baro.js');
var Deals = require('./modules/deal.js');
var FlashDeals = require('./modules/flashDeals.js');


WorldState = function(data, platform) {
  this.data = data;
  this.platform = platform;
  if(this.data.Goals)
    this.events = new Events(data.Goals);
  this.news = new News(data.Events);
  this.sorties = new Sorties(data.Sorties[0]);
  this.globalModifiers = new GlobalModifiers(data.GlobalUpgrades);
  this.conclaveChallenge = new Challenges(data.PVPChallengeInstances);
  this.enemies = new Enemies(data.PersistentEnemies);
  if(typeof data.ActiveMissions !== 'undefined' && data.ActiveMissions !== null)
    this.fissures = new Fissures(data.ActiveMissions);

  this.creation = Date.now();

  /*
  this.darkSectors = new DarkSectors(data.BadlandNodes);
  this.invasion = new Invasion(data.Invasions);
  this.alerts =  new Alerts(data.Alerts);
  this.voidTrader = new VoidTrader(data.VoidTraders[0]);
  this.deals = new Deals(data.DailyDeals);
  this.flashDeals = new FlashDeals(data.FlashSales);
  */
}

module.exports = WorldState;
