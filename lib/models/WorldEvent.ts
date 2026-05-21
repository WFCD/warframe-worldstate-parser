import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  type ContentTimestamp,
  faction,
  fromNow,
  languageString,
  node,
  parseDate,
  syndicate,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type RawReward, Reward } from './Reward';
import { type RawSyndicateJob, SyndicateJob } from './SyndicateJob';
import {
  type BaseContentObject,
  type Identifier,
  WorldStateObject,
} from './WorldStateObject';

/**
 * Interim step for an event reward system.
 */
export interface InterimStep {
  goal: number;
  reward: Reward | undefined;
  winnerCount: number;
  message: object;
}

/**
 * Progress for one of multiple stages
 */
export interface ProgressStep {
  type: string;
  progressAmt: number;
}

export interface InterimRewardMessage {
  sender: string;
  subject: string;
  message: string;
  senderIcon: string;
  attachments: string;
}

export interface RawWorldEvent extends BaseContentObject {
  Goal: number;
  Count?: number;
  GoalInterim?: string;
  GoalInterim2?: string;
  Faction?: string;
  Desc: string;
  ToolTip?: string;
  Node?: string;
  ConcurrentNodes?: string[] | undefined;
  VictimNode?: string;
  Fomorian?: string;
  ScoreLocTag?: string;
  HealthPct?: number;
  JobPreviousVersion?: Identifier;
  Reward?: RawReward;
  InterimRewards?: RawReward[];
  InterimRewardMessages?: InterimRewardMessage[];
  InterimGoals: number[];
  _interimWinnerCounts?: number[];
  IsMultiProgress?: boolean;
  Types?: string[];
  MultiProgress?: string[];
  ShowTotalAtEOM?: boolean;
  Personal: boolean;
  Community?: boolean;
  RegionDrops?: string[];
  ArchwingDrops?: string[];
  Metadata?: string;
  CompletionBonus?: number[];
  ScoreVar: string;
  AltExpiry?: ContentTimestamp;
  AltActivation?: ContentTimestamp;
  NextAltExpiry?: ContentTimestamp;
  NextAltActivation?: ContentTimestamp;
  JobAffiliationTag?: string;
  Tag: string;
  Jobs?: RawSyndicateJob[];
  PreviousJobs?: RawSyndicateJob[];
}

/**
 * Represents an in-game special event
 * @augments {WorldStateObject}
 */
export class WorldEvent extends WorldStateObject {
  /**
   * Jobs associated with this event
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyndicateJob)
  jobs: SyndicateJob[];

  /**
   * Previous jobs associated with this event
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SyndicateJob)
  previousJobs: SyndicateJob[];

  /**
   * The event's main score goal
   */
  @IsInt()
  @Min(0)
  maximumScore: number;

  /**
   * The current score on the event
   */
  @IsInt()
  @Min(0)
  currentScore: number;

  /**
   * The first intermediate score goal
   */
  @IsInt()
  @Min(0)
  smallInterval: number;

  /**
   * The second intermediate score goal
   */
  @IsInt()
  @Min(0)
  largeInterval: number;

  /**
   * The faction that the players must fight in the event
   */
  @IsOptional()
  @IsString()
  faction: string | undefined;

  /**
   * The description of the event
   */
  @IsString()
  description: string;

  /**
   * Tooltip for the event
   */
  @IsOptional()
  @IsString()
  tooltip: string | undefined;

  /**
   * The node where the event takes place
   */
  @IsOptional()
  @IsString()
  node: string | undefined;

  /**
   * The other nodes where the event takes place
   */
  @IsArray()
  @IsString({ each: true })
  concurrentNodes: string[];

  /**
   * The victim node
   */
  @IsOptional()
  @IsString()
  victimNode: string | undefined;

  /**
   * The score description
   */
  @IsOptional()
  @IsString()
  scoreLocTag: string | undefined;

  /**
   * The event's rewards
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Reward)
  rewards: Reward[];

  /**
   * Health remaining for the target
   */
  @IsOptional()
  @IsNumber()
  @Min(0)
  health: number | undefined;

  /**
   * Previous job id
   */
  @IsOptional()
  @IsString()
  previousId: string | undefined;

  /**
   * Array of steps
   */
  @IsArray()
  interimSteps: InterimStep[];

  /**
   * Progress Steps, if any are present
   */
  @IsArray()
  progressSteps: ProgressStep[];

  /**
   * Total of all MultiProgress
   */
  @IsOptional()
  @IsNumber()
  progressTotal?: number;

  /**
   * Whether to show the total score at the end of the mission
   */
  @IsBoolean()
  showTotalAtEndOfMission: boolean;

  /**
   * Whether the event is personal
   */
  @IsBoolean()
  isPersonal: boolean;

  /**
   * Whether the event is community
   */
  @IsBoolean()
  isCommunity: boolean;

  /*
   * Affectors for this mission
   */
  @IsArray()
  @IsString({ each: true })
  regionDrops: string[];

  /**
   * Archwing Drops in effect while this event is active
   */
  @IsArray()
  @IsString({ each: true })
  archwingDrops: string[];

  /**
   * Metadata provided by DE
   */
  @IsObject()
  metadata: object;

  /**
   * Bonuses given for completion
   */
  @IsArray()
  @IsNumber({}, { each: true })
  completionBonuses: number[];

  /**
   * Score variable name
   */
  @IsString()
  scoreVar: string;

  /**
   * Alternative expiry date
   */
  @IsDate()
  @Type(() => Date)
  altExpiry: Date;

  /**
   * Alternative activation date
   */
  @IsDate()
  @Type(() => Date)
  altActivation: Date;

  /**
   * Next alternative cycle dates
   */
  @IsObject()
  @ValidateNested()
  nextAlt: { expiry: Date; activation: Date };

  /**
   * Affiliated syndicate, if any
   */
  @IsOptional()
  @IsString()
  affiliatedWith?: string;

  /**
   * The event's tag
   */
  @IsString()
  tag: string;

  /**
   * Victim identifier, if any
   */
  @IsOptional()
  @IsString()
  victim?: string;

  /**
   * Asynchronously build a new WorldEvent
   * @param data The event data
   * @param deps The dependencies object
   * @returns The created WorldEvent object
   */
  static async build(
    data: RawWorldEvent,
    deps: Dependency
  ): Promise<WorldEvent> {
    const event = new WorldEvent(data, deps);
    if (data.Jobs) {
      const jobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.Jobs ?? []) {
        jobs.push(await SyndicateJob.build(job, event.expiry!, deps));
      }
      event.jobs = jobs;
    }
    if (data.PreviousJobs) {
      const previousJobs = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const job of data.PreviousJobs ?? []) {
        previousJobs.push(await SyndicateJob.build(job, event.expiry!, deps));
      }
      event.previousJobs = previousJobs;
    }
    return event;
  }

  /**
   * @param data The event data
   * @param deps The dependencies object
   */
  constructor(
    data: RawWorldEvent,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);

    const opts = { locale };

    this.maximumScore = Number.parseInt(String(data.Goal), 10);

    this.currentScore = Number.parseInt(String(data.Count), 10);

    this.smallInterval = Number.parseInt(String(data.GoalInterim), 10);

    this.largeInterval = Number.parseInt(String(data.GoalInterim2), 10);

    this.faction = data.Faction ? faction(data.Faction!, locale) : undefined;

    this.description = languageString(data.Desc, locale);

    this.tooltip = data.ToolTip
      ? languageString(data.ToolTip, locale)
      : undefined;

    this.node = data.Node ? node(data.Node, locale) : undefined;

    this.concurrentNodes = data.ConcurrentNodes
      ? data.ConcurrentNodes.map((n) => node(n, locale))
      : [];

    this.victimNode = data.VictimNode
      ? node(data.VictimNode, locale)
      : undefined;

    this.scoreLocTag = data.ScoreLocTag
      ? languageString(data.ScoreLocTag, locale)
      : undefined;
    if (data.Fomorian) this.scoreLocTag = 'Fomorian Assault Score';

    this.rewards = Object.keys(data)
      .filter((k) => k.includes('Reward') || k.includes('reward'))
      .map((k) => new Reward(data[k as keyof RawWorldEvent] as RawReward, opts))
      .filter((r) => r.items.length > 0);

    this.health =
      typeof data.HealthPct !== 'undefined'
        ? Number.parseFloat(((data.HealthPct || 0.0) * 100).toFixed(2))
        : undefined;

    this.jobs = [];
    this.previousJobs = [];

    this.previousId = data.JobPreviousVersion?.$oid;

    this.interimSteps = [];

    (data.InterimRewards || []).forEach((reward, index) => {
      const msg = (data.InterimRewardMessages || [])[index] || {};
      this.interimSteps[index] = {
        goal: Number.parseInt(String(data.InterimGoals[index]), 10),
        reward: reward ? new Reward(reward, opts) : undefined,
        message: {
          sender: languageString(msg.sender, locale),
          subject: languageString(msg.subject, locale),
          message: languageString(msg.message, locale),
          senderIcon: msg.senderIcon,
          attachments: msg.attachments,
        },
        winnerCount: (data._interimWinnerCounts || [])[index],
      };
    });

    this.progressSteps = [];

    if (data.IsMultiProgress) {
      data.Types?.forEach((type, index) => {
        this.progressSteps[index] = {
          type: languageString(type, locale),
          progressAmt: Number.parseInt(String(data.MultiProgress![index]), 10),
        };
      });

      this.progressTotal = Number.parseFloat(
        String(
          data.MultiProgress!.reduce(
            (acc, val) => acc + Number.parseFloat(val),
            0
          )
        )
      );
    }

    this.showTotalAtEndOfMission = data.ShowTotalAtEOM ?? false;

    this.isPersonal = data.Personal;

    this.isCommunity = data.Community ?? false;

    this.regionDrops = (data.RegionDrops || []).map((drop) =>
      languageString(drop, locale)
    );

    this.archwingDrops = (data.ArchwingDrops || []).map((drop) =>
      languageString(drop, locale)
    );

    this.metadata = JSON.parse((data.Metadata || '{}').replace('" ', '"'));

    this.completionBonuses = data.CompletionBonus || [];

    this.scoreVar = data.ScoreVar;

    this.altExpiry = parseDate(data.AltExpiry);
    this.altActivation = parseDate(data.AltActivation);

    this.nextAlt = {
      expiry: parseDate(data.NextAltExpiry),
      activation: parseDate(data.NextAltActivation),
    };

    if (data.JobAffiliationTag) {
      this.affiliatedWith = syndicate(data.JobAffiliationTag, locale);
    }

    this.tag = data.Tag;
  }

  /**
   * Whether the event has expired
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }
}
