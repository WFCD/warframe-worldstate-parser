'use strict';

const WorldstateObject = require('./WorldstateObject.js');

function getCurrentEarthCycle() {
  const cycleSeconds = Math.floor(Date.now() / 1000) % 28800; // One cycle = 8 hours = 28800 seconds
  const dayTime = cycleSeconds < 14400;

  let secondsLeft = 14400 - (cycleSeconds % 14400);
  const millisLeft = secondsLeft * 1000;
  const expiry = new Date(Date.now() + (secondsLeft * 1000));

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
  constructor({ mdConfig }) {
    super({ _id: { $oid: `earthCyle${getCurrentEarthCycle().expiry.getTime()}` } });


    const ec = getCurrentEarthCycle();
    Object.defineProperty(this, 'ec', { enumerable: false, configurable: false });

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
     * Whether or not this it's daytime
     * @type {boolean}
     */
    this.isDay = ec.dayTime;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = ec.timeLeft;
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
