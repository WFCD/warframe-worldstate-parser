import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';
import {
  type ContentTimestamp,
  languageString,
  parseDate,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from '@/supporting';

export class VoidTraderSchedule {
  @IsDate()
  @Type(() => Date)
  expiry: Date;

  @IsString()
  item: string;

  constructor(
    data: { Expiry: ContentTimestamp; FeaturedItem: string },
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    this.expiry = parseDate(data.Expiry);
    this.item = languageString(data.FeaturedItem, locale);
  }
}
