import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString, Min } from 'class-validator';
import type { Locale } from 'warframe-worldstate-data';
import {
  languageDesc,
  languageString,
} from 'warframe-worldstate-data/utilities';

import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

const repBase = 1000;

export interface RawNightwaveChallenge extends BaseContentObject {
  Daily?: boolean;
  Challenge: string;
  Permanent?: number | string | boolean;
}

/**
 * Represents an alert
 * @augments {WorldStateObject}
 */
export class NightwaveChallenge extends WorldStateObject {
  /**
   * Whether or not this is a daily challenge
   */
  @ApiProperty({ description: 'Whether or not this is a daily challenge' })
  @IsBoolean()
  isDaily: boolean;

  /**
   * Whether or not the challenge is an elite challenge
   */
  @ApiProperty({
    description: 'Whether or not the challenge is an elite challenge',
  })
  @IsBoolean()
  isElite: boolean;

  /**
   * The descriptor for this challenge
   */
  @ApiProperty({ description: 'The description for this challenge' })
  @IsString()
  desc: string;

  /**
   * The title for this challenge
   */
  @ApiProperty({ description: 'The title for this challenge' })
  @IsString()
  title: string;

  /**
   * Reputation reward for ranking up in the Nightwave
   */
  @ApiProperty({
    description: 'Reputation reward for ranking up in the Nightwave',
  })
  @IsInt()
  @Min(0)
  reputation: number;

  /**
   * Whether this challenge is permanent
   */
  @ApiProperty({ description: 'Whether this challenge is permanent' })
  @IsBoolean()
  isPermanent: boolean;

  /**
   * @param data        The alert data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   */
  constructor(
    data: RawNightwaveChallenge,
    { locale }: { locale: Locale } = { locale: 'en' }
  ) {
    super(data);

    this.isDaily = data.Daily || false;

    this.isElite = /hard/gi.test(data.Challenge);

    this.desc = languageDesc(data.Challenge, locale);

    this.title = languageString(data.Challenge, locale);

    this.id = `${this.expiry!.getTime()}${data.Challenge.split('/').slice(-1)[0].toLowerCase()}`;

    this.reputation =
      repBase + (!this.isDaily ? 3500 : 0) + (this.isElite ? 2500 : 0);

    this.isPermanent = Boolean(data?.Permanent);
  }
}
