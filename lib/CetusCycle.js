'use strict';

const WorldstateObject = require('./WorldstateObject.js');

const timeInCycle = 9000;
const nightTime = 3000;

function getCurrentCetusCycle() {
  const now = Date.now();
  const secondsIntoCycle = Math.floor((now / 1000) + 780) % timeInCycle;
  let secondsRemainingInCycle = secondsIntoCycle > 3000 ? 9000 - secondsIntoCycle : 3000 - secondsIntoCycle;

  const dayTime = secondsIntoCycle > 3000;

  const millisLeft = secondsRemainingInCycle * 1000;
  const expiry = (new Date(now + (secondsRemainingInCycle * 1000)));
  expiry.setSeconds(0, 0);

  const timePieces = [];
  if (secondsRemainingInCycle > 3600) {
    timePieces.push(`${Math.floor(secondsRemainingInCycle / 3600)}h`);
    secondsRemainingInCycle %= 3600;
  }
  if (secondsRemainingInCycle > 60) {
    timePieces.push(`${Math.floor(secondsRemainingInCycle / 60)}m`);
    secondsRemainingInCycle %= 60;
  }
  timePieces.push(`${secondsRemainingInCycle}s`);

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
class CetusCycle extends WorldstateObject {
  /**
   * @param   {Object}            data            The event data
   * @param   {Object}            deps            The dependencies object
   * @param   {MarkdownSettings}  deps.mdConfig   The markdown settings
   */
  constructor({ mdConfig }) {
    super({ _id: { $oid: getCurrentCetusCycle().expiry.getTime() } });


    const ec = getCurrentCetusCycle();
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
    
    /** Whether or not this is for Cetus Cycle */
    this.isCetus = true;
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
      `Operator, Cetus is currently in ${this.dayTime ? 'Day' : 'Night'}time`,
      `Time remaining until ${this.dayTime ? 'night' : 'day'}: ${this.timeLeft}`,
    ];

    return lines.join(this.mdConfig.lineEnd);
  }
}

module.exports = CetusCycle;
