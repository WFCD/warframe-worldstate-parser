import { createHash } from 'node:crypto';

import wsData from 'warframe-worldstate-data';
import { parseDate, weeklyReset } from 'warframe-worldstate-data/utilities';

import EarthCycle from './models/EarthCycle';
import CetusCycle from './models/CetusCycle';
import ConstructionProgress from './models/ConstructionProgress';
import VallisCycle from './models/VallisCycle';
import ZarimanCycle from './models/ZarimanCycle';
import Nightwave, { RawNightwave } from './models/Nightwave';
import Kuva from './models/Kuva';
import SentientOutpost from './models/SentientOutpost';
import CambionCycle from './models/CambionCycle';
import SteelPathOffering from './models/SteelPathOffering';
import Dependency from './supporting/Dependency'; // eslint-disable-line no-unused-vars
import DuviriCycle from './models/DuviriCycle';
import WeeklyChallenge, { RawWeeklyChallenge } from './models/WeeklyChallenge';
import Sortie, { RawSortie } from './models/Sortie';
import DuviriChoice, { RawChoice } from './supporting/DuviriChoice';
import VoidTrader, { RawVoidTrader } from './models/VoidTrader';
import PersistentEnemy, { RawPersistentEnemy } from './models/PersistentEnemy';
import ConclaveChallenge, { RawChallenge } from './models/ConclaveChallenge';
import Simaris, { LibraryInfo } from './models/Simaris';
import DailyDeal, { RawDailyDeal } from './models/DailyDeal';
import DarkSector, { RawDarkSector } from './models/DarkSector';
import Invasion, { RawInvasion } from './models/Invasion';
import FlashSale, { RawFlashSale } from './models/FlashSale';
import GlobalUpgrade, { RawGlobalUpgrade } from './models/GlobalUpgrade';
import Fissure, { RawFissure } from './models/Fissure';
import SyndicateMission, { RawSyndicateMission } from './models/SyndicateMission';
import Alert, { RawAlert } from './models/Alert';
import WorldEvent, { RawWorldEvent } from './models/WorldEvent';
import News, { RawNews } from './models/News';
import Kinepage from './models/Kinepage';
import Calendar, { RawCalender } from './models/Calendar';
import MidrathCycle from './models/MidrathCycle';
import WorldstateObject from './models/WorldstateObject';
import Archimedea, { RawArchimedea } from './models/Archidemea';
import ExternalMission from './supporting/ExternalMission';

const { sortie } = wsData;

const safeArray = <T>(arr: T[] | undefined) => (arr as T[]) || <T>[];
const safeObj = <T>(obj: T | undefined) => obj || ({} as T);

/**
 * Default Dependency object
 * @type {Dependency}
 */
const defaultDeps: Dependency = {
  sortieData: sortie,
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
export function parseArray<T, D extends object>(
  ParserClass: new (data: D, deps: Dependency) => T,
  dataArray: Array<D>,
  deps: Dependency,
  uniqueField?: keyof T
): T[] {
  const arr = (dataArray || []).map((d) => new ParserClass(d, deps));
  if (uniqueField) {
    const utemp: Record<string, T> = {};
    arr.sort((a: any, b: any) => (a.id || '').localeCompare(b.id || ''));
    arr.forEach((obj) => {
      const key = String(obj[uniqueField]);
      utemp[key] = obj;
    });
    return Array.from(arr).filter((obj: any) => {
      if (obj && obj.active && typeof obj.active !== 'undefined') return obj.active;
      /* istanbul ignore next */
      return true;
    });
  }
  return arr;
}

/**
 * Parse array of objects that requires async parsing
 * @param {object} ParserClass class for parsing data - must expose a static build method
 * @param {Array<BaseContentObject>} dataArray array of raw data
 * @param {Dependency} deps shared dependency object
 * @param {*} [uniqueField] field to treat as unique
 * @returns {Promise<WorldstateObject[]>} array of parsed objects
 */
export async function parseAsyncArray<T extends WorldstateObject, D extends object>(
  ParserClass: { build: (data: D, deps: Dependency) => Promise<T> },
  dataArray: Array<D>,
  deps: Dependency,
  uniqueField?: keyof T
): Promise<T[]> {
  const arr = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const d of dataArray ?? []) {
    arr.push(await ParserClass.build(d, deps));
  }
  if (uniqueField) {
    const utemp: Record<string, T> = {};
    arr.sort((a, b) => (a.id ?? '').localeCompare(b.id ?? ''));
    arr.forEach((obj) => {
      const key = String(obj[uniqueField]);
      utemp[key] = obj;
    });
    return Array.from(arr).filter((obj) => {
      if (obj && obj.active && typeof obj.active !== 'undefined') return obj.active;
      /* istanbul ignore next */
      return true;
    });
  }
  return arr;
}

export interface RawWorldState {
  Time: number;
  Events: RawNews[];
  Goals: RawWorldEvent[];
  Alerts: RawAlert[];
  Sorties: RawSortie[];
  LiteSorties: RawSortie[];
  SyndicateMissions: RawSyndicateMission[];
  ActiveMissions: RawFissure[];
  VoidStorms: RawFissure[];
  GlobalUpgrades: RawGlobalUpgrade[];
  FlashSales: RawFlashSale[];
  Invasions: RawInvasion[];
  BadlandNodes: RawDarkSector[];
  VoidTraders: RawVoidTrader[];
  DailyDeals: RawDailyDeal[];
  LibraryInfo?: LibraryInfo;
  PVPChallengeInstances: RawChallenge[];
  PersistentEnemies: RawPersistentEnemy[];
  WeeklyChallenges: RawWeeklyChallenge;
  ProjectPct: number[];
  SeasonInfo: RawNightwave;
  PrimeVaultTraders: RawVoidTrader[];
  EndlessXpChoices: RawChoice[];
  KnownCalendarSeasons: RawCalender[];
  Tmp: string;
}

export interface RawTmp {
  sfn: number;
  pgr: { [k: string]: string | number };
  lqo?: RawArchimedea;
  hqo?: RawArchimedea;
}

/**
 * Parses Warframe Worldstate JSON
 */
export class WorldState {
  events: WorldEvent[];
  syndicateMissions: SyndicateMission[];
  timestamp: Date;
  news: News[];
  alerts: Alert[];
  sortie: Sortie;
  fissures: Fissure[];
  globalUpgrades: GlobalUpgrade[];
  flashSales: FlashSale[];
  invasions: Invasion[];
  darkSectors: DarkSector[];
  voidTraders: VoidTrader[];
  voidTrader: VoidTrader;
  dailyDeals: DailyDeal[];
  simaris: Simaris;
  conclaveChallenges: ConclaveChallenge[];
  persistentEnemies: PersistentEnemy[];
  earthCycle: EarthCycle;
  cetusCycle: CetusCycle;
  cambionCycle: CambionCycle;
  zarimanCycle: ZarimanCycle;
  midrathCycle: MidrathCycle;
  weeklyChallenges?: WeeklyChallenge;
  constructionProgress: ConstructionProgress;
  vallisCycle: VallisCycle;
  nightwave: Nightwave | undefined;
  kuva: ExternalMission[] | undefined;
  arbitration: ExternalMission | undefined;
  sentientOutposts: SentientOutpost;
  steelPath: SteelPathOffering;
  vaultTrader: any;
  archonHunt: any;
  duviriCycle: DuviriCycle;
  kinepage: Kinepage;
  deepArchimedea: Archimedea | undefined;
  temporalArchimedea: Archimedea | undefined;
  calendar: Calendar;

  static async build(json: string, deps = defaultDeps): Promise<WorldState> {
    const data = JSON.parse(json);
    const ws = new WorldState(data, deps);

    ws.events = await parseAsyncArray(WorldEvent, data.Goals, deps);
    ws.syndicateMissions = await parseAsyncArray(SyndicateMission, data.SyndicateMissions, deps, 'syndicate');

    return ws;
  }

  /**
   * Generates the worldstate json as a string into usable objects
   * @param {string} json The worldstate JSON string
   * @param {Dependency} [deps] The options object
   * @class
   * @async
   */
  constructor(data: RawWorldState, deps: Dependency = defaultDeps) {
    const tmp: RawTmp = JSON.parse(data.Tmp);

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
      safeArray<RawNews>(data.Events).filter(
        (e) => typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !== 'undefined'
      ),
      deps
    );

    /**
     * The current events
     * @type {Array.<WorldEvent>}
     */
    this.events = [];

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
    this.syndicateMissions = [];

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
      (a, b) => a.activation!.getTime() - b.activation!.getTime()
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
    this.earthCycle = new EarthCycle();

    // bounties are 2.5 hours regardless of faction, so this can be reused
    const cetusSynd = safeArray<RawSyndicateMission>(data.SyndicateMissions).filter(
      (syndicate) => syndicate.Tag === 'CetusSyndicate'
    );
    const bountyEnd = parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: { $numberLong: 0 } });

    /**
     * The current Cetus cycle
     * @type {CetusCycle}
     */
    this.cetusCycle = new CetusCycle(bountyEnd);

    /**
     * Cambion Drift Cycle
     * @type {CambionCycle}
     */
    this.cambionCycle = new CambionCycle(this.cetusCycle);

    /**
     * The current Zariman cycle based off current time
     * @type {ZarimanCycle}
     */
    this.zarimanCycle = new ZarimanCycle(bountyEnd);

    /**
     * Midrath cycle (soulframe)
     * @type {MidrathCycle}
     */
    this.midrathCycle = new MidrathCycle();

    /**
     * Weekly challenges
     * @type {Array.<WeeklyChallenge>}
     */
    this.weeklyChallenges = data.WeeklyChallenges ? new WeeklyChallenge(data.WeeklyChallenges) : undefined;

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
    this.constructionProgress = new ConstructionProgress(safeObj(projectPCTwithOid));

    /**
     * The current Orb Vallis cycle state
     * @type {VallisCycle}
     */
    this.vallisCycle = new VallisCycle();

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
      this.arbitration = {
        id: createHash('sha256').update('SolNode000', 'utf8').digest('hex'),
        node: 'SolNode000',
        nodeKey: 'SolNode000',
        activation: new Date(0),
        expiry: new Date(8.64e15),
        enemy: 'Tenno',
        type: 'Unknown',
        typeKey: 'Unknown',
        archwing: false,
        sharkwing: false,
        expired: true,
      };
    }

    /**
     * Current sentient outposts
     * @type {SentientOutpost}
     */
    this.sentientOutposts = new SentientOutpost(tmp.sfn, deps);

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

    const choices = parseArray(DuviriChoice, data.EndlessXpChoices, deps);
    this.duviriCycle = new DuviriCycle(choices);

    this.kinepage = new Kinepage(tmp.pgr, deps.locale);

    if (tmp.lqo) {
      const { activation, expiry } = weeklyReset();

      /**
       * The current Deep Archimedea missions and modifiers
       * @type {DeepArchimedea}
       */
      this.deepArchimedea = new Archimedea(activation, expiry, tmp.lqo);
    }

    if (tmp.hqo) {
      const { activation, expiry } = weeklyReset();

      /**
       * The current Temporal Archimedea missions and modifiers
       * @type {DeepArchimedea}
       */
      this.temporalArchimedea = new Archimedea(activation, expiry, tmp.hqo);
    }

    [this.calendar] = parseArray(Calendar, data.KnownCalendarSeasons, deps);
  }
}

export default async (json: string, deps: Dependency) => WorldState.build(json, deps);
