'use strict';

const mdConfig = require('node-md-config');
const sortieData = require('warframe-worldstate-data').sortie;

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
const EarthCycle = require('./EarthCycle.js');
const CetusCycle = require('./CetusCycle.js');
const Construction = require('./ConstructionProgress');
const WeeklyChallenge = require('./WeeklyChallenge');

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

const defaultDeps = {
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

function parseArray(ParserClass, dataArray, deps) {
  return dataArray.map(d => new ParserClass(d, deps));
}

/**
 * Parses Warframe Worldstate JSON
 */
class WorldState {
  /**
   * @param {string} json The worldstate JSON string
   * @param {Object} [deps] The options object
   */
  constructor(json, deps = defaultDeps) {
    if (typeof json !== 'string') {
      throw new TypeError('json needs to be a string');
    }
    const data = JSON.parse(json);

    /**
     * The date and time at which the World State was generated
     * @type {Date}
     */
    this.timestamp = new Date(data.Time * 1000);

    /**
     * The in-game news
     * @type {Array.<News>}
     */
    this.news = parseArray(deps.News, data.Events, deps);

    /**
     * The current events
     * @type {Array.<Event>}
     */
    this.events = parseArray(deps.Event, data.Goals, deps);

    /**
     * The current alerts
     * @type {Array.<Alert>}
     */
    this.alerts = parseArray(deps.Alert, data.Alerts, deps);

    /**
     * The current sortie
     * @type {Sortie}
     */
    [this.sortie] = parseArray(deps.Sortie, data.Sorties, deps);

    /**
     * The current syndicate missions
     * @type {Array.<SyndicateMission>}
     */
    this.syndicateMissions = parseArray(deps.SyndicateMission, data.SyndicateMissions, deps);

    /**
     * The current fissures
     * @type {Array.<News>}
     */
    this.fissures = parseArray(deps.Fissure, data.ActiveMissions, deps);

    /**
     * The current global upgrades
     * @type {Array.<GlobalUpgrade>}
     */
    this.globalUpgrades = parseArray(deps.GlobalUpgrade, data.GlobalUpgrades, deps);

    /**
     * The current flash sales
     * @type {Array.<FlashSale>}
     */
    this.flashSales = parseArray(deps.FlashSale, data.FlashSales, deps);

    /**
     * The current invasions
     * @type {Array.<Invasion>}
     */
    this.invasions = parseArray(deps.Invasion, data.Invasions, deps);

    /**
     * The state of the dark sectors
     * @type {Array.<DarkSector>}
     */
    this.darkSectors = parseArray(deps.DarkSector, data.BadlandNodes, deps);

    /**
     * The state of the Void Trader
     * @type {VoidTrader}
     */
    [this.voidTrader] = parseArray(deps.VoidTrader, data.VoidTraders, deps);

    /**
     * The current daily deals
     * @type {Array.<DailyDeal>}
     */
    this.dailyDeals = parseArray(deps.DailyDeal, data.DailyDeals, deps);

    /**
     * The state of the sanctuary synthesis targets
     * @type {Simaris}
     */
    this.simaris = new deps.Simaris(data.LibraryInfo, deps);

    /**
     * The current conclave challenges
     * @type {Array.<ConclaveChallenge>}
     */
    this.conclaveChallenges = parseArray(deps.ConclaveChallenge, data.PVPChallengeInstances, deps);

    /**
     * The currently active persistent enemies
     * @type {Array.<PersistentEnemy>}
     */
    this.persistentEnemies = parseArray(deps.PersistentEnemy, data.PersistentEnemies, deps);

    /**
     * The current earth cycle
     * @type {EarthCycle}
     */
    this.earthCycle = new EarthCycle(deps);

    const cetusSynd = data.SyndicateMissions
      .filter(syndicate => syndicate.Tag === 'CetusSyndicate');
    const cetusBountyEnd = timeDate
      .parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: 0 });

    /**
     * The current earth cycle
     * @type {CetusCycle}
     */
    this.cetusCycle = new CetusCycle(cetusBountyEnd, deps);

    const projectPCTwithOid = {
      ProjectPct: data.ProjectPct,
      _id: {
        $oid: `${Date.now()}${data.ProjectPct[0]}`,
      },
    };

    if (data.WeeklyChallenges) {
      this.weeklyChallenges = new WeeklyChallenge(data.WeeklyChallenges, deps);
    } else {
      this.weeklyChallenges = [];
    }

    /**
     * The Current construction progress for Fomorians/Razorback/etc.
     * @type {Construction}
     */
    this.constructionProgress = new Construction(projectPCTwithOid, deps);
  }
}

module.exports = WorldState;
