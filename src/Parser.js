'use strict';

const News = require('./News.js');
const Event = require('./Event.js');
const Alert = require('./Alert.js');
const Sortie = require('./Sortie.js');
const SyndicateMission = require('./SyndicateMission.js');
const Fissure = require('./Fissure.js');
const GlobalUpgrade = require('./GlobalUpgrade.js');
const FlashSale = require('./FlashSale.js');
const Invasion = require('./Invasion.js');
const DarkSector = require('./DarkSector.js');
const VoidTrader = require('./VoidTrader.js');
const DailyDeal = require('./DailyDeal.js');
const Simaris = require('./Simaris.js');
const ConclaveChallenge = require('./ConclaveChallenge.js');
const PersistentEnemy = require('./PersistentEnemy.js');

const defaultParsers = {
  News,
  Event,
  Alert,
  Sortie,
  SyndicateMission,
  Fissure,
  GlobalUpgrade,
  FlashSale,
  Invasion,
  DarkSector,
  VoidTrader,
  DailyDeal,
  Simaris,
  ConclaveChallenge,
  PersistentEnemy,
};

function parseArray(ParserClass, dataArray) {
  return dataArray.map(d => new ParserClass(d));
}

/**
 * Parses Warframe Worldstate JSON
 */
class Parser {
  /**
   * @param {string} json The worldstate JSON string
   * @param {Object} [parsers] The data parsers
   */
  constructor(json, parsers = defaultParsers) {
    if (typeof json !== 'string') {
      throw new TypeError('json needs to be a string');
    }
    const data = JSON.parse(json);

    this.timestamp = new Date(data.Time * 1000);

    this.news = parseArray(parsers.News, data.Events);
    this.events = parseArray(parsers.Event, data.Goals);
    this.alerts = parseArray(parsers.Alert, data.Alerts);
    this.sorties = parseArray(parsers.Sortie, data.Sorties);
    this.syndicateMissions = parseArray(parsers.SyndicateMission, data.SyndicateMissions);
    this.fissures = parseArray(parsers.Fissure, data.ActiveMissions);
    this.globalUpgrades = parseArray(parsers.GlobalUpgrade, data.GlobalUpgrades);
    this.flashSales = parseArray(parsers.FlashSale, data.FlashSales);
    this.invasions = parseArray(parsers.Invasion, data.Invasions);
    this.darkSectors = parseArray(parsers.DarkSector, data.BadlandNodes);
    this.voidTrader = new parsers.VoidTrader(data.VoidTraders[0]);
    this.dailyDeals = parseArray(parsers.DailyDeal, data.DailyDeals);
    this.simaris = parseArray(parsers.Simaris, data.LibraryInfo);
    this.conclaveChallenges = parseArray(parsers.ConclaveChallenge, data.PVPChallengeInstances);
    this.persistentEnemies = parseArray(parsers.PersistentEnemy, data.PersistentEnemies);
  }
}

module.exports = Parser;
