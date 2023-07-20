'use strict';

const WorldstateObject = require('./WorldstateObject');

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
 * @extends {WorldstateObject}
 */
class EarthCycle extends WorldstateObject {
  /**
   * @param   {Object}            data            The event data
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   */
  constructor({ mdConfig, timeDate }) {
    super({ _id: { $oid: 'earthCycle0' } }, { timeDate });

    const ec = getCurrentEarthCycle();

    /**
     * The markdown settings
     * @type {MarkdownSettings}
     * @private
     */
    this.mdConfig = mdConfig;
    Object.defineProperty(this, 'mdConfig', { enumerable: false, configurable: false });

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = ec.expiry;

    /**
     * The date and time at which the event started
     * @type {Date}
     */
    this.activation = ec.start;

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

    this.id = `earthCycle${ec.rounded.getTime()}`;
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
      `Operator, Earth is currently in ${this.dayTime ? 'Day' : 'Night'}time`,
      `Time remaining until ${this.dayTime ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = EarthCycle;
