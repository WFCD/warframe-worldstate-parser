import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsObject,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import type { Locale } from 'warframe-worldstate-data';
import {
  fromNow,
  languageString,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import {
  NightwaveChallenge,
  type RawNightwaveChallenge,
} from './NightwaveChallenge';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawNightwave extends BaseContentObject {
  Season: number;
  AffiliationTag: string;
  Phase: number;
  Params: string;
  Challenges?: RawNightwaveChallenge[];
  ActiveChallenges: RawNightwaveChallenge[];
}

/**
 * Represents a nightwave state
 * @augments {WorldStateObject}
 */
export class Nightwave extends WorldStateObject {
  /**
   * The current season. 0-indexed.
   */
  @ApiProperty({ description: 'The current season (0-indexed)' })
  @IsInt()
  @Min(0)
  season: number;

  /**
   * Descriptor for affiliation
   */
  @ApiProperty({ description: 'Descriptor for affiliation' })
  @IsString()
  tag: string;

  /**
   * The current season's current phase. 0-indexed.
   */
  @ApiProperty({
    description: "The current season's current phase (0-indexed)",
  })
  @IsInt()
  @Min(0)
  phase: number;

  /**
   * Misc params provided.
   */
  @ApiProperty({
    description: 'Miscellaneous parameters provided',
    type: 'object',
  })
  @IsObject()
  params: Record<string, unknown>;

  /**
   * Array of possible challenges
   */
  @ApiProperty({
    description: 'Array of possible challenges',
    type: [NightwaveChallenge],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NightwaveChallenge)
  possibleChallenges: NightwaveChallenge[];

  /**
   * Array of active challenges
   */
  @ApiProperty({
    description: 'Array of active challenges',
    type: [NightwaveChallenge],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NightwaveChallenge)
  activeChallenges: NightwaveChallenge[];

  /**
   * @param data        The alert data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawNightwave,
    { locale }: { locale: Locale } = { locale: 'en' }
  ) {
    super(data);
    const deps = { locale };

    this.id = `nightwave${new Date(this.expiry!).getTime()}`;

    this.season = data.Season;

    this.tag = languageString(data.AffiliationTag, locale);

    this.phase = data.Phase;

    this.params = JSON.parse(data.Params || '{}');

    this.possibleChallenges = (data.Challenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);

    this.activeChallenges = (data.ActiveChallenges || [])
      .map((challenge) => new NightwaveChallenge(challenge, deps))
      .filter((challenge) => challenge);
  }

  /**
   * How much time is left before the nightwave expires
   */
  get eta(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
