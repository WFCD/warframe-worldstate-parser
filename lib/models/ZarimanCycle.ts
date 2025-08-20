import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';

import mdConfig from '../supporting/MarkdownSettings';

import WorldstateObject from './WorldstateObject';

// This is a confirmed starting time for Corpus (in millis)
// All faction operation should use this as a calculation point
// Unless there's a better logic
const corpusTimeMillis = 1655182800000;
const fullCycle = 18000000;
const stateMaximum = 9000000;

export interface ZCycle {
  isCorpus: boolean;
  timeLeft: string;
  expiry: Date;
  expiresIn: number;
  state: string;
  start: number;
}

/**
 * Represents the current Zariman Corpus/Grineer Cycle
 * @augments {WorldstateObject}
 */
export default class ZarimanCycle extends WorldstateObject {
  isCorpus: boolean;
  state: string;
  timeLeft: string;
  shortString: string;

   /**
   * The current zariman cycle, for calculating the other fields
   */
  private ec: ZCycle;

  /**
   * The end of the Zariman bounties timer, the faction changes exactly half way through
   */
  private bountiesEndDate: Date;

  /**
   * @param {Date} bountiesEndDate The current Zariman cycle expiry
   */
  constructor(bountiesEndDate: Date) {
    super({ _id: { $oid: 'zarimanCycle0' } });

    this.bountiesEndDate = bountiesEndDate;
    this.ec = this.getCurrentZarimanCycle();

    /**
     * The date and time at which the event ends
     * @type {Date}
     */
    this.expiry = this.ec.expiry;

    /**
     * The date and time at which the event started
     * @type {Date}
     */
    this.activation = new Date(this.ec.start);

    /**
     * Whether or not this it's corpus or grineer
     * @type {boolean}
     */
    this.isCorpus = this.ec.isCorpus;

    /**
     * Current cycle state. One of `corpus`, `grineer`
     * @type {string}
     */
    this.state = this.ec.state;

    /**
     * Time remaining string
     * @type {string}
     */
    this.timeLeft = this.ec.timeLeft;

    this.id = `zarimanCycle${this.expiry.getTime()}`;

    this.shortString = `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isCorpus ? 'grineer' : 'corpus'}`;
  }

  /**
   * Get whether the event has expired
   * @returns {boolean} whether this is expired
   */
  getExpired(): boolean {
    return this.expiry ? fromNow(this.expiry) < 0 : /* istanbul ignore next */ true;
  }

  getCurrentZarimanCycle(): ZCycle {
    const now = Date.now();
    // determine if it is corpus cycle or grineer cycle based on bounty end time
    // we subtract 5000 millis (5 seconds) to ensure the corpus/grineer calculation is correct
    const bountiesClone = this.bountiesEndDate.getTime() - 5000;
    const millisLeft = fromNow(new Date(bountiesClone));
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
      timeLeft: timeDeltaToString(millisLeft),
      expiry,
      expiresIn: millisLeft,
      state,
      start: expiry.getTime() - stateMaximum,
    };
  }

  /**
   * The event's string representation
   */
  toString(): string {
    const lines = [
      `Operator, Zariman Ten Zero is currently occupied by ${this.state}`,
      `Time remaining until ${this.isCorpus ? 'grineer' : 'corpus'} takeover: ${this.timeLeft}`,
    ];

    return lines.join(mdConfig.lineEnd);
  }
}
