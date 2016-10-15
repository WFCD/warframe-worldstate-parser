'use strict';

const News = require('./News.js');
const Event = require('./Event.js');
const Alert = require('./Alert.js');
const Sortie = require('./Sortie.js');
const SortieVariant = require('./SortieVariant.js');
const SyndicateMission = require('./SyndicateMission.js');
const Fissure = require('./Fissure.js');
const GlobalUpgrade = require('./GlobalUpgrade.js');
const FlashSale = require('./FlashSale.js');
const Invasion = require('./Invasion.js');
const DarkSector = require('./DarkSector.js');
const DarkSectorBattle = require('./DarkSectorBattle.js');
const Mission = require('./Mission.js');
const Reward = require('./Reward.js');
const VoidTrader = require('./VoidTrader.js');
const DailyDeal = require('./DailyDeal.js');
const Simaris = require('./Simaris.js');
const ConclaveChallenge = require('./ConclaveChallenge.js');
const PersistentEnemy = require('./PersistentEnemy.js');
const timeDate = require('./timeDate.js');
const translator = require('./translation.js');
const sortieData = require('warframe-worldstate-data').sortie;
const mdConfig = require('node-md-config');

/**
 * A collection of strings that are used by the parser to produce markdown-formatted text
 * @typedef {Object.<string>} MarkdownSettings
 * @property {string} lineEnd      - Line return character
 * @property {string} blockEnd     - Block end string
 * @property {string} doubleReturn - Double line return string
 * @property {string} linkBegin    - Link begin string
 * @property {string} linkMid      - Link middle string
 * @property {string} linkEnd      - Link end string
 * @property {string} bold         - String for denoting bold text
 * @property {string} italic       - String for denoting italicized text
 * @property {string} underline    - String for denoting underlined text
 * @property {string} strike       - String for denoting striked-through text
 * @property {string} codeLine     - String for denoting in-line code
 * @property {string} codeBlock    - String for denoting multi-line code blocks
 */

const defaultOpts = {
  News,
  Event,
  Alert,
  Sortie,
  SortieVariant,
  SyndicateMission,
  Fissure,
  GlobalUpgrade,
  FlashSale,
  Invasion,
  DarkSector,
  DarkSectorBattle,
  Mission,
  Reward,
  VoidTrader,
  DailyDeal,
  Simaris,
  ConclaveChallenge,
  PersistentEnemy,
  timeDate,
  translator,
  sortieData,
  mdConfig,
};

function parseArray(ParserClass, dataArray, opts) {
  return dataArray.map(d => new ParserClass(d, opts));
}

/**
 * Parses Warframe Worldstate JSON
 */
class Parser {
  /**
   * @param {string} json The worldstate JSON string
   * @param {Object} [opts] The options object
   */
  constructor(json, opts = defaultOpts) {
    if (typeof json !== 'string') {
      throw new TypeError('json needs to be a string');
    }
    const data = JSON.parse(json);

    this.timestamp = new Date(data.Time * 1000);

    this.news = parseArray(opts.News, data.Events, opts);
    this.events = parseArray(opts.Event, data.Goals, opts);
    this.alerts = parseArray(opts.Alert, data.Alerts, opts);
    this.sortie = parseArray(opts.Sortie, data.Sorties, opts)[0];
    this.syndicateMissions = parseArray(opts.SyndicateMission, data.SyndicateMissions, opts);
    this.fissures = parseArray(opts.Fissure, data.ActiveMissions, opts);
    this.globalUpgrades = parseArray(opts.GlobalUpgrade, data.GlobalUpgrades, opts);
    this.flashSales = parseArray(opts.FlashSale, data.FlashSales, opts);
    this.invasions = parseArray(opts.Invasion, data.Invasions, opts);
    this.darkSectors = parseArray(opts.DarkSector, data.BadlandNodes, opts);
    this.voidTrader = parseArray(opts.VoidTrader, data.VoidTraders, opts)[0];
    this.dailyDeals = parseArray(opts.DailyDeal, data.DailyDeals, opts);
    this.simaris = new opts.Simaris(data.LibraryInfo, opts);
    this.conclaveChallenges = parseArray(opts.ConclaveChallenge, data.PVPChallengeInstances, opts);
    this.persistentEnemies = parseArray(opts.PersistentEnemy, data.PersistentEnemies, opts);
  }
}

module.exports = Parser;
