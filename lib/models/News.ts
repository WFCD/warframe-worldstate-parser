import {
  ContentTimestamp,
  fromNow,
  languageString,
  parseDate,
  timeDeltaToString,
  toNow,
} from 'warframe-worldstate-data/utilities';

import { cdn, deProxy } from '../supporting/ImgCdn';
import mdConfig from '../supporting/MarkdownSettings';

import { Locale } from 'warframe-worldstate-data';
import WorldstateObject, { BaseContentObject } from './WorldstateObject';

const updateReg = /(update|hotfix|patch-notes)/i;
const primeAccessReg = /(access)/i;
const streamReg = /(devstream|prime-time|warframeinternational|stream)/i;
const langString = /(\/Lotus\/Language\/)/i;

export interface RawNews extends BaseContentObject {
  Messages: { LanguageCode: string; Message: string }[];
  Prop: string;
  Links?: { LanguageCode: string; Link: string }[];
  ImageUrl: string;
  Priority: boolean;
  MobileOnly: boolean;
  Date: ContentTimestamp;
  EventStartDate?: ContentTimestamp;
  EventEndDate?: ContentTimestamp;
}

/**
 * Represents a game news item
 * @augments {WorldstateObject}
 */
export default class News extends WorldstateObject {
  /**
   * The news message
   */
  message: string;

  /**
   * The link to the forum post
   */
  link: string;

  /**
   * The news's image link
   */
  imageLink: string;

  /**
   * Whether this has priority over other news or not
   */
  priority: boolean;

  /**
   * The date at which the post was published
   */
  date: Date;

  /**
   * The message translated into different locales
   */
  translations: Record<string, string>;

  /**
   * @param  data    The news data
   * @param  locale  Locale to use for determining language
   */
  constructor(data: RawNews, { locale }: { locale: Locale } = { locale: 'en' }) {
    super({...data, Activation: data.EventStartDate, Expiry: data.EventEndDate});

    this.message = (data.Messages.find((msg) => msg.LanguageCode === locale) || { Message: '' }).Message;
    if (langString.test(this.message)) {
      this.message = languageString(this.message, locale);
    }

    this.link = data.Prop;
    if ((!this.link || !this.link.length) && data.Links && data.Links.length) {
      this.link = (data.Links.find((l) => l.LanguageCode === locale) || { Link: 'https://www.warframe.com/' }).Link;
    }

    this.imageLink = data.ImageUrl ? deProxy(data.ImageUrl) : cdn('img/news-placeholder.png');

    this.priority = data.Priority;

    this.date = parseDate(data.Date);

    this.translations = {};
    data.Messages.forEach((message) => {
      this.translations[message.LanguageCode] = message.Message;

      if (langString.test(message.Message)) {
        this.translations[message.LanguageCode] = languageString(message.Message, message.LanguageCode as Locale);
      }
    });
  }

  /**
   * ETA string (at time of object creation)
   */
  get eta(): string {
    if (this.expiry) {
      const timeDelta = fromNow(this.expiry);
      return `in ${timeDeltaToString(timeDelta)}`;
    }
    const timeDelta = toNow(this.date);
    return `${timeDeltaToString(timeDelta)} ago`;
  }

  /**
   * Whether this is an update news item
   */
  get update(): boolean {
    return updateReg.test(this.link);
  }

  /**
   * Whether this is a prime access news item
   */
  get primeAccess(): boolean {
    return primeAccessReg.test(this.link);
  }

  /**
   * Whether or not this is a stream
   */
  get stream(): boolean {
    return streamReg.test(this.message);
  }

  /**
   * The title of the news item in the specified language
   * @param {string} langCode Ex. 'es', 'de', 'fr'
   * @returns {string} The title of the news item in the specified language
   */
  getTitle(langCode: Locale): string {
    return langCode in this.translations ? this.translations[langCode] : this.message;
  }
}
