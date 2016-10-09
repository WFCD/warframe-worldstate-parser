'use strict';

function timeDeltaToString(millis) {
  if (typeof millis !== 'number') {
    throw new TypeError('millis must be a number');
  }

  let seconds = millis / 1000;
  const timePieces = [];

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
  if (seconds > 0) {
    timePieces.push(`${Math.floor(seconds)}s`);
  }
  return timePieces.join(' ');
}

module.exports = {
  timeDeltaToString,
};
