'use strict';

const monday = 1;

function getFirstDayOfWeek() {
  const resultDate = new Date();
  const offset = resultDate.getUTCDay() === 0 ? 6 : resultDate.getUTCDay() - monday;
  resultDate.setUTCDate(resultDate.getUTCDate() - offset);
  resultDate.setUTCHours(0);
  resultDate.setUTCMinutes(0);
  resultDate.setUTCSeconds(0);
  resultDate.setUTCMilliseconds(0);
  return resultDate;
}

function getLastDayOfWeek() {
  const last = new Date(getFirstDayOfWeek());
  last.setUTCDate(last.getUTCDate() + 4);
  last.setUTCHours(59);
  last.setUTCMinutes(59);
  last.setUTCSeconds(59);
  last.setUTCMilliseconds(0);
  return last;
}

/**
 * Start of Steel Path cycle calculations
 * @type {Date}
 */
const start = new Date('2020-11-16T00:00:00.000Z');

module.exports = class SteelPathOffering {
  constructor({ timeDate, translator, locale }) {
    const sSinceStart = (Date.now() - start.getTime()) / 1000;
    const eightWeeks = 4838400;
    const sevenDays = 604800;

    const ind = Math.floor((sSinceStart % eightWeeks) / sevenDays);

    this.currentReward = translator.steelPath(locale).rotation[ind];

    this.activation = getFirstDayOfWeek();

    this.expiry = getLastDayOfWeek();

    this.remaining = timeDate.timeDeltaToString(this.expiry.getTime() - Date.now());

    this.rotation = translator.steelPath(locale).rotation;
    this.evergreens = translator.steelPath(locale).evergreen;
  }
};
