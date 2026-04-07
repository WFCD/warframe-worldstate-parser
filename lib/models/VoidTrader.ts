import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  type ContentTimestamp,
  fromNow,
  insist,
  node,
  parseDate,
  timeDeltaToString,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

import { type RawVoidTraderItem, VoidTraderItem } from './VoidTraderItem';
import { VoidTraderSchedule } from './VoidTraderSchedule';
import { type BaseContentObject, WorldStateObject } from './WorldStateObject';

export interface RawVoidTrader extends BaseContentObject {
  Character?: string;
  Node: string;
  Manifest: RawVoidTraderItem[];
  InitialStartDate: ContentTimestamp;
  Completed: boolean;
  ScheduleInfo: { Expiry: ContentTimestamp; FeaturedItem: string }[];
}

/**
 * Represents a void trader
 * @augments {WorldStateObject}
 */
export class VoidTrader extends WorldStateObject {
  /**
   * The void trader's name
   */
  @ApiProperty({ description: "Void trader's name (e.g., Baro Ki'Teer)" })
  @IsString()
  character: string;

  /**
   * The node at which the Void Trader appears
   */
  @ApiProperty({ description: 'Location where the trader appears' })
  @IsString()
  location: string;

  /**
   * The trader's inventory
   */
  @ApiProperty({
    description: "Trader's inventory items",
    type: [VoidTraderItem],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoidTraderItem)
  inventory: VoidTraderItem[];

  /**
   * Pseudo Identifier for identifying changes in inventory
   */
  @ApiProperty({ description: 'Pseudo-ID for inventory changes' })
  @IsString()
  psId: string;

  /**
   * The initial start date
   */
  @ApiProperty({ description: 'Initial start date', type: Date })
  @IsDate()
  @Type(() => Date)
  initialStart: Date;

  /**
   * Whether it's completed or not
   */
  @ApiProperty({ description: 'Whether the trader visit is completed' })
  @IsBoolean()
  completed: boolean;

  /**
   * Possible schedule
   */
  @ApiProperty({ description: 'Trader schedule', type: [VoidTraderSchedule] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VoidTraderSchedule)
  schedule: VoidTraderSchedule[];

  /**
   * @param data        The trader data
   * @param deps        The dependencies object
   * @param deps.locale Locale to use for translations
   * @param deps.character   The trader name
   */
  constructor(
    data: RawVoidTrader,
    { locale = 'en', character }: Dependency = { locale: 'en' }
  ) {
    super(data);
    insist({ ...data }, 'Activation', 'Expiry');

    this.character = data.Character
      ? data.Character.replace("Baro'Ki Teel", "Baro Ki'Teer")
      : (character ?? '');
    this.location = node(data.Node, locale);
    this.inventory = data.Manifest
      ? data.Manifest.map((i) => new VoidTraderItem(i, { locale }))
      : [];
    this.psId = `${this.id}${this.inventory.length}`;

    this.initialStart = parseDate(data.InitialStartDate);
    this.completed = data.Completed;
    this.schedule = data.ScheduleInfo
      ? data.ScheduleInfo.map((i) => new VoidTraderSchedule(i, { locale }))
      : [];
  }

  /**
   * Whether the trader is active
   */
  get active(): boolean {
    return fromNow(this.activation!) < 0 && fromNow(this.expiry!) > 0;
  }

  /**
   * Time delta string from now to the start
   */
  get startString(): string {
    return timeDeltaToString(fromNow(this.activation!));
  }

  /**
   * Time delta string from now to the end
   */
  get endString(): string {
    return timeDeltaToString(fromNow(this.expiry!));
  }
}
