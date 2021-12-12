'use strict';

module.exports = class VoidTraderSchedule {
  constructor(data, { timeDate, translator, locale }) {
    this.expiry = timeDate.parseDate(data.Expiry);
    this.item = translator.languageString(data.FeaturedItem, locale);
  }
};
