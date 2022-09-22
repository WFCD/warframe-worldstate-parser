'use strict';

const data = require('warframe-worldstate-data');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

function splitResourceName(str) {
  return str
    .split(/([A-Z]?[^A-Z]*)/g)
    .filter((item) => item)
    .join(' ');
}

const i18n = (locale = 'en') => data[locale] || data;

function faction(key, dataOverride) {
  if (key in i18n(dataOverride).factions) {
    return i18n(dataOverride).factions[key].value;
  }
  return key;
}

function node(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].value;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeMissionType(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].type;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeEnemy(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].enemy;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function languageString(key, dataOverride) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in i18n(dataOverride).languages) {
    return i18n(dataOverride).languages[lowerKey].value;
  }
  if (key in i18n(dataOverride).languages) {
    return i18n(dataOverride).languages[key].value;
  }
  if (key) {
    return toTitleCase(splitResourceName(String(key).split('/').slice(-1)[0]));
  }
  return key;
}

function languageDesc(key, dataOverride) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in i18n(dataOverride).languages) {
    return i18n(dataOverride).languages[lowerKey].desc;
  }
  if (key in i18n(dataOverride).languages) {
    return i18n(dataOverride).languages[key].desc;
  }
  if (key) {
    return `[PH] ${toTitleCase(splitResourceName(String(key).split('/').slice(-1)[0]))} Desc`;
  }
  return key;
}

function missionType(key, dataOverride) {
  if (key in i18n(dataOverride).missionTypes) {
    return i18n(dataOverride).missionTypes[key].value;
  }
  if (key) {
    return toTitleCase(key.replace(/^MT_/, ''));
  }
  return key;
}

function conclaveMode(key, dataOverride) {
  if (key in i18n(dataOverride).conclave.modes) {
    return i18n(dataOverride).conclave.modes[key].value;
  }
  return key;
}

function conclaveCategory(key, dataOverride) {
  if (key in i18n(dataOverride).conclave.categories) {
    return i18n(dataOverride).conclave.categories[key].value;
  }
  return key;
}

function fissureModifier(key, dataOverride) {
  if (key in i18n(dataOverride).fissureModifiers) {
    return i18n(dataOverride).fissureModifiers[key].value;
  }
  return key;
}

function fissureTier(key, dataOverride) {
  if (key in i18n(dataOverride).fissureModifiers) {
    return i18n(dataOverride).fissureModifiers[key].num;
  }
  return key;
}

function syndicate(key, dataOverride) {
  if (key in i18n(dataOverride).syndicates) {
    return i18n(dataOverride).syndicates[key].name;
  }
  return key;
}

function upgrade(key, dataOverride) {
  if (key in i18n(dataOverride).upgradeTypes) {
    return i18n(dataOverride).upgradeTypes[key].value;
  }
  return key;
}

function operation(key, dataOverride) {
  if (key in i18n(dataOverride).operationTypes) {
    return i18n(dataOverride).operationTypes[key].value;
  }
  return key;
}

function operationSymbol(key, dataOverride) {
  if (key in i18n(dataOverride).operationTypes) {
    return i18n(dataOverride).operationTypes[key].symbol;
  }
  return key;
}

function sortieBoss(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.bosses) {
    return i18n(dataOverride).sortie.bosses[key].name;
  }
  return key;
}

function sortieFaction(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.bosses) {
    return i18n(dataOverride).sortie.bosses[key].faction;
  }
  return key;
}

function sortieModifier(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.modifierTypes) {
    return i18n(dataOverride).sortie.modifierTypes[key];
  }
  return key;
}

function sortieModDesc(key, dataOverride) {
  if (i18n(dataOverride).sortie.modifierDescriptions && key in i18n(dataOverride).sortie.modifierDescriptions) {
    return i18n(dataOverride).sortie.modifierDescriptions[key];
  }
  return key;
}

function region(key, dataOverride) {
  if (key && i18n(dataOverride).persistentEnemy.regions[key]) {
    return i18n(dataOverride).persistentEnemy.regions[key];
  }
  return key;
}

function conclaveChallenge(key, dataOverride) {
  const splitKey = String(key).split('/').slice(-1)[0];

  if (
    i18n(dataOverride).conclave &&
    i18n(dataOverride).conclave.challenges &&
    i18n(dataOverride).conclave.challenges[splitKey]
  ) {
    return i18n(dataOverride).conclave.challenges[splitKey];
  }
  return {
    title: toTitleCase(splitResourceName(splitKey)),
    description: toTitleCase(splitResourceName(splitKey)),
    standing: 0,
  };
}

function steelPath(dataOverride) {
  return (i18n(dataOverride) || /* istanbul ignore next */ data).steelPath;
}

/**
 * An object containing functions to convert in-game names to their localizations
 * @typedef {Object.<function>} Translator
 * @property {function} faction          - Converts faction names
 * @property {function} node             - Converts star map node names
 * @property {function} nodeMissionType  - Returns the mission type of a given node
 * @property {function} nodeEnemy        - Returns the faction that controls a given node
 * @property {function} languageString   - Converts generic language strings
 * @property {function} languageDesc     - Converts generic language strings
 *                                          and retrieves the description
 * @property {function} missionType      - Converts mission types
 * @property {function} conclaveMode     - Converts conclave modes
 * @property {function} conclaveCategory - Converts conclave challenge categories
 * @property {function} fissureModifier  - Converts fissure mission modifiers
 * @property {function} syndicate        - Converts syndicate names
 * @property {function} upgrade          - Converts upgrade types
 * @property {function} operation        - Converts operation types
 * @property {function} sortieBoss       - Converts sortie boss names
 * @property {function} sortieModifier    - Converts sortie modifier types
 * @property {function} sortieModDesc    - Converts sortie modifier type descriptions
 * @property {function} region           - Converts persistent enemy region indicies
 * @property {function} conclaveChallenge - Convert conclave identifiers into standing data
 * @property {function} steelPath        -  Retrieve Steel Path rotation data for locale
 */
module.exports = {
  faction,
  node,
  nodeMissionType,
  nodeEnemy,
  languageString,
  languageDesc,
  missionType,
  conclaveMode,
  conclaveCategory,
  fissureModifier,
  fissureTier,
  syndicate,
  upgrade,
  operation,
  operationSymbol,
  sortieBoss,
  sortieModifier,
  sortieModDesc,
  sortieFaction,
  region,
  conclaveChallenge,
  steelPath,
};
