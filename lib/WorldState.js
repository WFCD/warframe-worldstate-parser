import wsData from 'warframe-worldstate-data';

import EarthCycle from './models/EarthCycle.js';
import CetusCycle from './models/CetusCycle.js';
import ConstructionProgress from './models/ConstructionProgress.js';
import VallisCycle from './models/VallisCycle.js';
import ZarimanCycle from './models/ZarimanCycle.js';
import Nightwave from './models/Nightwave.js';
import Kuva from './models/Kuva.js';
import SentientOutpost from './models/SentientOutpost.js';
import CambionCycle from './models/CambionCycle.js';
import SteelPathOffering from './models/SteelPathOffering.js';
import Dependency from './supporting/Dependency.js'; // eslint-disable-line no-unused-vars
import DuviriCycle from './models/DuviriCycle.js';
import { parseDate } from './utilities/timeDate.js';
import WeeklyChallenge from './models/WeeklyChallenge.js';
import Sortie from './models/Sortie.js';
import DuviriChoice from './supporting/DuviriChoice.js';
import VoidTrader from './models/VoidTrader.js';
import PersistentEnemy from './models/PersistentEnemy.js';
import ConclaveChallenge from './models/ConclaveChallenge.js';
import Simaris from './models/Simaris.js';
import DailyDeal from './models/DailyDeal.js';
import DarkSector from './models/DarkSector.js';
import Invasion from './models/Invasion.js';
import FlashSale from './models/FlashSale.js';
import GlobalUpgrade from './models/GlobalUpgrade.js';
import Fissure from './models/Fissure.js';
import SyndicateMission from './models/SyndicateMission.js';
import Alert from './models/Alert.js';
import WorldEvent from './models/WorldEvent.js';
import News from './models/News.js';

const { sortieData } = wsData;

const safeArray = (arr) => arr || [];
const safeObj = (obj) => obj || {};

/**
 * Default Dependency object
 * @type {Dependency}
 */
const defaultDeps = {
  sortieData,
  locale: 'en',
  logger: console,
};

/**
 *
 * @param {object} ParserClass class for parsing data
 * @param {Array<BaseContentObject>} dataArray array of raw data
 * @param {Dependency} deps shared dependency object
 * @param {*} [uniqueField] field to treat as unique
 * @returns {WorldstateObject[]} array of parsed objects
 */
export function parseArray(ParserClass, dataArray, deps, uniqueField) {
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
export default class WorldState {
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
      News,
      data.Events
        ? data.Events.filter((e) => typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !== 'undefined')
        : [],
      deps
    );

    /**
     * The current events
     * @type {Array.<WorldEvent>}
     */
    this.events = parseArray(WorldEvent, data.Goals, deps);

    /**
     * The current alerts
     * @type {Array.<Alert>}
     */
    this.alerts = parseArray(Alert, data.Alerts, deps);

    /**
     * The current sortie
     * @type {Sortie}
     */
    [this.sortie] = parseArray(Sortie, data.Sorties, deps);

    /**
     * The current syndicate missions
     * @type {Array.<SyndicateMission>}
     */
    this.syndicateMissions = parseArray(SyndicateMission, data.SyndicateMissions, deps, 'syndicate');

    /**
     * The current fissures: 'ActiveMissions' & 'VoidStorms'
     * @type {Array.<Fissure>}
     */
    this.fissures = parseArray(Fissure, data.ActiveMissions, deps).concat(parseArray(Fissure, data.VoidStorms, deps));

    /**
     * The current global upgrades
     * @type {Array.<GlobalUpgrade>}
     */
    this.globalUpgrades = parseArray(GlobalUpgrade, data.GlobalUpgrades, deps);

    /**
     * The current flash sales
     * @type {Array.<FlashSale>}
     */
    this.flashSales = parseArray(FlashSale, data.FlashSales, deps);

    /**
     * The current invasions
     * @type {Array.<Invasion>}
     */
    this.invasions = parseArray(Invasion, data.Invasions, deps);

    /**
     * The state of the dark sectors
     * @type {Array.<DarkSector>}
     */
    this.darkSectors = parseArray(DarkSector, data.BadlandNodes, deps);

    /**
     * The state of all Void Traders
     * @type {VoidTrader[]}
     */
    this.voidTraders = parseArray(VoidTrader, data.VoidTraders, deps).sort(
      (a, b) => Date.parse(a.activation) - Date.parse(b.activation)
    );

    /**
     * The state of the Void Trader
     * @type {VoidTrader}
     * @deprecated
     */
    [this.voidTrader] = this.voidTraders;

    /**
     * The current daily deals
     * @type {Array.<DailyDeal>}
     */
    this.dailyDeals = parseArray(DailyDeal, data.DailyDeals, deps);

    /**
     * The state of the sanctuary synthesis targets
     * @type {Simaris}
     */
    this.simaris = new Simaris(safeObj(data.LibraryInfo), deps);

    /**
     * The current conclave challenges
     * @type {Array.<ConclaveChallenge>}
     */
    this.conclaveChallenges = parseArray(ConclaveChallenge, data.PVPChallengeInstances, deps);

    /**
     * The currently active persistent enemies
     * @type {Array.<PersistentEnemy>}
     */
    this.persistentEnemies = parseArray(PersistentEnemy, data.PersistentEnemies, deps);

    /**
     * The current earth cycle
     * @type {EarthCycle}
     */
    this.earthCycle = new EarthCycle(deps);

    const cetusSynd = safeArray(data.SyndicateMissions).filter((syndicate) => syndicate.Tag === 'CetusSyndicate');
    const cetusBountyEnd = parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: 0 });

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
    const zarimanBountyEnd = parseDate(zarimanSynd.length > 0 ? zarimanSynd[0].Expiry : { $date: 0 });

    /**
     * The current Zariman cycle based off current time
     * @type {ZarimanCycle}
     */
    this.zarimanCycle = new ZarimanCycle(zarimanBountyEnd, deps);

    /**
     * Weekly challenges
     * @type {Array.<WeeklyChallenge>}
     */
    this.weeklyChallenges = data.WeeklyChallenges ? new WeeklyChallenge(data.WeeklyChallenges, deps) : [];

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

    [this.vaultTrader] = parseArray(VoidTrader, data.PrimeVaultTraders, deps);

    /**
     * The current archon hunt
     * @type {Sortie}
     */
    [this.archonHunt] = parseArray(Sortie, data.LiteSorties, deps);

    deps.duviriChoices = parseArray(DuviriChoice, data.EndlessXpChoices, deps);

    this.duviriCycle = new DuviriCycle(deps);
  }
}
