import WorldState from '../lib/WorldState';

/* eslint-disable no-console */

try {
  const semlar = await fetch('https://10o.io/arbitrations.json').then((res) => res.json());
  const ws = await fetch('https://content.warframe.com/dynamic/worldState.php').then((res) => res.text());

  const parsed = await WorldState(ws, { locale: 'en', kuvaData: semlar });
  console.log(parsed.duviriCycle.toString());
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}
