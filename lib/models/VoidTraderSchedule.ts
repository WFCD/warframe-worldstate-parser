import { parseDate, languageString } from 'warframe-worldstate-data/utilities';
import { ContentTimestamp } from './WorldstateObject';
import Dependency from '../supporting/Dependency';

export default class VoidTraderSchedule {
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
