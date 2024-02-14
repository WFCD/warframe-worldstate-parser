import { fromNow } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

/**
 * @typedef {object} EarthCycle
 * @property {Date} expiry The date and time at which the event ends
 * @property {Date} activation The date and time at which the event started
 * @property {boolean} isDay Whether or not this it's daytime
 * @property {string} state Current cycle state. One of `day`, `night`
 * @property {string} timeLeft Time remaining string
 * @property {Date} rounded The date and time at which the event ends, rounded to the nearest minute
 * @property {Date} start The date and time at which the event started, 4 hours before the end
 * @property {boolean} expired Whether or not the event has expired
 */

/**
 * Get the current Earth Day/Night Cycle
 * @returns {EarthCycle} The current Earth Day/Night Cycle
 */
function getCurrentEarthCycle() {
  const now = Date.now();
  const cycleSeconds = Math.floor(now / 1000) % 28800; // One cycle = 8 hours = 28800 seconds
  const dayTime = cycleSeconds < 14400;

  let secondsLeft = 14400 - (cycleSeconds % 14400);
  const millisLeft = secondsLeft * 1000;
  const expiry = new Date(now + secondsLeft * 1000);

  const minutesCoef = 1000 * 60;
  const rounded = new Date(Math.round((now + millisLeft) / minutesCoef) * minutesCoef);

  const timePieces = [];
  if (secondsLeft > 3600) {
    timePieces.push(`${Math.floor(secondsLeft / 3600)}h`);
    secondsLeft %= 3600;
  }
  if (secondsLeft > 60) {
    timePieces.push(`${Math.floor(secondsLeft / 60)}m`);
    secondsLeft %= 60;
  }
  timePieces.push(`${secondsLeft}s`);

  return {
    dayTime,
    timeLeft: timePieces.join(' '),
    expiry,
    expiresIn: millisLeft,
    rounded,
    state: dayTime ? 'day' : 'night',
    start: new Date(expiry.getTime() - 1000 * 60 * 60 * 4), // start is 4h before end
  };
}

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldstateObject}
 */
export default class EarthCycle extends WorldstateObject {
  #ec = getCurrentEarthCycle();
  constructor() {
    super({ _id: { $oid: 'earthCycle0' } });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = this.#ec.expiry;

    /**
     * The date and time at which the event started
     * @type {Date}
     */
    this.activation = this.#ec.start;

    /**
     * Whether or not this it's daytime
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

    this.id = `earthCycle${this.#ec.rounded.getTime()}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} Whether or not the event has expired
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string} The string representation of the event
   */
  toString() {
    const lines = [
      `Operator, Earth is currently in ${this.isDay ? 'Day' : 'Night'}time`,
      `Time remaining until ${this.isDay ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
