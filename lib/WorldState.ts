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
import Dependency from './supporting/Dependency';
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
import WorldstateObject, { BaseContentObject } from './models/WorldstateObject';
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
 * @param ParserClass class for parsing data
 * @param dataArray array of raw data
 * @param deps shared dependency object
 * @param uniqueField field to treat as unique
 * @returns  array of parsed objects
 */
export function parseArray<T, D extends BaseContentObject>(
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
      return true;
    });
  }
  return arr;
}

/**
 * Parse array of objects that requires async parsing
 * @param ParserClass class for parsing data - must expose a static build method
 * @param dataArray array of raw data
 * @param deps shared dependency object
 * @param uniqueField field to treat as unique
 * @returns array of parsed objects
 */
export async function parseAsyncArray<T extends WorldstateObject, D extends BaseContentObject>(
  ParserClass: { build: (data: D, deps: Dependency) => Promise<T> },
  dataArray: Array<D>,
  deps: Dependency,
  uniqueField?: keyof T
): Promise<T[]> {
  const arr = [];
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
  /**
   * The date and time at which the World State was generated
   */
  timestamp: Date;

  /**
   * The in-game news
   */
  news: News[];

  /**
   * The current events
   */
  events: WorldEvent[];

  /**
   * The current alerts
   */
  alerts: Alert[];

  /**
   * The current sortie
   */
  sortie: Sortie;

  /**
   * The current syndicate missions
   */
  syndicateMissions: SyndicateMission[];

  /**
   * The current fissures: 'ActiveMissions' & 'VoidStorms'
   */
  fissures: Fissure[];

  /**
   * The current global upgrades
   */
  globalUpgrades: GlobalUpgrade[];

  /**
   * The current flash sales
   */
  flashSales: FlashSale[];

  /**
   * The current invasions
   */
  invasions: Invasion[];

  /**
   * The state of the dark sectors
   */
  darkSectors: DarkSector[];

  /**
   * The state of all Void Traders
   */
  voidTraders: VoidTrader[];

  /**
   * The first entry for voidTraders
   * @deprecated
   */
  voidTrader: VoidTrader;

  /**
   * The current daily deals
   */
  dailyDeals: DailyDeal[];

  /**
   * The state of the sanctuary synthesis targets
   */
  simaris: Simaris;

  /**
   * The current conclave challenges
   */
  conclaveChallenges: ConclaveChallenge[];

  /**
   * The currently active persistent enemies
   */
  persistentEnemies: PersistentEnemy[];

  /**
   * The current earth cycle
   */
  earthCycle: EarthCycle;

  /**
   * The current Cetus cycle
   */
  cetusCycle: CetusCycle;

  /**
   * Cambion Drift Cycle
   */
  cambionCycle: CambionCycle;

  /**
   * The current Zariman cycle based off current time
   */
  zarimanCycle: ZarimanCycle;

  /**
   * Midrath cycle (soulframe)
   */
  midrathCycle: MidrathCycle;

  /**
   * Weekly challenges
   */
  weeklyChallenges?: WeeklyChallenge;

  /**
   * The Current construction progress for Fomorians/Razorback/etc.
   */
  constructionProgress: ConstructionProgress;

  /**
   * The current Orb Vallis cycle state
   */
  vallisCycle: VallisCycle;

  /**
   * The current nightwave season
   */
  nightwave?: Nightwave;

  /**
   * Kuva missions array
   */
  kuva?: ExternalMission[];

  /**
   * Arbitration mission
   */
  arbitration?: ExternalMission;

  /**
   * Current sentient outposts
   */
  sentientOutposts: SentientOutpost;

  /**
   * Steel path offering rotation
   */
  steelPath: SteelPathOffering;

  /**
   * The current prime resurgence
   */
  vaultTrader: VoidTrader;

  /**
   * The current archon hunt
   */
  archonHunt: Sortie;

  /**
   * Current Duviri circuit choices
   */
  duviriCycle: DuviriCycle;

  /**
   * Current kinepage message
   */
  kinepage: Kinepage;

  /**
   * The current Deep Archimedea missions and modifiers
   */
  deepArchimedea?: Archimedea;

  /**
   * The current Temporal Archimedea missions and modifiers
   */
  temporalArchimedea?: Archimedea;

  /**
   * The current calendar for 1999
   */
  calendar: Calendar;

  /**
   * Generates the worldstate json as a string into usable objects
   */
  static async build(json: string, deps: Dependency = defaultDeps): Promise<WorldState> {
    if (typeof json !== 'string') {
      throw new TypeError(`json needs to be a string, provided ${typeof json} : ${JSON.stringify(json)}`);
    }

    const data = JSON.parse(json);
    const ws = new WorldState(data, deps);

    ws.events = await parseAsyncArray(WorldEvent, data.Goals, deps);
    ws.syndicateMissions = await parseAsyncArray(SyndicateMission, data.SyndicateMissions, deps, 'syndicate');

    return ws;
  }

  /**
   * @param data The worldstate JSON string
   * @param deps The options object
   */
  constructor(data: RawWorldState, deps: Dependency = defaultDeps) {
    const tmp: RawTmp = JSON.parse(data.Tmp);

    deps = {
      ...defaultDeps,
      ...deps,
    };

    this.timestamp = new Date(data.Time * 1000);

    this.news = parseArray(
      News,
      safeArray<RawNews>(data.Events).filter(
        (e) => typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !== 'undefined'
      ),
      deps
    );

    this.events = [];

    this.alerts = parseArray(Alert, data.Alerts, deps);

    [this.sortie] = parseArray(Sortie, data.Sorties, deps);

    this.syndicateMissions = [];

    this.fissures = parseArray(Fissure, data.ActiveMissions, deps).concat(parseArray(Fissure, data.VoidStorms, deps));

    this.globalUpgrades = parseArray(GlobalUpgrade, data.GlobalUpgrades, deps);

    this.flashSales = parseArray(FlashSale, data.FlashSales, deps);

    this.invasions = parseArray(Invasion, data.Invasions, deps);

    this.darkSectors = parseArray(DarkSector, data.BadlandNodes, deps);

    this.voidTraders = parseArray(VoidTrader, data.VoidTraders, deps).sort(
      (a, b) => a.activation!.getTime() - b.activation!.getTime()
    );

    [this.voidTrader] = this.voidTraders;

    this.dailyDeals = parseArray(DailyDeal, data.DailyDeals, deps);

    this.simaris = new Simaris(safeObj(data.LibraryInfo), deps);

    this.conclaveChallenges = parseArray(ConclaveChallenge, data.PVPChallengeInstances, deps);

    this.persistentEnemies = parseArray(PersistentEnemy, data.PersistentEnemies, deps);

    this.earthCycle = new EarthCycle();

    // bounties are 2.5 hours regardless of faction, so this can be reused
    const cetusSynd = safeArray<RawSyndicateMission>(data.SyndicateMissions).filter(
      (syndicate) => syndicate.Tag === 'CetusSyndicate'
    );
    const bountyEnd = parseDate(cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: { $numberLong: 0 } });

    this.cetusCycle = new CetusCycle(bountyEnd);

    this.cambionCycle = new CambionCycle(this.cetusCycle);

    this.zarimanCycle = new ZarimanCycle(bountyEnd);

    this.midrathCycle = new MidrathCycle();

    this.weeklyChallenges = data.WeeklyChallenges ? new WeeklyChallenge(data.WeeklyChallenges) : undefined;

    const projectPCTwithOid = data.ProjectPct
      ? {
          ProjectPct: data.ProjectPct,
          _id: {
            $oid: `${Date.now()}${data.ProjectPct[0]}`,
          },
        }
      : undefined;

    this.constructionProgress = new ConstructionProgress(safeObj(projectPCTwithOid));

    this.vallisCycle = new VallisCycle();

    if (data.SeasonInfo) {
      this.nightwave = new Nightwave(data.SeasonInfo, deps);
    }

    const externalMissions = new Kuva(deps);

    ({ kuva: this.kuva, arbitration: this.arbitration } = externalMissions);

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

    this.sentientOutposts = new SentientOutpost(tmp.sfn, deps);

    this.steelPath = new SteelPathOffering(deps);

    [this.vaultTrader] = parseArray(VoidTrader, data.PrimeVaultTraders, deps);

    [this.archonHunt] = parseArray(Sortie, data.LiteSorties, deps);

    const choices = parseArray(DuviriChoice, data.EndlessXpChoices, deps);
    this.duviriCycle = new DuviriCycle(choices);

    this.kinepage = new Kinepage(tmp.pgr, deps.locale);

    if (tmp.lqo) {
      const { activation, expiry } = weeklyReset();
      this.deepArchimedea = new Archimedea(activation, expiry, tmp.lqo);
    }

    if (tmp.hqo) {
      const { activation, expiry } = weeklyReset();
      this.temporalArchimedea = new Archimedea(activation, expiry, tmp.hqo);
    }

    [this.calendar] = parseArray(Calendar, data.KnownCalendarSeasons, deps);
  }
}

export default async (json: string, deps: Dependency) => WorldState.build(json, deps);
