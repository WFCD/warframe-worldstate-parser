import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  faction,
  insist,
  languageString,
  missionType,
  node,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type RawReward, Reward } from './Reward';

export interface RawMission {
  descText: string;
  location: string;
  node?: string;
  missionType: string;
  faction: string;
  missionReward: RawReward;
  minEnemyLevel: number;
  maxEnemyLevel: number;
  maxWaveNum?: number;
  nightmare?: boolean;
  archwingRequired?: boolean;
  isSharkwingMission?: boolean;
  levelOverride: string;
  enemySpec: string;
  advancedSpawners?: string[];
  requiredItems?: string[];
  consumeRequiredItems?: boolean;
  vipAgent?: string;
  leadersAlwaysAllowed?: boolean;
  goalTag?: string;
  levelAuras?: string[];
  exclusiveWeapon: string;
}

/**
 * Represents an in-game mission
 */
export class Mission {
  /**
   * The mission's description
   */
  @ApiProperty({ description: 'Mission description' })
  @IsString()
  description: string;

  /**
   * The node where the mission takes place
   */
  @ApiProperty({ description: 'Localized mission node name' })
  @IsString()
  node: string;

  /**
   * Unlocalized node
   */
  @ApiProperty({ description: 'Unlocalized mission node key' })
  @IsString()
  nodeKey: string;

  /**
   * The mission's type
   */
  @ApiProperty({ description: 'Localized mission type' })
  @IsString()
  type: string;

  /**
   * The mission's type
   */
  @ApiProperty({ description: 'Unlocalized mission type key' })
  @IsString()
  typeKey: string;

  /**
   * The factions that the players must fight in the mission
   */
  @ApiProperty({ description: 'Localized faction name' })
  @IsString()
  faction: string;

  /**
   * The factions that the players must fight in the mission
   */
  @ApiProperty({ description: 'Unlocalized faction key' })
  @IsString()
  factionKey: string;

  /**
   * The mission's reward
   */
  @ApiPropertyOptional({ description: 'Mission rewards', type: () => Reward })
  @IsOptional()
  @ValidateNested()
  @Type(() => Reward)
  reward?: Reward;

  /**
   * The minimum level of the enemies in the mission
   */
  @ApiProperty({ description: 'Minimum enemy level' })
  @IsInt()
  @Min(0)
  minEnemyLevel: number;

  /**
   * The maximum level of the enemies in the mission
   */
  @ApiProperty({ description: 'Maximum enemy level' })
  @IsInt()
  @Min(0)
  maxEnemyLevel: number;

  /**
   * The number of waves that the players need to complete (undefined if not applicable)
   */
  @ApiPropertyOptional({
    description: 'Maximum wave number (for wave-based missions)',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxWaveNum?: number;

  /**
   * The Mission's nightmare boolean
   */
  @ApiProperty({ description: 'Whether this is a nightmare mission' })
  @IsBoolean()
  nightmare: boolean;

  /**
   * The Mission's archwing requirement
   */
  @ApiProperty({ description: 'Whether archwing is required' })
  @IsBoolean()
  archwingRequired: boolean;

  /**
   * The Mission's sharkwing requirement
   */
  @ApiProperty({ description: 'Whether sharkwing is required' })
  @IsBoolean()
  isSharkwing: boolean;

  /**
   * Override for the map on this mission
   */
  @ApiProperty({ description: 'Level override for the mission' })
  @IsString()
  levelOverride: string;

  /**
   * Enemy specification for the mission
   */
  @ApiProperty({ description: 'Enemy specification' })
  @IsString()
  enemySpec: string;

  /**
   * Array of strings denoting extra spawners for a mission
   */
  @ApiProperty({
    description: 'Advanced spawners for the mission',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  advancedSpawners: string[];

  /**
   * Items required to enter the mission
   */
  @ApiProperty({
    description: 'Items required to enter the mission',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  requiredItems: string[];

  /**
   * Whether or not the required items are consumed
   */
  @ApiPropertyOptional({ description: 'Whether required items are consumed' })
  @IsOptional()
  @IsBoolean()
  consumeRequiredItems?: boolean;

  /**
   * Target for the mission
   */
  @ApiPropertyOptional({ description: 'VIP target for the mission' })
  @IsOptional()
  @IsString()
  target?: string;

  /**
   * Whether or not leaders are always allowed
   */
  @ApiPropertyOptional({ description: 'Whether leaders are always allowed' })
  @IsOptional()
  @IsBoolean()
  leadersAlwaysAllowed?: boolean;

  /**
   * A tag for the event that this corresponds to
   */
  @ApiPropertyOptional({ description: 'Event goal tag' })
  @IsOptional()
  @IsString()
  goalTag?: string;

  /**
   * Affectors for this mission
   */
  @ApiProperty({
    description: 'Level auras affecting the mission',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  levelAuras: string[];

  /**
   * Only weapon allowed for the mission
   */
  @ApiProperty({ description: 'Exclusive weapon allowed for the mission' })
  @IsString()
  exclusiveWeapon: string;

  /**
   * @param data   The mission data
   * @param locale Locale to use for translations
   */
  constructor(
    data: RawMission,
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    const deps = { locale };
    insist({ ...data });

    this.description = languageString(data.descText, locale);

    this.node = node(data.node || data.location, locale);

    this.nodeKey = node(data.node || data.location, 'en');

    this.type = missionType(data.missionType, locale);

    this.typeKey = missionType(data.missionType, 'en');

    this.faction = faction(data.faction, locale);

    this.factionKey = faction(data.faction, 'en');

    this.reward = data.missionReward
      ? new Reward(data.missionReward, deps)
      : undefined;

    this.minEnemyLevel = data.minEnemyLevel;

    this.maxEnemyLevel = data.maxEnemyLevel;

    this.maxWaveNum = data.maxWaveNum;

    this.nightmare = data.nightmare || false;

    this.archwingRequired = data.archwingRequired || false;

    this.isSharkwing = data.isSharkwingMission || false;

    this.levelOverride = languageString(data.levelOverride, locale);

    this.enemySpec = languageString(data.enemySpec, locale);

    this.advancedSpawners = (data.advancedSpawners || []).map((spawner) =>
      languageString(spawner, locale)
    );

    this.requiredItems = (data.requiredItems || []).map((reqItem) =>
      languageString(reqItem, locale)
    );

    this.consumeRequiredItems = data.consumeRequiredItems;

    this.target = data.vipAgent
      ? languageString(data.vipAgent, locale)
      : undefined;

    this.leadersAlwaysAllowed = data.leadersAlwaysAllowed;

    this.goalTag = data.goalTag;

    this.levelAuras = (data.levelAuras || []).map((aura) =>
      languageString(aura, locale)
    );

    this.exclusiveWeapon = languageString(data.exclusiveWeapon, locale);
  }
}
