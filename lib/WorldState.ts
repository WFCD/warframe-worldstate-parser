import { createHash } from 'node:crypto';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import wsData from 'warframe-worldstate-data';
import { parseDate } from 'warframe-worldstate-data/utilities';

import {
  Alert,
  Archimedea,
  type BaseContentObject,
  Calendar,
  CambionCycle,
  CetusCycle,
  ConclaveChallenge,
  ConstructionProgress,
  DailyDeal,
  DarkSector,
  DuviriCycle,
  EarthCycle,
  Fissure,
  FlashSale,
  GlobalUpgrade,
  Invasion,
  type Kinepage,
  Kuva,
  type LibraryInfo,
  News,
  Nightwave,
  PersistentEnemy,
  type RawAlert,
  type RawArchimedea,
  type RawCalender,
  type RawChallenge,
  type RawDailyDeal,
  type RawDarkSector,
  type RawFissure,
  type RawFlashSale,
  type RawGlobalUpgrade,
  type RawInvasion,
  type RawNews,
  type RawNightwave,
  type RawPersistentEnemy,
  type RawSortie,
  type RawSyndicateMission,
  type RawVoidTrader,
  type RawWeeklyChallenge,
  type RawWorldEvent,
  type SentientOutpost,
  Simaris,
  Sortie,
  SteelPathOfferings,
  SyndicateMission,
  Tmp,
  VallisCycle,
  VoidTrader,
  WeeklyChallenge,
  WorldEvent,
  type WorldStateObject,
  ZarimanCycle,
} from '@/models';
import {
  type Dependency,
  DuviriChoice,
  ExternalMission,
  type RawChoice,
} from '@/supporting';

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
export function parseArray<T, D extends BaseContentObject>(
  // Not all instances of T extend WorldStateObject
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
export async function parseAsyncArray<
  T extends WorldStateObject,
  D extends BaseContentObject,
>(
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
  Conquests: RawArchimedea[];
  Tmp: string;
}

/**
 * Parses Warframe Worldstate JSON
 */
export class WorldState {
  /**
   * The date and time at which the World State was generated
   */
  @ApiProperty({
    description: 'Timestamp when the world state was generated',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  /**
   * Current Warframe version
   */
  @ApiProperty({ description: 'Current game build version' })
  @IsString()
  buildLabel: string;

  /**
   * The in-game news
   */
  @ApiProperty({ description: 'Current in-game news articles', type: [News] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => News)
  news: News[];

  /**
   * The current events
   */
  @ApiProperty({ description: 'Active world events', type: [WorldEvent] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorldEvent)
  events: WorldEvent[];

  /**
   * The current alerts
   */
  @ApiProperty({ description: 'Active alerts', type: [Alert] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Alert)
  alerts: Alert[];

  /**
   * The current sortie
   */
  @ApiProperty({ description: 'Current daily sortie', type: () => Sortie })
  @ValidateNested()
  @Type(() => Sortie)
  sortie: Sortie;

  /**
   * The current syndicate missions
   */
  @ApiProperty({
    description: 'Active syndicate missions',
    type: [SyndicateMission],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyndicateMission)
  syndicateMissions: SyndicateMission[];

  /**
   * The current fissures: 'ActiveMissions' & 'VoidStorms'
   */
  @ApiProperty({
    description: 'Active void fissures and void storms',
    type: [Fissure],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fissure)
  fissures: Fissure[];

  /**
   * The current global upgrades
   */
  @ApiProperty({ description: 'Active global upgrades', type: [GlobalUpgrade] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GlobalUpgrade)
  globalUpgrades: GlobalUpgrade[];

  /**
   * The current flash sales
   */
  @ApiProperty({ description: 'Active flash sales', type: [FlashSale] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashSale)
  flashSales: FlashSale[];

  /**
   * The current invasions
   */
  @ApiProperty({ description: 'Active invasions', type: [Invasion] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Invasion)
  invasions: Invasion[];

  /**
   * The state of the dark sectors
   */
  @ApiProperty({ description: 'Dark sector conflicts', type: [DarkSector] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DarkSector)
  darkSectors: DarkSector[];

  /**
   * The state of all Void Traders
   */
  @ApiProperty({ description: 'All void traders', type: [VoidTrader] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoidTrader)
  voidTraders: VoidTrader[];

  /**
   * The first entry for voidTraders
   * @deprecated
   */
  @ApiProperty({
    description: 'Primary void trader (deprecated, use voidTraders)',
    type: () => VoidTrader,
    deprecated: true,
  })
  @ValidateNested()
  @Type(() => VoidTrader)
  voidTrader: VoidTrader;

  /**
   * The current daily deals
   */
  @ApiProperty({ description: 'Active daily deals', type: [DailyDeal] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyDeal)
  dailyDeals: DailyDeal[];

  /**
   * The state of the sanctuary synthesis targets
   */
  @ApiProperty({
    description: 'Sanctuary synthesis targets',
    type: () => Simaris,
  })
  @ValidateNested()
  @Type(() => Simaris)
  simaris: Simaris;

  /**
   * The current conclave challenges
   */
  @ApiProperty({
    description: 'Active conclave challenges',
    type: [ConclaveChallenge],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConclaveChallenge)
  conclaveChallenges: ConclaveChallenge[];

  /**
   * The currently active persistent enemies
   */
  @ApiProperty({
    description: 'Active persistent enemies (liches, sisters)',
    type: [PersistentEnemy],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersistentEnemy)
  persistentEnemies: PersistentEnemy[];

  /**
   * The current earth cycle
   */
  @ApiProperty({ description: 'Earth day/night cycle', type: () => EarthCycle })
  @ValidateNested()
  @Type(() => EarthCycle)
  earthCycle: EarthCycle;

  /**
   * The current Cetus cycle
   */
  @ApiProperty({
    description: 'Cetus (Plains of Eidolon) day/night cycle',
    type: () => CetusCycle,
  })
  @ValidateNested()
  @Type(() => CetusCycle)
  cetusCycle: CetusCycle;

  /**
   * Cambion Drift Cycle
   */
  @ApiProperty({ description: 'Cambion Drift cycle', type: () => CambionCycle })
  @ValidateNested()
  @Type(() => CambionCycle)
  cambionCycle: CambionCycle;

  /**
   * The current Zariman cycle based off current time
   */
  @ApiProperty({ description: 'Zariman cycle', type: () => ZarimanCycle })
  @ValidateNested()
  @Type(() => ZarimanCycle)
  zarimanCycle: ZarimanCycle;

  /**
   * Midrath cycle (soulframe)
   * Game seems to desync while you play and appearntly it changes between updates.
   */
  // midrathCycle: MidrathCycle;

  /**
   * Weekly challenges
   */
  @ApiPropertyOptional({
    description: 'Weekly challenges',
    type: () => WeeklyChallenge,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => WeeklyChallenge)
  weeklyChallenges?: WeeklyChallenge;

  /**
   * The Current construction progress for Fomorians/Razorback/etc.
   */
  @ApiProperty({
    description: 'Construction progress for Fomorian/Razorback',
    type: () => ConstructionProgress,
  })
  @ValidateNested()
  @Type(() => ConstructionProgress)
  constructionProgress: ConstructionProgress;

  /**
   * The current Orb Vallis cycle state
   */
  @ApiProperty({
    description: 'Orb Vallis temperature cycle',
    type: () => VallisCycle,
  })
  @ValidateNested()
  @Type(() => VallisCycle)
  vallisCycle: VallisCycle;

  /**
   * The current nightwave season
   */
  @ApiPropertyOptional({
    description: 'Current Nightwave season',
    type: () => Nightwave,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Nightwave)
  nightwave?: Nightwave;

  /**
   * Kuva missions array
   */
  @ApiPropertyOptional({
    description: 'Kuva siphon/flood missions',
    type: [ExternalMission],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExternalMission)
  kuva?: ExternalMission[];

  /**
   * Arbitration mission
   */
  @ApiPropertyOptional({
    description: 'Current arbitration mission',
    type: ExternalMission,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ExternalMission)
  arbitration?: ExternalMission;

  /**
   * Current sentient outposts
   */
  @ApiProperty({ description: 'Sentient anomaly outposts' })
  sentientOutposts: SentientOutpost;

  /**
   * Steel path offering rotation
   */
  @ApiProperty({
    description: 'Steel Path offerings',
    type: () => SteelPathOfferings,
  })
  @ValidateNested()
  @Type(() => SteelPathOfferings)
  steelPath: SteelPathOfferings;

  /**
   * The current prime resurgence
   */
  @ApiProperty({
    description: 'Prime resurgence (Varzia)',
    type: () => VoidTrader,
  })
  @ValidateNested()
  @Type(() => VoidTrader)
  vaultTrader: VoidTrader;

  /**
   * The current archon hunt
   */
  @ApiProperty({ description: 'Weekly archon hunt', type: () => Sortie })
  @ValidateNested()
  @Type(() => Sortie)
  archonHunt: Sortie;

  /**
   * Current Duviri circuit choices
   */
  @ApiProperty({
    description: 'Duviri circuit rotation',
    type: () => DuviriCycle,
  })
  @ValidateNested()
  @Type(() => DuviriCycle)
  duviriCycle: DuviriCycle;

  /**
   * Current kinepage message
   */
  @ApiProperty({ description: 'Kinepage message' })
  kinepage: Kinepage;

  /**
   * The current Archimedea missions and modifiers
   */
  @ApiProperty({ description: 'Archimedea missions', type: [Archimedea] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Archimedea)
  archimedeas: Archimedea[];

  /**
   * The current calendar for 1999
   */
  @ApiProperty({
    description: 'Calendar for 1999 content',
    type: () => Calendar,
  })
  @ValidateNested()
  @Type(() => Calendar)
  calendar: Calendar;

  /**
   * Faceoff bonus current state
   */
  faceoffBonus?: { activation: Date; expiry: Date; next: Date };

  /**
   * Warframe's annual Quest to Conquer Cancer donation count and next tier goal
   */
  questToConquerCancer?: { count: number; goal: number };

  /**
   * Generates the worldstate json as a string into usable objects
   */
  static async build(
    json: string,
    deps: Dependency = defaultDeps
  ): Promise<WorldState> {
    if (typeof json !== 'string') {
      throw new TypeError(
        `json needs to be a string, provided ${typeof json} : ${JSON.stringify(json)}`
      );
    }

    const data = JSON.parse(json);
    const ws = new WorldState(data, deps);

    ws.events = await parseAsyncArray<WorldEvent, RawWorldEvent>(
      WorldEvent,
      data.Goals,
      deps
    );
    ws.syndicateMissions = await parseAsyncArray<
      SyndicateMission,
      RawSyndicateMission
    >(SyndicateMission, data.SyndicateMissions, deps, 'syndicate');

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
        (e) =>
          typeof e.Messages.find((msg) => msg.LanguageCode === deps.locale) !==
          'undefined'
      ),
      deps
    );

    this.events = [];

    this.alerts = parseArray(Alert, data.Alerts, deps);

    [this.sortie] = parseArray(Sortie, data.Sorties, deps);

    this.syndicateMissions = [];

    this.fissures = parseArray(Fissure, data.ActiveMissions, deps).concat(
      parseArray(Fissure, data.VoidStorms, deps)
    );

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

    this.conclaveChallenges = parseArray(
      ConclaveChallenge,
      data.PVPChallengeInstances,
      deps
    );

    this.persistentEnemies = parseArray(
      PersistentEnemy,
      data.PersistentEnemies,
      deps
    );

    this.earthCycle = new EarthCycle();

    // bounties are 2.5 hours regardless of faction, so this can be reused
    const cetusSynd = safeArray<RawSyndicateMission>(
      data.SyndicateMissions
    ).filter((syndicate) => syndicate.Tag === 'CetusSyndicate');
    const bountyEnd = parseDate(
      cetusSynd.length > 0 ? cetusSynd[0].Expiry : { $date: { $numberLong: 0 } }
    );

    this.cetusCycle = new CetusCycle(bountyEnd);

    this.cambionCycle = new CambionCycle(this.cetusCycle);

    this.zarimanCycle = new ZarimanCycle(bountyEnd);

    // this.midrathCycle = new MidrathCycle();

    this.weeklyChallenges = data.WeeklyChallenges
      ? new WeeklyChallenge(data.WeeklyChallenges)
      : undefined;

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

    this.steelPath = new SteelPathOfferings(deps);

    [this.vaultTrader] = parseArray(VoidTrader, data.PrimeVaultTraders, {
      ...deps,
      character: 'Varzia',
    });

    [this.archonHunt] = parseArray(Sortie, data.LiteSorties, deps);

    const choices = parseArray(DuviriChoice, data.EndlessXpChoices, deps);
    this.duviriCycle = new DuviriCycle(choices);

    [this.calendar] = parseArray(Calendar, data.KnownCalendarSeasons, deps);

    this.archimedeas = parseArray(Archimedea, data.Conquests, deps);

    ({
      kinepage: this.kinepage,
      sentientOutposts: this.sentientOutposts,
      faceoffBonus: this.faceoffBonus,
      questToConquerCancer: this.questToConquerCancer,
    } = new Tmp(data.Tmp, deps));
  }
}

export default async (json: string, deps: Dependency) =>
  WorldState.build(json, deps);
