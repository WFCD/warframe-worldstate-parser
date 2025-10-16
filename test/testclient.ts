import WorldState from '../dist/main.js';
import fetch from '../dist/lib/supporting/FetchProxy.js';

try {
  const semlar = await fetch('https://10o.io/arbitrations.json').then((res) => res.json());
  const ws = (await fetch('https://api.warframe.com/cdn/worldState.php', { contentType: 'text/html' }).then((res) => res.text()));

  const parsed = await WorldState.build(ws, { locale: 'en', kuvaData: semlar });
  console.log(parsed.fissures.toString());
  process.exit(0);
} catch (e) {
  console.error(`it errored: ${JSON.stringify(e)}`);
  process.exit(1);
}
