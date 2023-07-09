'use strict';

const fetch = require('node-fetch');
const Worldstate = require('../main');

/* eslint-disable no-console */

fetch('https://10o.io/arbitrations.json')
  .then((res) => res.json())
  .then(async (semlar) => ({
    semlar,
    ws: await fetch('https://content.warframe.com/dynamic/worldState.php').then((res) => res.text()),
  }))
  .then(({ semlar, ws }) => {
    const parsed = new Worldstate(ws, { kuvaData: semlar });
    console.log(parsed.duviriCycle.toString());
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
