'use strict';

const WorldstateObject = require('./WorldstateObject');

const lStart = new Date('November 10, 2018 08:13:48 UTC');
const loopTime = 1600000;
const warmTime = 400000;
const coldTime = loopTime - warmTime;

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
 * @extends {WorldstateObject}
 */
class VallisCycle extends WorldstateObject {
  /**
   * @param   {Date}              bountiesEndDate The end date for Ostron bounties
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   * @param   {TimeDateFunctions} deps.timeDate   The time and date functions
   */
  constructor({ mdConfig, timeDate }) {
    super({ _id: { $oid: 'vallisCycle0' } }, { timeDate });

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
     * The current cetus cycle, for calculating the other fields
     * @type {Object}
     * @private
     */
    const ec = getCurrentCycle();
    Object.defineProperty(this, 'ec', { enumerable: false, configurable: false });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = ec.timeAtNext;

    /**
     * Whether or not this it's daytime
     * @type {boolean}
     */
    this.isWarm = ec.state === 'warm';

    /**
     * Current cycle state. One of `warm`, `cold`
     * @type {string}
     */
    this.state = ec.state;

    /**
     * Date and time at which the event started
     * @type {Date}
     */
    this.activation = ec.timeAtPrevious;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = timeDate.timeDeltaToString(ec.toNextMinor);

    this.id = `vallisCycle${ec.timeAtPrevious.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isWarm ? 'Cold' : 'Warm'}`;
  }

  /**
   * Get whether or not the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.timeDate.fromNow(this.expiry) < 0;
  }

  /**
   * The event's string representation
   * @returns {string}
   */
  toString() {
    const lines = [
      `Operator, the Orb Vallis is currently ${this.isWarm ? 'Warm' : 'Cold'}`,
      `Time remaining until ${this.isWarm ? 'Cold' : 'Warm'}: ${this.timeLeft}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = VallisCycle;
