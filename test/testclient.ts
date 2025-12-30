import WorldState, { fetchProxy as fetch } from 'warframe-worldstate-parser';

try {
  const semlar = await fetch('https://10o.io/arbitrations.json').then((res) =>
    res.json()
  );
  const ws = await fetch('https://api.warframe.com/cdn/worldState.php', {
    contentType: 'text/html',
  }).then((res) => res.text());

  const parsed = await WorldState.build(ws, { locale: 'en', kuvaData: semlar });
  console.log(JSON.stringify(parsed.fissures, null, 2));
  process.exit(0);
} catch (e) {
  console.error(`it errored: ${JSON.stringify(e)}`);
  process.exit(1);
}
