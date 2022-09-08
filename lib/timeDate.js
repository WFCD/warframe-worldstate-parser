'use strict';

const epochZero = {
  $date: {
    $numberLong: 0,
  },
};

/**
 * @param   {number} millis The number of milliseconds in the time delta
 * @returns {string}
 */
function timeDeltaToString(millis) {
  if (typeof millis !== 'number') {
    throw new TypeError('millis should be a number');
  }
  const timePieces = [];
  const prefix = millis < 0 ? '-' : '';
  let seconds = Math.abs(millis / 1000);

  // Seconds in a day
  if (seconds >= 86400) {
    timePieces.push(`${Math.floor(seconds / 86400)}d`);
    seconds = Math.floor(seconds) % 86400;
  }
  // Seconds in an hour
  if (seconds >= 3600) {
    timePieces.push(`${Math.floor(seconds / 3600)}h`);
    seconds = Math.floor(seconds) % 3600;
  }
  if (seconds >= 60) {
    timePieces.push(`${Math.floor(seconds / 60)}m`);
    seconds = Math.floor(seconds) % 60;
  }

  /* istanbul ignore else */
  if (seconds >= 0) {
    timePieces.push(`${Math.floor(seconds)}s`);
  }
  return `${prefix}${timePieces.join(' ')}`;
}

/**
 * Returns the number of milliseconds between now and a given date
 * @param   {Date} d         The date from which the current time will be subtracted
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
function fromNow(d, now = Date.now) {
  return d.getTime() - now();
}

/**
 * Returns the number of milliseconds between a given date and now
 * @param   {Date} d         The date that the current time will be subtracted from
 * @param   {function} [now] A function that returns the current UNIX time in milliseconds
 * @returns {number}
 */
function toNow(d, now = Date.now) {
  return now() - d.getTime();
}

/**
 * Returns a new Date constructed from a worldState date object
 * @param {Object} d The worldState date object
 * @returns {Date}
 */
function parseDate(d) {
  const safeD = d || epochZero;
  const dt = safeD.$date || epochZero.$date;
  return new Date(safeD.$date ? Number(dt.$numberLong) : 1000 * d.sec);
}

/**
 * An object containing functions to format dates and times
 * @typedef {Object.<function>}           TimeDateFunctions
 * @property {function} timeDeltaToString - Converts a time difference to a string
 * @property {function} fromNow           - Returns the number of milliseconds between now and
 *                                          a given date
 * @property {function} toNow             - Returns the number of milliseconds between a given
 *                                          date and now
 */
module.exports = {
  timeDeltaToString,
  fromNow,
  toNow,
  parseDate,
};
