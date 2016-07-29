# Warframe Worldstate Parser
### Parse the Warframe worldstate into useable javascript objects.

[![Stories in Ready](https://badge.waffle.io/aliasfalse/warframe-worldstate-parser.png?label=ready&title=Ready)](http://waffle.io/aliasfalse/warframe-worldstate-parser) 

[![GitHub issues](https://img.shields.io/github/issues/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/issues)  
[![GitHub forks](https://img.shields.io/github/forks/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/network) 
[![GitHub stars](https://img.shields.io/github/stars/aliasfalse/warframe-worldstate-parser.svg)](https://github.com/aliasfalse/warframe-worldstate-parser/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/aliasfalse/warframe-worldstate-parser/master/LICENSE) 

[![NPM](https://nodei.co/npm/warframe-worldstate-parser.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/warframe-worldstate-parser/)

## Currently available

Worldstate object | Module File | Accessor | Description
--- | --- | --- | ---
`PVPChallengeInstances` | `conclave.js` | `.getConclaveAll` | Get all Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveDailies` | Get daily Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveWeeklies` | Get weekly Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveAllString` | Get all Conclave Challenges in a string
`PVPChallengeInstances` | `conclave.js` | `.getConclaveDailiesString` | Get daily Conclave Challenges in a string
`PVPChallengeInstances` | `conclave.js` | `.getConclaveWeekliesString` | Get weekly Conclave Challenges in a string
`Goals` | `events.js` | `.getEvents` | Get event data for active events
`Goals` | `events.js` | `.getEventsString` | Get event data for active events in a string
`PersistentEnemies` | `persistentEnemy.js` | `.getAllPersistentEnemies` | Get all present persistent enemy data
`PersistentEnemies` | `persistentEnemy.js` | `.getHiddenPersistentEnemies` | Get hidden present persistent enemy data
`PersistentEnemies` | `persistentEnemy.js` | `.getDiscoveredPersistentEnemies` | Get discovered present persistent enemy data
`Sorties` | `sortie.js` | `.getSortieString` | Get current sortie data  in a string
`PersistentEnemies` | `persistentEnemy.js` | `.getAllPersistentEnemiesString` | Get all present persistent enemy data in a string
`PersistentEnemies` | `persistentEnemy.js` | `.getHiddenPersistentEnemiesString` | Get hidden present persistent enemy data in a string
`PersistentEnemies` | `persistentEnemy.js` | `.getDiscoveredPersistentEnemiesString` | Get discovered present persistent enemy data in a string
`Sorties` | `sortie.js` | `.getSortie` | Get current sortie data
`Events` | `news.js` | `.getPrimeAccess` | Get current prime access news items
`Events` | `news.js` | `.getUpdates` | Get current updates news items
`Events` | `news.js` | `.getNews` | Get all current news items
`Events` | `news.js` | `.getPrimeAccessString` | Get current prime access news items
`Events` | `news.js` | `.getUpdatesString` | Get current updates news items
`Events` | `news.js` | `.getNewsString` | Get all current news items
`Invasion` | `invasion.js` | `.getInvasions` | Get all current Invasions (incomplete)
`Invasion` | `invasion.js` | `.getInvasionsString` | Get all current Invasions as a string (incomplete)
`Alerts` | `alert.js` | `.getAlerts` | Get all alerts (incomplete)
`Alerts` | `alert.js` | `.getAlertsString` | Get all alerts as a string (incomplete)
`VoidTrader` | `baro.js` | `.getVoidTrader` | Get The void trader information (incomplete)
`VoidTrader` | `baro.js` | `.getVoidTraderString` | Get The void trader information as a string (incomplete)
`DailyDeals` | `deal.js` | `.getDeals` | Get current Darvo Daily Deal (incomplete)
`DailyDeals` | `deal.js` | `.getDealsAsString` | Get current Darvo Daily Deal as a string (incomplete)
`BadlandNodes` | `badlands.js` | `.getDarkSectors` | Get Darksectors object (incomplete)
`BadlandNodes` | `badlands.js` | `.getDarkSectorsString` | Get a string representation of the Darksectors (incomplete)
`GlobalUpgrades` | `globalModifiers.js` | `.getGlobalModifers` | Get global modifiers objects
`GlobalUpgrades` | `globalModifiers.js` | `.getGlobalModifersString` | Get global modifiers objects as a string
`ActiveMissions` | `voidFissure.js` | `.getAll` | Get all currently active void fissure objects
`ActiveMissions` | `voidFissure.js` | `.getString` | Get a string of all currently active void fissure objects

## Environment variables

Variable | example | default
--- | --- | ---
`WORLDSTATE_CACHE_LENGTH` | `600000` | `30000`

## Installation
`npm install --save warframe-worldstate-parser`

## Usage

```javascript
var WorldState = require('warframe-worldstate-parser');
var worldStates = {
  PC : new Worldstate('PC'),
  PS4 : new Worldstate('PS4'),
  X1 : new Worldstate('X1'),
}
var primeAccess = null;
worldStates[platform].getPrimeAccessString(function(err, primeAccessObject) {
  if (err) {
    return console.err(err);
  }
  primeAccess = primeAccessObject;
});
```
## Note
Because of the volatile, ever-changing nature of warframe, it would be best to install from the github branch instead of from npm, while using npm for management, still, because there will always be more strings to add to the languages file.
