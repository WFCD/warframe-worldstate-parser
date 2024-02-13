import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

const nightTime = 3000;

const maximums = {
  day: 6000000,
  night: 3000000,
};

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldstateObject}
 */
export default class CetusCycle extends WorldstateObject {
  /**
   * The end of the Ostron bounties timer (marks the end of night)
   * @type {Date}
   * @private
   */
  #bountiesEndDate;
  /**
   * The current cetus cycle, for calculating the other fields
   * @type {object}
   * @private
   */
  #ec;

  /**
   * @param   {Date}              bountiesEndDate The end date for Ostron bounties
   */
  constructor(bountiesEndDate) {
    super({ _id: { $oid: 'cetusCycle0' } });

    this.#bountiesEndDate = bountiesEndDate;
    this.#ec = this.getCurrentCetusCycle();

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = this.#ec.expiry;

    /**
     * The date and time at which the event started
     * @type {Date}
     */
    this.activation = new Date(this.#ec.start);

    /**
     * Whether it's daytime
     * @type {boolean}
     */
    this.isDay = this.#ec.dayTime;

    /**
     * Current cycle state. One of `day`, `night`
     * @type {string}
     */
    this.state = this.#ec.state;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = this.#ec.timeLeft;

    /**
     * Whether this is for Cetus Cycle
     * @type {boolean}
     */
    this.isCetus = true;

    this.id = `cetusCycle${this.expiry.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isDay ? 'Night' : 'Day'}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} whether the event has expired
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  getCurrentCetusCycle() {
    const now = Date.now();
    const bountiesClone = this.#bountiesEndDate;
    bountiesClone.setSeconds(0);
    let millisLeft = fromNow(bountiesClone);
    const secondsToNightEnd = (millisLeft / 1000).toFixed(0);
    const dayTime = secondsToNightEnd > nightTime;

    const secondsRemainingInCycle = dayTime ? secondsToNightEnd - nightTime : secondsToNightEnd;
    millisLeft = secondsRemainingInCycle * 1000;
    const minutesCoef = 1000 * 60;
    const expiry = new Date(Math.round((now + millisLeft) / minutesCoef) * minutesCoef);
    const state = dayTime ? 'day' : 'night';

    return {
      dayTime,
      timeLeft: timeDeltaToString(millisLeft),
      expiry,
      expiresIn: millisLeft,
      state,
      start: expiry.getTime() - maximums[state],
    };
  }

  /**
   * The event's string representation
   * @returns {string} The string representation of the event
   */
  toString() {
    const lines = [
      `Operator, Cetus is currently in ${this.state}time`,
      `Time remaining until ${this.isDay ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
