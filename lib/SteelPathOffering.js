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

/**
 * Start of Steel Path cycle calculations
 * @type {Date}
 */
const start = new Date('2020-11-16T00:00:00.000Z');

/**
 * Array of rewards
 * @type {string[]}
 */
const rewards = [
  { name: 'Umbra Forma Blueprint', cost: 150 },
  { name: '50,000 Kuva', cost: 55 },
  { name: 'Kitgun Riven Mod', cost: 75 },
  { name: '3x Forma', cost: 75 },
  { name: 'Zaw Riven Mod', cost: 75 },
  { name: '30,000 Endo', cost: 150 },
  { name: 'Rifle Riven Mod', cost: 75 },
  { name: 'Shotgun Riven Mod', cost: 75 },
];

module.exports = class SteelPathOffering {
  constructor({ timeDate }) {
    const sSinceStart = (Date.now() - start.getTime()) / 1000;
    const eightWeeks = 4838400;
    const sevenDays = 604800;

    const ind = Math.floor((sSinceStart % eightWeeks) / sevenDays);

    this.currentReward = rewards[ind];

    this.activation = startOfWeek();

    this.expiry = endOfWeek();

    this.remaining = timeDate.timeDeltaToString(this.expiry.getTime() - Date.now());

    this.rotation = rewards;
  }
};
