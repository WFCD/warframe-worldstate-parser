import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import {
  type ContentTimestamp,
  fissureModifier,
  fissureTier,
  fromNow,
  missionType,
  node,
  nodeEnemy,
  nodeMissionType,
  parseDate,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawFissure extends BaseContentObject {
  Node: string;
  MissionType: string;
  Modifier: string;
  ActiveMissionTier: string;
  Activation: ContentTimestamp;
  Expiry: ContentTimestamp;
  Hard?: boolean;
}

/**
 * Represents a fissure mission
 * @augments {WorldStateObject}
 */
export class Fissure extends WorldStateObject {
  /**
   * The node where the fissure has appeared
   */
  @ApiProperty({ description: 'Localized node name' })
  @IsString()
  node: string;

  /**
   * The fissure mission type
   */
  @ApiProperty({ description: 'Localized mission type' })
  @IsString()
  missionType: string;

  /**
   * The fissure mission type key
   */
  @ApiProperty({ description: 'Unlocalized mission type key' })
  @IsString()
  missionTypeKey: string;

  /**
   * The faction controlling the node where the fissure has appeared
   */
  @ApiProperty({ description: 'Localized enemy faction' })
  @IsString()
  enemy: string;

  /**
   * Faction enum for the faction controlling the node where the fissure has appeared
   */
  @ApiProperty({ description: 'Unlocalized enemy faction key' })
  @IsString()
  enemyKey: string;

  /**
   * The node key where the fissure has appeared
   */
  @ApiProperty({ description: 'Unlocalized node key' })
  @IsString()
  nodeKey: string;

  /**
   * The fissure's tier
   */
  @ApiProperty({
    description: 'Fissure tier name (e.g., Lith, Meso, Neo, Axi, Requiem)',
  })
  @IsString()
  tier: string;

  /**
   * The fissure's tier as a number
   */
  @ApiProperty({ description: 'Fissure tier as number' })
  tierNum: string | number;

  /**
   * Whether this fissure corresponds to a RailJack Void Storm
   */
  @ApiProperty({ description: 'Whether this is a Railjack Void Storm' })
  @IsBoolean()
  isStorm: boolean;

  /**
   * Whether this fissure is a Steel Path fissure
   */
  @ApiProperty({ description: 'Whether this is a Steel Path fissure' })
  @IsBoolean()
  isHard: boolean;

  /**
   * @param   {object}             data            The fissure data
   * @param   {Dependency}             deps            The dependencies object
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(
    data: RawFissure,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    super(data);

    this.node = node(data.Node, locale);

    this.missionType = data.MissionType
      ? missionType(data.MissionType, locale)
      : nodeMissionType(data.Node, locale);

    this.missionTypeKey = data.MissionType
      ? missionType(data.MissionType)
      : nodeMissionType(data.Node);

    this.enemy = nodeEnemy(data.Node, locale);

    this.enemyKey = nodeEnemy(data.Node);

    this.nodeKey = node(data.Node);

    this.tier = fissureModifier(
      data.Modifier || data.ActiveMissionTier,
      locale
    );

    this.tierNum = fissureTier(data.Modifier || data.ActiveMissionTier, locale);

    this.activation = parseDate(data.Activation);

    this.expiry = parseDate(data.Expiry);

    this.isStorm = Boolean(data.ActiveMissionTier);

    this.isHard = Boolean(data.Hard);
  }

  /**
   * Whether this is expired (at time of object creation)
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
