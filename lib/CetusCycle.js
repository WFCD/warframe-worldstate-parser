'use strict';

const WorldstateObject = require('./WorldstateObject');

const nightTime = 3000;

const maximums = {
  day: 6000000,
  night: 3000000,
};

/**
 * Represents the current Earth Day/Night Cycle
 * @extends {WorldstateObject}
 */
class CetusCycle extends WorldstateObject {
  /**
   * @param   {Date}              bountiesEndDate The end date for Ostron bounties
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   */
  constructor(bountiesEndDate, { mdConfig, timeDate }) {
    super({ _id: { $oid: 'cetusCycle0' } }, { timeDate });

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The end of the Ostron bounties timer (marks the end of night)
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
     * The current cetus cycle, for calculating the other fields
     * @type {Object}
     * @private
     */
    const ec = this.getCurrentCetusCycle();
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
    this.isDay = ec.dayTime;

    /**
     * Current cycle state. One of `day`, `night`
     * @type {string}
     */
    this.state = ec.state;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = ec.timeLeft;

    /**
     * Whether or not this is for Cetus Cycle
     * @type {boolean}
     */
    this.isCetus = true;

    this.id = `cetusCycle${this.expiry.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isDay ? 'Night' : 'Day'}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  getCurrentCetusCycle() {
    const now = Date.now();
    const bountiesClone = this.bountiesEndDate;
    bountiesClone.setSeconds(0);
    let millisLeft = this.timeDate.fromNow(bountiesClone);
    const secondsToNightEnd = (millisLeft / 1000).toFixed(0);
    const dayTime = secondsToNightEnd > nightTime;

    const secondsRemainingInCycle = dayTime ? secondsToNightEnd - nightTime : secondsToNightEnd;
    millisLeft = secondsRemainingInCycle * 1000;
    const minutesCoef = 1000 * 60;
    const expiry = new Date(Math.round((now + millisLeft) / minutesCoef) * minutesCoef);
    const state = dayTime ? 'day' : 'night';

    return {
      dayTime,
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
      `Operator, Cetus is currently in ${this.state}time`,
      `Time remaining until ${this.isDay ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = CetusCycle;
