export default class Kinepage {
  constructor(data, locale = 'en') {
    this.timestamp = new Date(Number(data.ts) * 1000);

    const translations = Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'ts'));

    this.message = translations[locale] || data.en;

    this.translations = Object.fromEntries(Object.entries(translations).filter(([key]) => key !== locale));
  }
}
