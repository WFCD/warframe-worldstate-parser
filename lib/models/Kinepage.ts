import { Type } from 'class-transformer';
import { IsDate, IsObject, IsString } from 'class-validator';

export class Kinepage {
  /**
   * Timestamp of when the message appeared on
   */
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  /**
   * The message itself
   */
  @IsString()
  message: string;

  /**
   * Message translations
   */
  @IsObject()
  translations: { [k: string]: unknown };

  constructor(data: { [k: string]: string | number }, locale = 'en') {
    this.timestamp = new Date(Number(data.ts) * 1000);

    const translations = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== 'ts')
    );
    this.message = String(translations[locale] || data.en);

    this.translations = Object.fromEntries(
      Object.entries(translations).filter(([key]) => key !== locale)
    );
  }
}
