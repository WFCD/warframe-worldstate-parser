function parseDate() {
  return new Date();
}

function timeDeltaToString() {
  return 'timeDelta';
}

/* eslint no-use-before-define: "off" */
/* eslint no-func-assign: "off" */
// Disabled so we can manipulate the time string during tests.
function setFromNowNeg() {
  fromNow = () => -1;
}

function setFromNowPos() {
  fromNow = () => 1;
}

function fromNow(d) { return d.getTime() - Date.now(); }

function toNow() { return 35235; }

export default {
  fromNow, toNow, parseDate, timeDeltaToString, setFromNowPos, setFromNowNeg,
};
export {
  fromNow,
  toNow,
  parseDate,
  timeDeltaToString,
  setFromNowNeg,
  setFromNowPos,
};
