import { fromNow, timeDeltaToString } from 'warframe-worldstate-data/utilities';
import WorldstateObject from './WorldstateObject';

const nightTime = 3000;

const maximums = {
  day: 6000000,
  night: 3000000,
};

export interface CurrentCetusCycle {
  dayTime: boolean;
  timeLeft: string;
  expiry: Date;
  expiresIn: number;
  state: string;
  start: number;
}

/**
 * Represents the current Earth Day/Night Cycle
 * @augments {WorldstateObject}
 */
export default class CetusCycle extends WorldstateObject {
  /**
   * The end of the Ostron bounties timer (marks the end of night)
   */
  private bountiesEndDate: Date;

  /**
   * The current cetus cycle, for calculating the other fields
   */
  private ec: CurrentCetusCycle;

  /**
   * Whether it's daytime
   */
  isDay: boolean;

  /**
   * Current cycle state. One of `day`, `night`
   */
  state: string;

  /**
   * Time remaining string
   */
  timeLeft: string;

  /**
   * Whether this is for Cetus Cycle
   */
  isCetus: boolean;

  /**
   * @param bountiesEndDate The end date for Ostron bounties
   */
  constructor(bountiesEndDate: Date) {
    super({ _id: { $oid: 'cetusCycle0' } });

    this.bountiesEndDate = bountiesEndDate;

    this.ec = this.getCurrentCetusCycle();

    this.expiry = this.ec.expiry;

    this.activation = new Date(this.ec.start);

    this.isDay = this.ec.dayTime;

    this.state = this.ec.state;

    this.timeLeft = this.ec.timeLeft;

    this.isCetus = true;

    this.id = `cetusCycle${this.expiry.getTime()}`;
  }

  /**
   * Whether or not the event has expired
   */
  get expired(): boolean {
    return fromNow(this.expiry!) < 0;
  }

  /**
   * Short summary of the current state
   */
  get shortString(): string {
    return `${this.timeLeft.replace(/\s\d*s/gi, '')} to ${this.isDay ? 'Night' : 'Day'}`;
  }

  private getCurrentCetusCycle(): CurrentCetusCycle {
    const now = Date.now();
    const bountiesClone = this.bountiesEndDate;
    bountiesClone.setSeconds(0);
    let millisLeft = fromNow(bountiesClone);
    const secondsToNightEnd = Number((millisLeft / 1000).toFixed(0));
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
}
