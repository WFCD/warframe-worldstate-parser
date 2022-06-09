'use strict';

const WorldstateObject = require('./WorldstateObject');

// This is a confirmed starting time for Corpus (in millis)
// All faction operation should use this as a calculation point
// Unless there's a better logic
const corpusTimeMillis = 1654725600000;
const fullCycle = 28800000;

const maximums = {
  corpus: 14400000,
  grineer: 14400000,
};

/**
 * Represents the current Earth Day/Night Cycle
 * @extends {WorldstateObject}
 */
class ZarimanCycle extends WorldstateObject {
  /**
   * @param   {Date}              bountiesEndDate The end date for Zariman bounties
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   */
  constructor(bountiesEndDate, { mdConfig, timeDate }) {
    super({ _id: { $oid: 'zarimanCycle0' } }, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The end of the Zariman bounties timer, the faction changes exactly half way through
     * @type {Date}
     * @private
     */
    this.bountiesEndDate = bountiesEndDate;
    Object.defineProperty(this, 'bountiesEndDate', { enumerable: false, configurable: false });

    /**
     * The time and date functions
     * @type {TimeDateFunctions}
     * @private
     */
    this.timeDate = timeDate;
    Object.defineProperty(this, 'timeDate', { enumerable: false, configurable: false });

    /**
     * The current zariman cycle, for calculating the other fields
     * @type {Object}
     * @private
     */
    const ec = this.getCurrentZarimanCycle();
    Object.defineProperty(this, 'ec', { enumerable: false, configurable: false });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = ec.expiry;

    /**
     * The date and time at which the event started
     * @type {Date}
     */
    this.activation = new Date(ec.start);

    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    this.isCorpus = ec.corpusTime;

    /**
     * Current cycle state. One of `corpus`, `grineer`
     * @type {string}
     */
    this.state = ec.state;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = ec.timeLeft;

    this.id = `zarimanCycle${this.expiry.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isCorpus ? 'Grineer' : 'Corpus'}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  getCurrentZarimanCycle() {
    const now = Date.now();
    const bountiesClone = this.bountiesEndDate;
    bountiesClone.setSeconds(0);
    // cycles are offset by 2 hours from bounties
    let millisLeft = this.timeDate.fromNow(bountiesClone) + 14400000;
    // if millis left is greater than a full cycle of 4 hours, then we are on the previous cycle
    if (millisLeft > fullCycle) {
        millisLeft -= fullCycle;
    }

    // determine if it is corpus cycle or grineer cycle
    const timeInCycle = (now - corpusTimeMillis) % fullCycle;
    // if timeInCycle is less than 4 hours, it is corpus, otherwise it is grineer
    const corpusTime = timeInCycle <= 14400000;

    const minutesCoef = 1000 * 60;
    const expiry = new Date(Math.round((now + millisLeft) / minutesCoef) * minutesCoef);
    const state = corpusTime ? 'corpus' : 'grineer';

    return {
      corpusTime,
      timeLeft: this.timeDate.timeDeltaToString(millisLeft),
      expiry,
      expiresIn: millisLeft,
      state,
      start: expiry.getTime() - maximums[state],
    };
  }

  /**
   * The event's string representation
   * @returns {string}
   */
  toString() {
    const lines = [
      `Operator, Zariman Ten Zero is currently occupied by ${this.state}`,
      `Time remaining until ${this.isCorpus ? 'grineer' : 'corpus'} takeover: ${this.timeLeft}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = ZarimanCycle;