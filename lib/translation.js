'use strict';

/**
 * An object containing functions to convert in-game names to their localizations
 * @typedef {Object.<function>} Translator
 * @property {function} faction          - Converts faction names
 * @property {function} node             - Converts star map node names
 * @property {function} nodeMissionType  - Returns the mission type of a given node
 * @property {function} nodeEnemy        - Returns the faction that controls a given node
 * @property {function} languageString   - Converts generic language strings
 * @property {function} missionType      - Converts mission types
 * @property {function} conclaveMode     - Converts conclave modes
 * @property {function} conclaveCategory - Converts conclave challenge categories
 * @property {function} fissureModifier  - Converts fissure mission modifiers
 * @property {function} syndicate        - Converts syndicate names
 * @property {function} upgrade          - Converts upgrade types
 * @property {function} operation        - Converts operation types
 * @property {function} sortieBoss       - Converts sortie boss names
 * @property {function} sortieModifer    - Converts sortie modifier types
 * @property {function} sortieModDesc    - Converts sortie modifier type descriptions
 * @property {function} region           - Converts persistent enemy region indicies
 */

const data = require('warframe-worldstate-data');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function splitResourceName(str) {
  return str.split(/([A-Z]?[^A-Z]*)/g).filter(item => item).join(' ');
}

function faction(key) {
  if (key in data.factions) {
    return data.factions[key].value;
  }
  return key;
}

function node(key) {
  if (key in data.solNodes) {
    return data.solNodes[key].value;
  } if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeMissionType(key) {
  if (key in data.solNodes) {
    return data.solNodes[key].type;
  } if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeEnemy(key) {
  if (key in data.solNodes) {
    return data.solNodes[key].enemy;
  } if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function languageString(key) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in data.languages) {
    return toTitleCase(data.languages[lowerKey].value);
  } if (key) {
    return splitResourceName(String(key).split('/').slice(-1)[0]);
  }
  return key;
}

function missionType(key) {
  if (key in data.missionTypes) {
    return data.missionTypes[key].value;
  } if (key) {
    return toTitleCase(key.replace(/^MT_/, ''));
  }
  return key;
}

function conclaveMode(key) {
  if (key in data.conclave.modes) {
    return data.conclave.modes[key].value;
  }
  return key;
}

function conclaveCategory(key) {
  if (key in data.conclave.categories) {
    return data.conclave.categories[key].value;
  }
  return key;
}

function fissureModifier(key) {
  if (key in data.fissureModifiers) {
    return data.fissureModifiers[key].value;
  }
  return key;
}

function fissureTier(key) {
  if (key in data.fissureModifiers) {
    return data.fissureModifiers[key].num;
  }
  return key;
}

function syndicate(key) {
  if (key in data.syndicates) {
    return data.syndicates[key].name;
  }
  return key;
}

function upgrade(key) {
  if (key in data.upgradeTypes) {
    return data.upgradeTypes[key].value;
  }
  return key;
}

function operation(key) {
  if (key in data.operationTypes) {
    return data.operationTypes[key].value;
  }
  return key;
}

function sortieBoss(key) {
  if (key in data.sortie.bosses) {
    return data.sortie.bosses[key].name;
  }
  return key;
}

function sortieFaction(key) {
  if (key in data.sortie.bosses) {
    return data.sortie.bosses[key].faction;
  }
  return key;
}

function sortieModifier(key) {
  if (key in data.sortie.modifierTypes) {
    return data.sortie.modifierTypes[key];
  }
  return key;
}

function sortieModDesc(key) {
  if (data.sortie.modifierDescriptions && key in data.sortie.modifierDescriptions) {
    return data.sortie.modifierDescriptions[key];
  }
  return key;
}

function region(key) {
  if (key && data.persistentEnemy[key]) {
    return data.persistentEnemy[key];
  }
  return key;
}

module.exports = {
  faction,
  node,
  nodeMissionType,
  nodeEnemy,
  languageString,
  missionType,
  conclaveMode,
  conclaveCategory,
  fissureModifier,
  fissureTier,
  syndicate,
  upgrade,
  operation,
  sortieBoss,
  sortieModifier,
  sortieModDesc,
  sortieFaction,
  region,
};
