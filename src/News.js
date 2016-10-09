'use strict';

const md = require('node-md-config');
const utils = require('./utils.js');
const WorldstateObject = require('./WorldstateObject.js');

/**
 * Represents a game news item
 * @extends {WorldstateObject}
 */
class News extends WorldstateObject {
  /**
   * @param   {Object} data The news data
   */
  constructor(data) {
    super(data);

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
    return `[${this.ETAString}] ${md.linkBegin}${this.message}${md.linkMid}${this.link}${md.linkEnd}`;
  }

  /**
   * ETA string
   * @returns {string}
   */
  get ETAString() {
    const dateToUse = this.startTime || this.date;
    return utils.timeDeltaToString(Math.abs(Date.now() - dateToUse.getTime()));
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
