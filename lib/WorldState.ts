import { createHash } from 'node:crypto';

import wsData from 'warframe-worldstate-data';
import { parseDate } from 'warframe-worldstate-data/utilities';
import Alert, { type RawAlert } from './models/Alert';
import type Archimedea from './models/Archidemea';
import Calendar, { type RawCalender } from './models/Calendar';
import CambionCycle from './models/CambionCycle';
import CetusCycle from './models/CetusCycle';
import ConclaveChallenge, { type RawChallenge } from './models/ConclaveChallenge';
import ConstructionProgress from './models/ConstructionProgress';
import DailyDeal, { type RawDailyDeal } from './models/DailyDeal';
import DarkSector, { type RawDarkSector } from './models/DarkSector';
import DuviriCycle from './models/DuviriCycle';
import EarthCycle from './models/EarthCycle';
import Fissure, { type RawFissure } from './models/Fissure';
import FlashSale, { type RawFlashSale } from './models/FlashSale';
import GlobalUpgrade, { type RawGlobalUpgrade } from './models/GlobalUpgrade';
import Invasion, { type RawInvasion } from './models/Invasion';
import type Kinepage from './models/Kinepage';
import Kuva from './models/Kuva';
import MidrathCycle from './models/MidrathCycle';
import News, { type RawNews } from './models/News';
import Nightwave, { type RawNightwave } from './models/Nightwave';
import PersistentEnemy, { type RawPersistentEnemy } from './models/PersistentEnemy';
import type SentientOutpost from './models/SentientOutpost';
import Simaris, { type LibraryInfo } from './models/Simaris';
import Sortie, { type RawSortie } from './models/Sortie';
import SteelPathOffering from './models/SteelPathOffering';
import SyndicateMission, { type RawSyndicateMission } from './models/SyndicateMission';
import VallisCycle from './models/VallisCycle';
import VoidTrader, { type RawVoidTrader } from './models/VoidTrader';
import WeeklyChallenge, { type RawWeeklyChallenge } from './models/WeeklyChallenge';
import WorldEvent, { type RawWorldEvent } from './models/WorldEvent';
import type WorldstateObject from './models/WorldstateObject';
import type { BaseContentObject } from './models/WorldstateObject';
import ZarimanCycle from './models/ZarimanCycle';
import type Dependency from './supporting/Dependency';
import DuviriChoice, { type RawChoice } from './supporting/DuviriChoice';
import type ExternalMission from './supporting/ExternalMission';
import { Tmp } from './Tmp';

const { sortie } = wsData;

const safeArray = <T>(arr: T[] | undefined) => (arr ?? []) as T[];
const safeObj = <T>(obj: T | undefined) => (obj ?? {}) as T;

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
export function parseArray<T, D extends BaseContentObject>( // Not all instances of T extend WorldstateObject
  ParserClass: new (data: D, deps: Dependency) => T,
  dataArray: Array<D>,
  deps: Dependency,
  uniqueField?: keyof T
): T[] {
  const arr = (dataArray || []).map((d) => new ParserClass(d, deps));
  if (uniqueField) {
    const utemp: Record<string, T> = {};
    // biome-ignore lint/suspicious/noExplicitAny: There's a safety net for these any
    arr.sort((a: any, b: any) => (a.id || '').localeCompare(b.id || ''));
    arr.forEach((obj) => {
      const key = String(obj[uniqueField]);
      utemp[key] = obj;
    });
    // biome-ignore lint/suspicious/noExplicitAny: See line 75
    return Array.from(arr).filter((obj: any) => {
      if (obj?.active && typeof obj.active !== 'undefined') return obj.active;
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
      if (obj?.active && typeof obj.active !== 'undefined') return obj.active;
      return true;
    });
  }
  return arr;
}

export interface InitialWorldState {
  Time: number;
  BuildLabel: string;
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
  WeeklyChallenges?: RawWeeklyChallenge;
  ProjectPct: number[];
  SeasonInfo: RawNightwave;
  PrimeVaultTraders: RawVoidTrader[];
  EndlessXpChoices: RawChoice[];
  KnownCalendarSeasons: RawCalender[];
  Tmp: string;
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
   * Current Warframe version
   */
  buildLabel: string;

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
   * Game seems to desync while you play and appearntly it changes between updates.
   */
  // midrathCycle: MidrathCycle;

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
   * Faceoff bonus current state
   */
  faceoffBonus?: { activation: Date; expiry: Date; next: Date };

  /**
   * Warfames annual Quest to Conquer Cancer donation count and next tier goal
   */
  questToConquerCancer?: { count: number; next: number };

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
  constructor(data: InitialWorldState, deps: Dependency = defaultDeps) {
    deps = {
      ...defaultDeps,
      ...deps,
    };

    this.timestamp = new Date(data.Time * 1000);

    this.buildLabel = data.BuildLabel;

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

    // this.midrathCycle = new MidrathCycle();

    this.weeklyChallenges = data.WeeklyChallenges ? new WeeklyChallenge(data.WeeklyChallenges) : undefined;

    this.constructionProgress = new ConstructionProgress(data.ProjectPct);

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

    this.steelPath = new SteelPathOffering(deps);

    [this.vaultTrader] = parseArray(VoidTrader, data.PrimeVaultTraders, { ...deps, character: 'Varzia' });

    [this.archonHunt] = parseArray(Sortie, data.LiteSorties, deps);

    const choices = parseArray(DuviriChoice, data.EndlessXpChoices, deps);
    this.duviriCycle = new DuviriCycle(choices);

    [this.calendar] = parseArray(Calendar, data.KnownCalendarSeasons, deps);

    ({
      deepArchimedea: this.deepArchimedea,
      kinepage: this.kinepage,
      sentientOutposts: this.sentientOutposts,
      temporalArchimedea: this.temporalArchimedea,
      faceoffBonus: this.faceoffBonus,
      questToConquerCancer: this.questToConquerCancer,
    } = new Tmp(data.Tmp, deps));
  }
}

export default async (json: string, deps: Dependency) => WorldState.build(json, deps);
