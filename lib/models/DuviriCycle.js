'use strict';

const WorldstateObject = require('./WorldstateObject');

const cycleTime = 36000;
const stateTime = 7200;

const states = ['sorrow', 'fear', 'joy', 'anger', 'envy'];

const getStageInfo = () => {
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
 * @extends {WorldstateObject}
 */
class DuviriCycle extends WorldstateObject {
  constructor({ timeDate, translator, duviriChoices }) {
    super({ _id: { $oid: 'duviriCycle0' } }, { timeDate, translator });
    const { activation, expiry, state } = getStageInfo();

    /**
     * When the cycle start(s/ed)
     * @type {Date}
     */
    this.activation = activation;
    /**
     * When the cycle end(s/ed)
     * @type {Date}
     */
    this.expiry = expiry;
    /**
     * Current stage key
     * @type {string}
     */
    this.state = state;
    /**
     * Choice options for this Cycle
     */
    this.choices = duviriChoices;

    this.id = `duviriCycle${this.state}${this.expiry.getTime()}`;
  }

  toString() {
    return `${this.translator.toTitleCase(this.state)} spiral. ${this.translator.toTitleCase(
      states[(states.indexOf(this.state) + 1) % 5]
    )} in ${this.timeDate.timeDeltaToString(new Date(this.expiry).getTime() - Date.now())}`;
  }
}

module.exports = DuviriCycle;
