import { parseDate } from '../utilities/timeDate.js';
import { languageString } from '../utilities/translation.js';

export default class VoidTraderSchedule {
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    this.expiry = parseDate(data.Expiry);
    this.item = languageString(data.FeaturedItem, locale);
  }
}
