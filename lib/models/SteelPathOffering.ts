import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDate, IsObject, IsString } from 'class-validator';
import type { Locale } from 'warframe-worldstate-data';
import type { SteelPathOffering } from 'warframe-worldstate-data/types';
import {
  steelPath,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

const monday = 1;

/**
 * Gets the first day of the week
 */
function getFirstDayOfWeek(): Date {
  const resultDate = new Date();
  /* istanbul ignore next */
  const offset =
    resultDate.getUTCDay() === 0 ? 6 : resultDate.getUTCDay() - monday;
  resultDate.setUTCDate(resultDate.getUTCDate() - offset);
  resultDate.setUTCHours(0);
  resultDate.setUTCMinutes(0);
  resultDate.setUTCSeconds(0);
  resultDate.setUTCMilliseconds(0);
  return resultDate;
}

/**
 * Get the last day of the week
 */
function getLastDayOfWeek(): Date {
  const last = new Date(getFirstDayOfWeek());
  last.setUTCDate(last.getUTCDate() + 6);
  last.setUTCHours(23);
  last.setUTCMinutes(59);
  last.setUTCSeconds(59);
  last.setUTCMilliseconds(0);
  return last;
}

/**
 * When was the start of the day
 */
function getStartOfDay(): Date {
  const today = new Date();
  today.setUTCHours(0);
  today.setUTCMinutes(0);
  today.setUTCSeconds(0);
  today.setUTCMilliseconds(0);
  return today;
}

/**
 * When was the end of the day
 */
function getEndOfDay(): Date {
  const last = new Date();
  last.setUTCHours(23);
  last.setUTCMinutes(59);
  last.setUTCSeconds(59);
  last.setUTCMilliseconds(0);
  return last;
}

/**
 *  General data pertaining to incursions
 */
export interface Incursion {
  /**
   * Identifier for steel path incursion based on start of day.
   */
  id: string;
  /**
   * when the current incursions became active
   */
  activation: Date;
  /**
   * when the current incursions become inactive
   */
  expiry: Date;
}

/**
 * Start of Steel Path cycle calculations
 */
const start: Date = new Date('2020-11-16T00:00:00.000Z');

export class SteelPathOfferings {
  /**
   * Current week's steel path reward
   */
  @ApiProperty({
    description: "Current week's steel path reward",
    type: 'object',
  })
  @IsObject()
  currentReward: SteelPathOffering;

  /**
   * When the current rotation started
   */
  @ApiProperty({ description: 'When the current rotation started', type: Date })
  @IsDate()
  @Type(() => Date)
  activation: Date;

  /**
   * When the current rotation ends
   */
  @ApiProperty({ description: 'When the current rotation ends', type: Date })
  @IsDate()
  @Type(() => Date)
  expiry: Date;

  /**
   * Time remaining string
   */
  @ApiProperty({ description: 'Time remaining string' })
  @IsString()
  remaining: string;

  /**
   * Full rotation of steel path rewards
   */
  @ApiProperty({
    description: 'Full rotation of steel path rewards',
    type: 'array',
    items: { type: 'object' },
  })
  @IsArray()
  rotation: SteelPathOffering[];

  /**
   * Evergreen steel path rewards
   */
  @ApiProperty({
    description: 'Evergreen steel path rewards',
    type: 'array',
    items: { type: 'object' },
  })
  @IsArray()
  evergreens: SteelPathOffering[];

  /**
   * Steel path incursion information
   */
  @ApiProperty({
    description: 'Steel path incursion information',
    type: 'object',
  })
  @IsObject()
  incursions: Incursion;

  constructor({ locale }: { locale: Locale }) {
    const sSinceStart = (Date.now() - start.getTime()) / 1000;
    const eightWeeks = 4838400;
    const sevenDays = 604800;

    const ind = Math.floor((sSinceStart % eightWeeks) / sevenDays);

    this.currentReward = steelPath(locale).rotation[ind];

    this.activation = getFirstDayOfWeek();

    this.expiry = getLastDayOfWeek();

    this.remaining = timeDeltaToString(this.expiry.getTime() - Date.now());

    this.rotation = steelPath(locale).rotation;
    this.evergreens = steelPath(locale).evergreen;

    this.incursions = {
      id: `spi:${getStartOfDay().getTime()}`,
      activation: getStartOfDay(),
      expiry: getEndOfDay(),
    };
  }
}
