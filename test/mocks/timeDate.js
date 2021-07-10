'use strict';

module.exports = {
  parseDate: () => new Date(),
  timeDeltaToString: () => 'timeDelta',
  fromNow: (d) => d.getTime() - Date.now(),
  toNow: () => 35235,
};
