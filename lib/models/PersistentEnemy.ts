import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import type { Locale } from 'warframe-worldstate-data';
import {
  type ContentTimestamp,
  languageString,
  node,
  parseDate,
  region,
} from 'warframe-worldstate-data/utilities';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawPersistentEnemy extends BaseContentObject {
  AgentType: string;
  LocTag: string;
  Rank: number;
  HealthPercent: string;
  FleeDamage: number;
  Region: number;
  LastDiscoveredTime: ContentTimestamp;
  LastDiscoveredLocation: string;
  Discovered: boolean;
  UseTicketing: boolean;
}

/**
 * Represents a persistent enemy
 * @augments {WorldStateObject}
 */
export class PersistentEnemy extends WorldStateObject {
  /**
   * The enemy's type
   */
  @ApiProperty({ description: "The enemy's type" })
  @IsString()
  agentType: string;

  /**
   * The location tag
   */
  @ApiProperty({ description: 'The location tag' })
  @IsString()
  locationTag: string;

  /**
   * The enemy's rank
   */
  @ApiProperty({ description: "The enemy's rank" })
  @IsInt()
  @Min(0)
  rank: number;

  /**
   * The enemy's remaining health percentage
   */
  @ApiProperty({ description: "The enemy's remaining health percentage" })
  @IsNumber()
  @Min(0)
  healthPercent: number;

  /**
   * The percentual damage that the enemy takes when it's defeated
   */
  @ApiProperty({
    description:
      "The percentual damage that the enemy takes when it's defeated",
  })
  @IsNumber()
  fleeDamage: number;

  /**
   * The region where the enemy is located
   */
  @ApiProperty({ description: 'The region where the enemy is located' })
  region: string | number;

  /**
   * The last time the enemy was discovered
   */
  @ApiProperty({
    description: 'The last time the enemy was discovered',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  lastDiscoveredTime: Date;

  /**
   * The node at which the enemy was last discovered
   */
  @ApiProperty({
    description: 'The node at which the enemy was last discovered',
  })
  @IsString()
  lastDiscoveredAt: string;

  /**
   * Whether or not the enemy is currently available
   */
  @ApiProperty({
    description: 'Whether or not the enemy is currently available',
  })
  @IsBoolean()
  isDiscovered: boolean;

  /**
   * Whether or not the enemy is using ticketing
   */
  @ApiProperty({ description: 'Whether or not the enemy is using ticketing' })
  @IsBoolean()
  isUsingTicketing: boolean;

  /**
   * Fake ID incorporating discovery
   */
  @ApiProperty({ description: 'Fake ID incorporating discovery' })
  @IsString()
  pid: string;

  /**
   * @param data        The persistent enemy data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawPersistentEnemy,
    { locale }: { locale: Locale } = { locale: 'en' }
  ) {
    super(data);

    this.agentType = languageString(data.AgentType, locale);

    this.locationTag = languageString(data.LocTag, locale);

    this.rank = data.Rank;

    this.healthPercent = Number.parseFloat(data.HealthPercent);

    this.fleeDamage = data.FleeDamage;

    this.region = region(data.Region, locale);

    this.lastDiscoveredTime = parseDate(data.LastDiscoveredTime);

    this.lastDiscoveredAt = node(data.LastDiscoveredLocation, locale);

    this.isDiscovered = data.Discovered;

    this.isUsingTicketing = data.UseTicketing;

    this.pid = `${this.id}${this.isDiscovered}`;
  }
}
