import fetch from 'node-fetch';
import WorldState from '../lib/WorldState.js';

/* eslint-disable no-console */

fetch('https://10o.io/arbitrations.json')
  .then((res) => res.json())
  .then(async (semlar) => ({
    semlar,
    ws: await fetch('https://content.warframe.com/dynamic/worldState.php').then((res) => res.text()),
  }))
  .then(({ semlar, ws }) => {
    const parsed = new WorldState(ws, { kuvaData: semlar });
    console.log(parsed.arbitration);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
