'use strict';

const sortieData = require('warframe-worldstate-data').sortie;

const News = require('./models/News');
const WorldEvent = require('./models/WorldEvent');
const Alert = require('./models/Alert');
const Sortie = require('./models/Sortie');
const SortieVariant = require('./models/SortieVariant');
const SyndicateMission = require('./models/SyndicateMission');
const Fissure = require('./models/Fissure');
const GlobalUpgrade = require('./models/GlobalUpgrade');
const FlashSale = require('./models/FlashSale');
const Invasion = require('./models/Invasion');
const DarkSector = require('./models/DarkSector');
const DarkSectorBattle = require('./models/DarkSectorBattle');
const Mission = require('./models/Mission');
const Reward = require('./models/Reward');
const VoidTrader = require('./models/VoidTrader');
const DailyDeal = require('./models/DailyDeal');
const Simaris = require('./models/Simaris');
const ConclaveChallenge = require('./models/ConclaveChallenge');
const PersistentEnemy = require('./models/PersistentEnemy');
const timeDate = require('./utilities/timeDate');
const translator = require('./utilities/translation');
const EarthCycle = require('./models/EarthCycle');
const CetusCycle = require('./models/CetusCycle');
const ConstructionProgress = require('./models/ConstructionProgress');
const VallisCycle = require('./models/VallisCycle');
const ZarimanCycle = require('./models/ZarimanCycle');
const WeeklyChallenge = require('./models/WeeklyChallenge');
const Nightwave = require('./models/Nightwave');
const Kuva = require('./models/Kuva');
const SentientOutpost = require('./models/SentientOutpost');
const CambionCycle = require('./models/CambionCycle');
const SteelPathOffering = require('./models/SteelPathOffering');
const Dependency = require('./supporting/Dependency'); // eslint-disable-line no-unused-vars
const DuviriCycle = require('./models/DuviriCycle');

// needed for type declarations
const MarkdownSettings = require('./supporting/MarkdownSettings');

const safeArray = (arr) => arr || [];
const safeObj = (obj) => obj || {};

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
  mdConfig: new MarkdownSettings(),
  locale: 'en',
  logger: console,
};

/**
 *
 * @param {Object} ParserClass class for parsing data
 * @param {Array<BaseContentObject>} dataArray array of raw data
 * @param {Dependency} deps shared dependency object
 * @param {*} [uniqueField] field to treat as unique
 * @returns {WorldstateObject[]}
 */
function parseArray(ParserClass, dataArray, deps, uniqueField) {
  const arr = (dataArray || []).map((d) => new ParserClass(d, deps));
  if (uniqueField) {
    const utemp = {};
    arr.sort((a, b) => a.id.localeCompare(b.id));
    arr.forEach((obj) => {
      utemp[obj[uniqueField]] = obj;
    });
    return Array.from(arr).filter((obj) => {
      if (obj && obj.active && typeof obj.active !== 'undefined') return obj.active;
      /* istanbul ignore next */
      return true;
    });
  }
  return arr;
}

/**
 * Parses Warframe Worldstate JSON
 */
module.exports = class WorldState {
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
    this.news = parseArray(
      deps.News,
      data.Events
        ? data.Events.filter((e) => typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !== 'undefined')
        : [],
      deps
    );

    /**
     * The current events
     * @type {Array.<WorldEvent>}
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
     * The current fissures: 'ActiveMissions' & 'VoidStorms'
     * @type {Array.<Fissure>}
     */
    this.fissures = parseArray(deps.Fissure, data.ActiveMissions, deps).concat(
      parseArray(deps.Fissure, data.VoidStorms, deps)
    );

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

    const cetusSynd = safeArray(data.SyndicateMissions).filter((syndicate) => syndicate.Tag === 'CetusSyndicate');
    const cetusBountyEnd = timeDate.parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: 0 });

    /**
     * The current Cetus cycle
     * @type {CetusCycle}
     */
    this.cetusCycle = new CetusCycle(cetusBountyEnd, deps);

    /**
     * Cambion Drift Cycle
     * @type {CambionCycle}
     */
    this.cambionCycle = new CambionCycle(this.cetusCycle, deps);

    const zarimanSynd = safeArray(data.SyndicateMissions).filter((syndicate) => syndicate.Tag === 'ZarimanSyndicate');
    const zarimanBountyEnd = timeDate.parseDate(zarimanSynd.length > 0 ? zarimanSynd[0].Expiry : { $date: 0 });

    /**
     * The current Zariman cycle based off current time
     * @type {ZarimanCycle}
     */
    this.zarimanCycle = new ZarimanCycle(zarimanBountyEnd, deps);

    /**
     * Weekly challenges
     * @type {Array.<WeeklyChallenge>}
     */
    this.weeklyChallenges = data.WeeklyChallenges ? new deps.WeeklyChallenge(data.WeeklyChallenges, deps) : [];

    const projectPCTwithOid = data.ProjectPct
      ? {
          ProjectPct: data.ProjectPct,
          _id: {
            $oid: `${Date.now()}${data.ProjectPct[0]}`,
          },
        }
      : undefined;

    /**
     * The Current construction progress for Fomorians/Razorback/etc.
     * @type {ConstructionProgress}
     */
    this.constructionProgress = projectPCTwithOid ? new ConstructionProgress(projectPCTwithOid, deps) : {};

    /**
     * The current Orb Vallis cycle state
     * @type {VallisCycle}
     */
    this.vallisCycle = new VallisCycle(deps);

    if (data.SeasonInfo) {
      /**
       * The current nightwave season
       * @type {Nightwave}
       */
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

    if (!this.arbitration || !Object.keys(this.arbitration).length) {
      this.arbitration = undefined;
    }

    /**
     * Current syndicate outposts
     * @type {SentientOutpost}
     */
    this.sentientOutposts = new SentientOutpost(data.Tmp, deps);

    /**
     * Steel path offering rotation
     * @type {SteelPathOffering}
     */
    this.steelPath = new SteelPathOffering(deps);

    [this.vaultTrader] = parseArray(deps.VoidTrader, data.PrimeVaultTraders, deps);

    /**
     * The current archon hunt
     * @type {Sortie}
     */
    [this.archonHunt] = parseArray(deps.Sortie, data.LiteSorties, deps);

    this.duviriCycle = new DuviriCycle(deps);
  }
};
