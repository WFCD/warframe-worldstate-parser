export default class Kinepage {
  /**
   * Timestamp of when the message appeared on
   */
  timestamp: Date;

  /**
   * The message itself
   */
  message: string;

  /**
   * Message translations
   */
  translations: { [k: string]: unknown };

  constructor(data: { [k: string]: string | number }, locale = 'en') {
    this.timestamp = new Date(Number(data.ts) * 1000);
    
    const translations = Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'ts'));
    this.message = String(translations[locale] || data.en);

    this.translations = Object.fromEntries(Object.entries(translations).filter(([key]) => key !== locale));
  }
}
