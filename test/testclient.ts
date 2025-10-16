import WorldState from '../dist/main.js';

const run = async () => {
  try {
    const semlar = await fetch('https://10o.io/arbitrations.json').then((res) => res.json());
    const ws = await fetch('https://api.warframe.com/cdn/worldState.php').then((res) => res.text());

    const parsed = await WorldState.build(ws, { locale: 'en', kuvaData: semlar });
    console.log(parsed.duviriCycle.toString());
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
