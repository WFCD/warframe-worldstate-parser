# Warframe Worldstate Parser
### Parse the Warframe worldstate into useable javascript objects.

[![Stories in Ready](https://badge.waffle.io/aliasfalse/warframe-worldstate-parser.png?label=ready&title=Ready)](http://waffle.io/aliasfalse/warframe-worldstate-parser) 

[![GitHub issues](https://img.shields.io/github/issues/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/issues)  
[![GitHub forks](https://img.shields.io/github/forks/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/network) 
[![GitHub stars](https://img.shields.io/github/stars/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/aliasfalse/warframe-worldstate-parser/master/LICENSE) 

[![NPM](https://nodei.co/npm/warframe-worldstate-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/warframe-worldstate-parser/)

[![Contact me on Discord](https://img.shields.io/badge/discord-Tobiah%238452-7289DA.svg)](https://discord.gg/bZgq6Pt "Contact me on Discord: Tobiah#8452")


## Installation
`npm install --save warframe-worldstate-parser`

## Documentation
You can find the documentation [here](https://aliasfalse.github.io/warframe-worldstate-parser/)

## Example usage

```javascript
const WorldState = require('warframe-worldstate-parser');

const ws = new WorldState(json-data);

console.log(ws.alerts[0].toString());
```
