import { parseDate, languageString } from 'warframe-worldstate-data/utilities';

export default class VoidTraderSchedule {
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    this.expiry = parseDate(data.Expiry);
    this.item = languageString(data.FeaturedItem, locale);
  }
}
