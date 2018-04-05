# Warframe Worldstate Parser

[![Supported by Warframe Community Developers](https://warframestat.us/wfcd.png)](https://github.com/WFCD "Supported by Warframe Community Developers")

### Parse the Warframe worldstate into useable javascript objects.


[![GitHub issues](https://img.shields.io/github/issues/wfcd/warframe-worldstate-parser.svg)](https://github.com/wfcd/warframe-worldstate-parser/issues)
[![GitHub forks](https://img.shields.io/github/forks/wfcd/warframe-worldstate-parser.svg)](https://github.com/wfcd/warframe-worldstate-parser/network)
[![GitHub stars](https://img.shields.io/github/stars/wfcd/warframe-worldstate-parser.svg)](https://github.com/wfcd/warframe-worldstate-parser/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/wfcd/warframe-worldstate-parser/master/LICENSE)
[![Stories in Ready](https://badge.waffle.io/wfcd/warframe-worldstate-parser.png?label=ready&title=Ready)](http://waffle.io/wfcd/warframe-worldstate-parser)
[![Crowdin](https://d322cqt584bo4o.cloudfront.net/genesis-parser/localized.svg)](https://crowdin.com/project/genesis-parser)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f873ee96e28b4568828c297bebe053b4)](https://www.codacy.com/app/aliasfalse/warframe-worldstate-parser?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=WFCD/warframe-worldstate-parser&amp;utm_campaign=Badge_Grade)
[![Contact me on Discord](https://img.shields.io/badge/discord-Tobiah%238452-7289DA.svg)](https://discord.gg/warframe "Contact me on Discord: Tobiah#8452")

[![NPM](https://nodei.co/npm/warframe-worldstate-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/warframe-worldstate-parser/)

## Documentation
You can find the documentation [here](https://wfcd.github.io/warframe-worldstate-parser/)

## Example usage

```javascript
const WorldState = require('warframe-worldstate-parser');

const ws = new WorldState(json-data);

console.log(ws.alerts[0].toString());
```

## Live version
See the parser in action here: [PC](https://ws.warframestat.us/pc) [PS4](https://ws.warframestat.us/ps4) [XB1](https://ws.warframestat.us/xb1)


## NPM
