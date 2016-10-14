'use strict';

const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a game news item
 * @extends {WorldstateObject}
 */
class News extends WorldstateObject {
  /**
   * @param   {Object} data The news data
   * @param   {Object} options.timeDate The time and date functions
   * @param   {Object} options.mdConfig The markdown configuration
   */
  constructor(data, { timeDate, mdConfig }) {
    super(data);

    /**
     * The markdown settings
     * @type {Object.<string, string>}
     * @private
     */
    this.mdConfig = mdConfig;

    /**
     * The ETA formatting function
     * @type {function}
     * @private
     */
    this.timeDate = timeDate;

    /**
     * The news message
     * @type {string}
     */
    this.message = data.Messages[0].Message;

    /**
     * The forum post
     * @type {string}
     */
    this.link = data.Prop;

    /**
     * The image link
     * @type {string}
     */
    this.imageLink = data.ImageURL;

    /**
     * Whether this has priority or not
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
   * String representation
   * @returns {string}
   */
  toString() {
    return `[${this.getETAString()}] ${this.mdConfig.linkBegin}${this.message}` +
      `${this.mdConfig.linkMid}${this.link}${this.mdConfig.linkEnd}`;
  }

  /**
   * ETA string
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
    return this.message.test(/update/i);
  }

  /**
   * Whether or not this is about a new Prime Access
   * @returns {boolean}
   */
  isPrimeAccess() {
    return this.message.test(/access/i);
  }
}

module.exports = News;
