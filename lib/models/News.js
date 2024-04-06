import { fromNow, parseDate, timeDeltaToString, toNow, languageString } from 'warframe-worldstate-data/utilities';

import { cdn } from '../supporting/ImgCdn.js';
import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

const updateReg = /(update|hotfix)/i;
const primeAccessReg = /(access)/i;
const streamReg = /(devstream|prime-time|warframeinternational|stream)/i;
const langString = /(\/Lotus\/Language\/)/i;

/**
 * Represents a game news item
 * @augments {WorldstateObject}
 */
export default class News extends WorldstateObject {
  /**
   * @param   {object}             data            The news data
   * @param   {string}             locale     Locale to use for determining language
   */
  constructor(data, { locale = 'en' } = { locale: 'en' }) {
    super(data);

    /**
     * The news message
     * @type {string}
     */
    this.message = (data.Messages.find((msg) => msg.LanguageCode === locale) || { Message: '' }).Message;
    if (langString.test(this.message)) {
      this.message = languageString(this.message, locale);
    }

    /**
     * The link to the forum post
     * @type {string}
     */
    this.link = data.Prop;
    if ((!this.link || !this.link.length) && data.Links && data.Links.length) {
      this.link = (data.Links.find((l) => l.LanguageCode === locale) || { Link: 'https://www.warframe.com/' }).Link;
    }

    /**
     * The news's image link
     * @type {string}
     */
    this.imageLink = data.ImageUrl || cdn('img/news-placeholder.png');

    /**
     * Whether this has priority over other news or not
     * @type {boolean}
     */
    this.priority = data.Priority;

    /**
     * The date at which the post was published
     * @type {Date}
     */
    this.date = parseDate(data.Date);

    /**
     * The date at which the event starts
     * @type {?Date}
     */
    this.startDate = data.EventStartDate ? parseDate(data.EventStartDate) : undefined;

    /**
     * The date at which the event ends
     * @type {?Date}
     */
    this.endDate = data.EventEndDate ? parseDate(data.EventEndDate) : undefined;

    /**
     * ETA string (at time of object creation)
     * @type {string}
     */
    this.eta = this.getETAString();

    /**
     * Whether this is an update news item
     * @type {boolean}
     */
    this.update = this.isUpdate();

    /**
     * Whether this is a prime access news item
     * @type {boolean}
     */
    this.primeAccess = this.isPrimeAccess();

    /**
     * Whether or not this is a stream
     * @type {boolean}
     */
    this.stream = this.isStream();

    /**
     * Translation of the news item
     * @type {Record<string, string>}
     */
    this.translations = {};
    data.Messages.forEach((message) => {
      this.translations[message.LanguageCode ?? 'en'] = message.Message;

      if (langString.test(message.Message)) {
        this.translations[message.LanguageCode] = languageString(message.Message, message.LanguageCode);
      }
    });

    /**
     * The string representation of this object at creation
     * @type {string}
     */
    this.asString = this.toString();
  }

  /**
   * Get a string indicating how long it will take for the event to start or
   * how long it's been since the news went up
   * @returns {string} the estimated time of arrival for the event
   */
  getETAString() {
    if (this.endDate) {
      const timeDelta = fromNow(this.endDate);
      return `in ${timeDeltaToString(timeDelta)}`;
    }
    const timeDelta = toNow(this.date);
    return `${timeDeltaToString(timeDelta)} ago`;
  }

  /**
   * Whether or not this is about a game update
   * @returns {boolean} whether the news is about an update
   */
  isUpdate() {
    return updateReg.test(this.link);
  }

  /**
   * Whether this is about a new Prime Access
   * @returns {boolean} whether the news is about a new Prime Access
   */
  isPrimeAccess() {
    return primeAccessReg.test(this.link);
  }

  /**
   * Whether this is about a new stream
   * @returns {boolean} whether the news is for a stream
   */
  isStream() {
    return streamReg.test(this.message);
  }

  /**
   * String representation
   * @returns {string} string representation
   */
  toString() {
    return (
      `[${this.getETAString()}] ${mdConfig.linkBegin}${this.message}` +
      `${mdConfig.linkMid}${this.link}${mdConfig.linkEnd}`
    );
  }

  /**
   * The title of the news item in the specified language
   * @param {string} langCode Ex. 'es', 'de', 'fr'
   * @returns {string} The title of the news item in the specified language
   */
  getTitle(langCode) {
    return langCode in this.translations ? this.translations[langCode] : this.message;
  }
}
