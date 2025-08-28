
import type DuviriChoice from '../supporting/DuviriChoice';
import WorldstateObject from './WorldstateObject';

const cycleTime = 36000;
const stateTime = 7200;

const states = ['sorrow', 'fear', 'joy', 'anger', 'envy'];

const getStageInfo = (): {
  state: string;
  expiry: Date;
  activation: Date;
} => {
  const cycleDelta = (Math.floor(Date.now() / 1000) - 52) % cycleTime;
  const stateInd = Math.floor(cycleDelta / stateTime);
  const stateDelta = cycleDelta % stateTime;
  const untilNext = stateTime - stateDelta;
  const expiry = new Date(Date.now() + untilNext * 1000);
  expiry.setSeconds(0);
  expiry.setMilliseconds(0);
  const activation = new Date(expiry.getTime() - stateTime * 1000);
  activation.setSeconds(0);
  activation.setMilliseconds(0);
  return {
    state: states[stateInd],
    expiry,
    activation,
  };
};

/**
 * @typedef {WorldstateObject} DuviriCycle
 * @augments {WorldstateObject}
 */
export default class DuviriCycle extends WorldstateObject {
  /**
   * Current stage key
   */
  state: string;

  /**
   * Choice options for this Cycle
   */
  choices: DuviriChoice[];

  /**
   * @param duviriChoices The current circuit choices
   */
  constructor(duviriChoices: DuviriChoice[]) {
    super({ _id: { $oid: 'duviriCycle0' } });
    const { activation, expiry, state } = getStageInfo();

    this.activation = activation;
    this.expiry = expiry;
    this.state = state;
    this.choices = duviriChoices;
    this.id = `duviriCycle${this.state}${this.expiry.getTime()}`;
  }
}
