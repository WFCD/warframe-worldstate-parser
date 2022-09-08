'use strict';

const WorldstateObject = require('./WorldstateObject');

// This is a confirmed starting time for Corpus (in millis)
// All faction operation should use this as a calculation point
// Unless there's a better logic
const corpusTimeMillis = 1655182800000;
const fullCycle = 18000000;
const stateMaximum = 9000000;

/**
 * Represents the current Zariman Corpus/Grineer Cycle
 * @extends {WorldstateObject}
 */
module.exports = class ZarimanCycle extends WorldstateObject {
  /**
   * @param   {Date}              bountiesEndDate The current zariman cycle expiry
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
    Object.defineProperty(this, 'currentTime', { enumerable: false, configurable: false });

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
     * Whether or not this it's corpus or grineer
     * @type {boolean}
     */
    this.isCorpus = ec.isCorpus;

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

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isCorpus ? 'grineer' : 'corpus'}`;
  }

  /**
   * Get whether the event has expired
   * @returns {boolean}
   */
  getExpired() {
    return this.expiry ? this.timeDate.fromNow(this.expiry) < 0 : /* istanbul ignore next */ true;
  }

  getCurrentZarimanCycle() {
    const now = Date.now();
    // determine if it is corpus cycle or grineer cycle based on bounty end time
    // we subtract 5000 millis (5 seconds) to ensure the corpus/grineer calculation is correct
    const bountiesClone = this.bountiesEndDate.getTime() - 5000;
    const millisLeft = this.timeDate.fromNow(new Date(bountiesClone));
    // the following line is a modulus operation
    // this ensures that our calculation is correct if bountiesClone is before corpusTimeMillis
    // if you really care, read https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
    const cycleTimeElapsed = (((bountiesClone - corpusTimeMillis) % fullCycle) + fullCycle) % fullCycle;
    const cycleTimeLeft = fullCycle - cycleTimeElapsed;
    // if timeInCycle is more than 2.5 hours, it is corpus, otherwise it is grineer
    const isCorpus = cycleTimeLeft > stateMaximum;

    const minutesCoef = 1000 * 60;
    const expiry = new Date(Math.round((now + millisLeft) / minutesCoef) * minutesCoef);
    const state = isCorpus ? 'corpus' : 'grineer';

    return {
      isCorpus,
      timeLeft: this.timeDate.timeDeltaToString(millisLeft),
      expiry,
      expiresIn: millisLeft,
      state,
      start: expiry.getTime() - stateMaximum,
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
};
