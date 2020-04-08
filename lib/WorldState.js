'use strict';

const mdConfig = require('node-md-config');
const sortieData = require('warframe-worldstate-data').sortie;

const News = require('./News.js');
const WorldEvent = require('./WorldEvent.js');
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
const ConstructionProgress = require('./ConstructionProgress');
const VallisCycle = require('./VallisCycle');
const WeeklyChallenge = require('./WeeklyChallenge');
const Nightwave = require('./Nightwave');
const Kuva = require('./Kuva');
const SyndicateOutpost = require('./SentientOutpost');

const safeArray = (arr) => (arr || []);
const safeObj = (obj) => (obj || {});

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

/**
 * Dependency Object
 * @typedef {Object} Dependency
 * @property   {MarkdownSettings}   mdConfig   The markdown settings
 * @property   {Translator}         translator The string translator
 * @property   {TimeDateFunctions}  timeDate   The time and date functions
 * @property   {Mission}            Mission    The Mission parser
 * @property   {Reward}             Reward     The Reward parser
 * @property   {string}             locale     Locale to use for translations
 * @property   {object}             logger     Generic logger to use if needed
 */

/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 * @typedef {Object} ExternalMission
 * @property {Date} activation start time
 * @property {Date} expiry end timer
 * @property {string} node formatted node name with planet
 * @property {string} enemy Enemy on tile
 * @property {string} type Mission type of node
 * @property {boolean} archwing whether or not the tile requires archwing
 * @property {boolean} sharkwing whether or not the tile requires
 *    sumbersible archwing
 */

/**
 * Default Dependency object
 * @type {Dependency}
 */
const defaultDeps = {
  News,
  WorldEvent,
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
  WeeklyChallenge,
  timeDate,
  translator,
  sortieData,
  mdConfig,
  locale: 'en',
  logger: console,
};

function parseArray(ParserClass, dataArray, deps, uniqueField) {
  const arr = (dataArray || []).map((d) => new ParserClass(d, deps));
  if (uniqueField) {
    const utemp = {};
    arr.sort((a, b) => a.id.localeCompare((b.id)));
    arr.forEach((obj) => {
      utemp[obj[uniqueField]] = obj;
    });
    return Array.from(arr).filter((obj) => {
      if (Object.prototype.hasOwnProperty.call(obj, 'active')) {
        return obj.active;
      }
      if (Object.prototype.hasOwnProperty.call(obj, 'expired')) {
        return obj.expired;
      }
      return true;
    });
  }
  return arr;
}

/**
 * Parses Warframe Worldstate JSON
 */
class WorldState {
  /**
   * Generates the worldstate json as a string into usable objects
   * @param {string} json The worldstate JSON string
   * @param {Dependency} [deps] The options object
   */
  constructor(json, deps = defaultDeps) {
    if (typeof json !== 'string') {
      throw new TypeError(`json needs to be a string, provided ${typeof json} : ${JSON.stringify(json)}`);
    }
    const data = JSON.parse(json);

    // eslint-disable-next-line no-param-reassign
    deps = {
      ...defaultDeps,
      ...deps,
    };

    /**
     * The date and time at which the World State was generated
     * @type {Date}
     */
    this.timestamp = new Date(data.Time * 1000);

    /**
     * The in-game news
     * @type {Array.<News>}
     */
    this.news = parseArray(deps.News, (data.Events
      ? data.Events.filter((e) => typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !== 'undefined')
      : []), deps);

    /**
     * The current events
     * @type {Array.<Event>}
     */
    this.events = parseArray(deps.WorldEvent, data.Goals, deps);

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
    this.syndicateMissions = parseArray(deps.SyndicateMission, data.SyndicateMissions, deps, 'syndicate');

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
    this.simaris = new deps.Simaris(safeObj(data.LibraryInfo), deps);

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

    const cetusSynd = safeArray(data.SyndicateMissions)
      .filter((syndicate) => syndicate.Tag === 'CetusSyndicate');
    const cetusBountyEnd = timeDate
      .parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: 0 });

    /**
     * The current Cetus cycle
     * @type {CetusCycle}
     */
    this.cetusCycle = new CetusCycle(cetusBountyEnd, deps);

    this.weeklyChallenges = data.WeeklyChallenges
      ? new deps.WeeklyChallenge(data.WeeklyChallenges, deps)
      : [];

    const projectPCTwithOid = data.ProjectPct ? {
      ProjectPct: data.ProjectPct,
      _id: {
        $oid: `${Date.now()}${data.ProjectPct[0]}`,
      },
    } : undefined;

    /**
     * The Current construction progress for Fomorians/Razorback/etc.
     * @type {ConstructionProgress}
     */
    this.constructionProgress = projectPCTwithOid
      ? new ConstructionProgress(projectPCTwithOid, deps)
      : {};

    /**
     * The current Orb Vallis cycle state
     * @type {VallisCycle}
     */
    this.vallisCycle = new VallisCycle(deps);

    /**
     * The current nightwave season
     * @type {Nightwave}
     */
    if (data.SeasonInfo) {
      this.nightwave = new Nightwave(data.SeasonInfo, deps);
    }

    const externalMissions = new Kuva(deps);

    ({
      /**
       * Kuva missions array
       * @type {ExternalMission[]}
       */
      kuva: this.kuva,
      /**
       * Arbitration mission
       * @type {ExternalMission}
       */
      arbitration: this.arbitration,
    } = externalMissions);

    /**
     * Current syndicate outposts
     * @type {SyndicateOutpost}
     */
    this.sentientOutposts = new SyndicateOutpost(data.Tmp, deps);
  }
}

module.exports = WorldState;
