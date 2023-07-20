'use strict';

const WorldstateObject = require('./WorldstateObject');

const updateReg = /(update|hotfix)/i;
const primeAccessReg = /(access)/i;
const streamReg = /(devstream|prime-time|warframeinternational|stream)/i;
const langString = /(\/Lotus\/Language\/)/i;

/**
 * Represents a game news item
 * @extends {WorldstateObject}
 */
class News extends WorldstateObject {
  /**
   * @param   {Object}             data            The news data
   * @param   {Dependency}         deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {Translator}         deps.translator The string translator
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   * @param   {locale}             deps.locale     Locale to use for determining language
   */
  constructor(data, { mdConfig, translator, timeDate, locale }) {
    super(data, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The news message
     * @type {string}
     */
    this.message = (data.Messages.find((msg) => msg.LanguageCode === locale) || { Message: '' }).Message;
    if (langString.test(this.message)) {
      this.message = translator.languageString(this.message, locale);
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
    this.imageLink = (data.ImageUrl || 'https://i.imgur.com/CNrsc7V.png')
      .replace('https://forums.warframe.com/applications/core/interface/imageproxy/imageproxy.php?img=', '')
      .replace(/&key=\w*/gi, '')
      .replace('http://', 'https://');

    /**
     * Whether this has priority over other news or not
     * @type {boolean}
     */
    this.priority = data.Priority;

    /**
     * The date at which the post was published
     * @type {Date}
     */
    this.date = timeDate.parseDate(data.Date);

    /**
     * The date at which the event starts
     * @type {?Date}
     */
    this.startDate = data.EventStartDate ? timeDate.parseDate(data.EventStartDate) : undefined;

    /**
     * The date at which the event ends
     * @type {?Date}
     */
    this.endDate = data.EventEndDate ? timeDate.parseDate(data.EventEndDate) : undefined;

    /**
     * ETA string (at time of object creation)
     * @type {String}
     */
    this.eta = this.getETAString();

    /**
     * Whther or not this is an update news item
     * @type {boolean}
     */
    this.update = this.isUpdate();

    /**
     * Whther or not this is a prime access news item
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
     * @type {Object.<string, string>}
     */
    this.translations = {};
    data.Messages.forEach((message) => {
      this.translations[message.LanguageCode] = message.Message;

      if (langString.test(message.Message)) {
        this.translations[message.LanguageCode] = translator.languageString(message.Message, message.LanguageCode);
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
   * @returns {string}
   */
  getETAString() {
    if (this.endDate) {
      const timeDelta = this.timeDate.fromNow(this.endDate);
      return `in ${this.timeDate.timeDeltaToString(timeDelta)}`;
    }
    const timeDelta = this.timeDate.toNow(this.date);
    return `${this.timeDate.timeDeltaToString(timeDelta)} ago`;
  }

  /**
   * Whether or not this is about a game update
   * @returns {boolean}
   */
  isUpdate() {
    return updateReg.test(this.link);
  }

  /**
   * Whether or not this is about a new Prime Access
   * @returns {boolean}
   */
  isPrimeAccess() {
    return primeAccessReg.test(this.link);
  }

  /**
   * Whether or not this is about a new Prime Access
   * @returns {boolean}
   */
  isStream() {
    return streamReg.test(this.message);
  }

  /**
   * String representation
   * @returns {string}
   */
  toString() {
    return (
      `[${this.getETAString()}] ${this.mdConfig.linkBegin}${this.message}` +
      `${this.mdConfig.linkMid}${this.link}${this.mdConfig.linkEnd}`
    );
  }

  /**
   * The title of the news item in the specified language
   * @param {string} langCode Ex. 'es', 'de', 'fr'
   * @returns {string}
   */
  getTitle(langCode) {
    return langCode in this.translations ? this.translations[langCode] : this.message;
  }
}

module.exports = News;
