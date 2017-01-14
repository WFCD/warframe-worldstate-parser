'use strict';

const WorldstateObject = require('./WorldstateObject.js');

const updateReg = new RegExp('(update|hotfix)', i);
const primeAccessReg = new RegExp('access', i);

/**
 * Represents a game news item
 * @extends {WorldstateObject}
 */
class News extends WorldstateObject {
  /**
   * @param   {Object}             data            The news data
   * @param   {Object}             deps            The dependencies object
   * @param   {MarkdownSettings}   deps.mdConfig   The markdown settings
   * @param   {TimeDateFunctions}  deps.timeDate   The time and date functions
   */
  constructor(data, { mdConfig, timeDate }) {
    super(data);

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
    this.message = data.Messages[0].Message;

    /**
     * The link to the forum post
     * @type {string}
     */
    this.link = data.Prop;

    /**
     * The news's image link
     * @type {string}
     */
    this.imageLink = data.ImageURL;

    /**
     * Whether this has priority over other news or not
     * @type {boolean}
     */
    this.priority = data.Priority;

    /**
     * The date at which the post was published
     * @type {Date}
     */
    this.date = new Date(1000 * data.Date.sec);

    /**
     * The date at which the event starts
     * @type {?Date}
     */
    this.startDate = data.EventStartDate
      ? new Date(1000 * data.EventStartDate.sec)
      : null;

    /**
     * The date at which the event ends
     * @type {?Date}
     */
    this.endDate = data.EventEndDate
      ? new Date(1000 * data.EventEndDate.sec)
      : null;
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
    return updateReg.test(this.message);
  }

  /**
   * Whether or not this is about a new Prime Access
   * @returns {boolean}
   */
  isPrimeAccess() {
    return primeAccessReg.test(this.message);
  }

  /**
   * String representation
   * @returns {string}
   */
  toString() {
    return `[${this.getETAString()}] ${this.mdConfig.linkBegin}${this.message}` +
      `${this.mdConfig.linkMid}${this.link}${this.mdConfig.linkEnd}`;
  }
}

module.exports = News;
