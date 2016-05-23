# Warframe Worldstate Parser
## Parse the Warframe worldstate into useable javascript objects.

Currently available

Worldstate object | Module File | Accessor | Description
--- | --- | --- | ---
`PVPChallengeInstances` | `conclave.js` | `.getConclaveAll` | Get all Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveDailies` | Get daily Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveWeeklies` | Get weekly Conclave Challenges
`PVPChallengeInstances` | `conclave.js` | `.getConclaveAllString` | Get all Conclave Challenges in a string
`PVPChallengeInstances` | `conclave.js` | `.getConclaveDailiesString` | Get daily Conclave Challenges in a string
`PVPChallengeInstances` | `conclave.js` | `.getConclaveWeekliesString` | Get weekly Conclave Challenges in a string
`Goals` | `events.js` | `.getEvents` | Get event data for active events
`Goals` | `events.js` | `.getEvents` | Get event data for active events in a string
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
`Invasion` | `invasion.js` | `.getInvasions` | Get all current Invasions
`Invasion` | `invasion.js` | `.getInvasionsString` | Get all current Invasions as a string
`Alerts` | `alert.js` | `.getAlerts` | Get all alerts
`Alerts` | `alert.js` | `.getAlertsAsString` | Get all alerts as a string
`VoidTrader` | `baro.js` | `.getVoidTrader` | Get The void trader information
`VoidTrader` | `baro.js` | `.getVoidTraderString` | Get The void trader information as a string
`DailyDeals` | `deal.js` | `.getDeals` | Get current Darvo Daily Deal
`DailyDeals` | `deal.js` | `.getDealsAsString` | Get current Darvo Daily Deal as a string
`BadlandNodes` | `badlands.js` | `.getDarkSectors` | Get Darksectors object
`BadlandNodes` | `badlands.js` | `.getDarkSectorsString` | Get a string representation of the Darksectors
`GlobalUpgrades` | `globalModifiers.js` | `.getGlobalModifers` | Get global modifiers objects
`GlobalUpgrades` | `globalModifiers.js` | `.getGlobalModifersString` | Get global modifiers objects as a string

## Environment variables

Variable | example | default
--- | --- | ---
`WORLDSTATE_CACHE_LENGTH` | `600000` | `30000`

## Installation
`npm install --save warframe-worldstate-parser`

## Note
Because of the volatile, ever-changing nature of warframe, it would be best to install from the github branch instead of from npm, while using npm for management, still, because there will always be more strings to add to the languages file.