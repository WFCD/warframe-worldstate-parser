'use strict';

const endOfWeek = () => {
  const expiry = new Date();
  expiry.setUTCHours(23);
  expiry.setUTCMinutes(59);
  expiry.setUTCSeconds(59);
  expiry.setUTCDate(expiry.getUTCDate() + (7 - expiry.getUTCDay()));
  return expiry;
};

const startOfWeek = () => {
  const activation = new Date();
  activation.setUTCHours(0);
  activation.setUTCMinutes(0);
  activation.setUTCSeconds(0);
  activation.setUTCDate(activation.getUTCDate() - (activation.getUTCDay() - 1));
  return activation;
};

module.exports = class SteelPathOffering {
  /**
   * Start of Steel Path cycle calculations
   * @type {Date}
   */
  static #start = new Date('2020-11-16T00:00:00.000Z');

  /**
   * Array of rewards
   * @type {string[]}
   */
  static #rewards = ['Umbra Forma Blueprint', '50,000 Kuva', 'Kitgun Riven Mod', '3x Forma', 'Zaw Riven Mod', '30,000 Endo', 'Rifle Riven Mod', 'Shotgun Riven Mod'];

  constructor({ timeDate }) {
    const sSinceStart = (Date.now() - SteelPathOffering.#start.getTime()) / 1000;
    const eightWeeks = 4838400;
    const sevenDays = 604800;

    const ind = Math.floor((sSinceStart % eightWeeks) / sevenDays);

    this.currentReward = SteelPathOffering.#rewards[ind];

    this.activation = startOfWeek();

    this.expiry = endOfWeek();

    this.remaining = timeDate.timeDeltaToString(this.expiry.getTime() - Date.now());

    this.rotation = SteelPathOffering.#rewards;
  }
};
