'use strict';

const WorldstateObject = require('./WorldstateObject');

const cycleTime = 36000;
const stateTime = 7200;

const getStageInfo = () => {
  const stages = ['sorrow', 'fear', 'joy', 'anger', 'envy'];
  const cycleDelta = (Math.floor(Date.now() / 1000) - 52) % cycleTime;
  const stage = Math.floor(cycleDelta / stateTime);
  const stageDelta = cycleDelta % stateTime;
  const untilNext = stateTime - stageDelta;

  const expiry = new Date(Date.now() + untilNext * 1000);
  const activation = new Date(expiry.getTime() - 7200 * 1000);
  return {
    stage: stages[stage],
    expiry,
    activation,
  };
};

/**
 * @typedef {WorldstateObject} DuviriCycle
 * @extends {WorldstateObject}
 */
class DuviriCycle extends WorldstateObject {
  constructor({ timeDate }) {
    super({ _id: { $oid: 'duviriCycle0' } }, { timeDate });
    const { activation, expiry, stage: stageKey } = getStageInfo();

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
    this.stageKey = stageKey;

    this.id = `duviriCycle${this.stageKey}${expiry.getTime()}`;
  }
}

module.exports = DuviriCycle;
