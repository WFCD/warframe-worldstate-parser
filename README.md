# Warframe Worldstate Parser


[![Supported by Warframe Community Developers](https://warframestat.us/wfcd.png)](https://github.com/WFCD "Supported by Warframe Community Developers")

### Parse the Warframe worldstate into useable javascript objects.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/wfcd/warframe-worldstate-parser/master/LICENSE)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/genesis-parser/localized.svg)](https://crowdin.com/project/genesis-parser)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f873ee96e28b4568828c297bebe053b4)](https://www.codacy.com/app/aliasfalse/warframe-worldstate-parser?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WFCD/warframe-worldstate-parser&amp;utm_campaign=Badge_Grade)
[![Contact me on Discord](https://img.shields.io/badge/discord-Tobiah%230001-7289DA.svg)](https://discord.gg/jGZxH9f "Contact me on Discord: Tobiah#0001")

## Documentation
You can find the documentation [here](https://wfcd.github.io/warframe-worldstate-parser/)

## Example usage

```javascript
const worldstateData = await (require('request-promise'))('http://content.warframe.com/dynamic/worldState.php');

const WorldState = require('warframe-worldstate-parser');

const ws = new WorldState(worldstateData);

console.log(ws.alerts[0].toString());
```

## Live version
See the parser in action here:

[![PC API](https://img.shields.io/badge/API-PC-red.svg)](https://api.warframestat.us/pc)
[![PS4 API](https://img.shields.io/badge/API-PS4-blue.svg)](https://api.warframestat.us/ps4)
[![XB1 API](https://img.shields.io/badge/API-XB1-brightgreen.svg)](https://api.warframestat.us/xb1)
[![Switch API](https://img.shields.io/badge/API-Switch-orange.svg)](https://api.warframestat.us/swi)
