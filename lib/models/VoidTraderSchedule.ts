import {
  type ContentTimestamp,
  languageString,
  parseDate,
} from 'warframe-worldstate-data/utilities';

import type { Dependency } from './../supporting/Dependency';

export class VoidTraderSchedule {
  expiry: Date;
  item: string;

  constructor(
    data: { Expiry: ContentTimestamp; FeaturedItem: string },
    { locale = 'en' }: Dependency = { locale: 'en' }
  ) {
    this.expiry = parseDate(data.Expiry);
    this.item = languageString(data.FeaturedItem, locale);
  }
}
