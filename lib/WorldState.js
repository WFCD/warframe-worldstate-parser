import sortieData from 'warframe-worldstate-data/data/sortieData.json' assert { type: 'json' };
import Alert from './Alert.js';
import CambionCycle from './CambionCycle.js';
import CetusCycle from './CetusCycle.js';
import ConclaveChallenge from './ConclaveChallenge.js';
import ConstructionProgress from './ConstructionProgress.js';
import DailyDeal from './DailyDeal.js';
import DarkSector from './DarkSector.js';
import DarkSectorBattle from './DarkSectorBattle.js';
import EarthCycle from './EarthCycle.js';
import Fissure from './Fissure.js';
import FlashSale from './FlashSale.js';
import GlobalUpgrade from './GlobalUpgrade.js';
import Invasion from './Invasion.js';
import Kuva from './Kuva.js';
import Mission from './Mission.js';
import News from './News.js';
import Nightwave from './Nightwave.js';
import PersistentEnemy from './PersistentEnemy.js';
import Reward from './Reward.js';
import SentientOutpost from './SentientOutpost.js';
import Simaris from './Simaris.js';
import Sortie from './Sortie.js';
import SortieVariant from './SortieVariant.js';
import SteelPathOffering from './SteelPathOffering.js';
import SyndicateMission from './SyndicateMission.js';
import VallisCycle from './VallisCycle.js';
import VoidTrader from './VoidTrader.js';
import WeeklyChallenge from './WeeklyChallenge.js';
import WorldEvent from './WorldEvent.js';

// Utils
import * as timeDate from './timeDate.js';
import * as translator from './translation.js';
// needed for type declarations
/* eslint-disable no-unused-vars */
import Dependency from './supporting/Dependency.js';
import ExternalMission from './supporting/ExternalMission.js';
import MarkdownSettings from './supporting/MarkdownSettings.js';

// JSON Data
/* eslint-enable no-unused-vars */

const safeArray = (arr) => (arr || []);
const safeObj = (obj) => (obj || {});

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
     * @type {Array.<News>}
     */
    this.fissures = parseArray(deps.Fissure, data.ActiveMissions, deps)
      .concat(parseArray(deps.Fissure, data.VoidStorms, deps));

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

    /**
     * Cambion Drift Cycle
     * @type {CambionCycle}
     */
    this.cambionCycle = new CambionCycle(this.cetusCycle, deps);

    /**
     * Weekly challenges
     * @type {Array.<WeeklyChallenge>}
     */
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
  }
}

export default WorldState;
