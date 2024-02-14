import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings.js';

import WorldstateObject from './WorldstateObject.js';

const lStart = new Date('November 10, 2018 08:13:48 UTC');
const loopTime = 1600000;
const warmTime = 400000;
const coldTime = loopTime - warmTime;

/**
 * @typedef {object} CurrentCycle
 * @property {string} state - Current cycle state. One of `warm`, `cold`
 * @property {number} toNextMinor - Time remaining in the current cycle state
 * @property {number} toNextFull - Time remaining until the next cycle
 * @property {Date} timeAtPrevious - Date and time at which the event started
 * @property {Date} timeAtNext - Date and time at which the event start
 */

/**
 * Get the current cycle state for Orb Vallis
 * @returns {CurrentCycle} current cycle state
 */
function getCurrentCycle() {
  const sinceLast = (Date.now() - lStart) % loopTime;
  const toNextFull = loopTime - sinceLast;
  let state = 'cold';
  if (toNextFull > coldTime) {
    state = 'warm';
  }
  let toNextMinor;
  if (toNextFull < coldTime) {
    toNextMinor = toNextFull;
  } else {
    toNextMinor = toNextFull - coldTime;
  }
  const milliAtNext = Date.now() + toNextMinor;
  const milliAtPrev = Date.now() + toNextFull - (state === 'warm' ? loopTime : coldTime);
  const timeAtPrevious = new Date(milliAtPrev);
  timeAtPrevious.setSeconds(0);

  return {
    state,
    toNextMinor,
    toNextFull,
    timeAtNext: new Date(milliAtNext),
    timeAtPrevious,
  };
}

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldstateObject}
 */
export default class VallisCycle extends WorldstateObject {
  /**
   * The current cetus cycle, for calculating the other fields
   * @property {string} state - Current cycle state. One of `warm`, `cold`
   * @property {number} toNextMinor - Time remaining in the current cycle state
   * @property {number} toNextFull - Time remaining until the next cycle
   * @property {Date} timeAtPrevious - Date and time at which the event started
   * @private
   */
  #ec = getCurrentCycle();

  constructor() {
    super({ _id: { $oid: 'vallisCycle0' } });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = this.#ec.timeAtNext;

    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    this.isWarm = this.#ec.state === 'warm';

    /**
     * Current cycle state. One of `warm`, `cold`
     * @type {string}
     */
    this.state = this.#ec.state;

    /**
     * Date and time at which the event started
     * @type {Date}
     */
    this.activation = this.#ec.timeAtPrevious;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = timeDeltaToString(this.#ec.toNextMinor);

    this.id = `vallisCycle${this.#ec.timeAtPrevious.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isWarm ? 'Cold' : 'Warm'}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean} whether this event has expired
   */
  getExpired() {
    return fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string} the event's string representation
   */
  toString() {
    const lines = [
      `Operator, the Orb Vallis is currently ${this.isWarm ? 'Warm' : 'Cold'}`,
      `Time remaining until ${this.isWarm ? 'Cold' : 'Warm'}: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
