import data from 'warframe-worldstate-data';

/**
 * Rough Titlecase!
 * @param {string} str string to be titlecased
 * @returns {string} titlecased string
 */
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * Utility function to split the resource name and return somewhat human-readable string
 * @param {string} str localization resource key
 * @returns {string} human-readable string
 */
export function splitResourceName(str) {
  return str
    .split(/([A-Z]?[^A-Z]*)/g)
    .filter(Boolean)
    .join(' ');
}

const i18n = (locale = 'en') => data[locale] || data;

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} faction name
 */
export function faction(key, dataOverride) {
  if (key in i18n(dataOverride).factions) {
    return i18n(dataOverride).factions[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} node name
 */
export function node(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].value;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} mission type of the node
 */
export function nodeMissionType(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].type;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} faction that controls the node
 */
export function nodeEnemy(key, dataOverride) {
  if (key in i18n(dataOverride).solNodes) {
    return i18n(dataOverride).solNodes[key].enemy;
  }
  if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} localization for language string
 */
export function languageString(key, dataOverride) {
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

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} localization for language description
 */
export function languageDesc(key, dataOverride) {
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

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} translation for mission type
 */
export function missionType(key, dataOverride) {
  if (key in i18n(dataOverride).missionTypes) {
    return i18n(dataOverride).missionTypes[key].value;
  }
  if (key) {
    return toTitleCase(key.replace(/^MT_/, ''));
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} conclave mode
 */
export function conclaveMode(key, dataOverride) {
  if (key in i18n(dataOverride).conclave.modes) {
    return i18n(dataOverride).conclave.modes[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} conclave category
 */
export function conclaveCategory(key, dataOverride) {
  if (key in i18n(dataOverride).conclave.categories) {
    return i18n(dataOverride).conclave.categories[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} fissure modifier data
 */
export function fissureModifier(key, dataOverride) {
  if (key in i18n(dataOverride).fissureModifiers) {
    return i18n(dataOverride).fissureModifiers[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {number | string} fissure tier
 */
export function fissureTier(key, dataOverride) {
  if (key in i18n(dataOverride).fissureModifiers) {
    return i18n(dataOverride).fissureModifiers[key].num;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} syndicate name
 */
export function syndicate(key, dataOverride) {
  if (key in i18n(dataOverride).syndicates) {
    return i18n(dataOverride).syndicates[key].name;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} upgrade type
 */
export function upgrade(key, dataOverride) {
  if (key in i18n(dataOverride).upgradeTypes) {
    return i18n(dataOverride).upgradeTypes[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} mathematical operation value
 */
export function operation(key, dataOverride) {
  if (key in i18n(dataOverride).operationTypes) {
    return i18n(dataOverride).operationTypes[key].value;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} symbol of mathematical operation
 */
export function operationSymbol(key, dataOverride) {
  if (key in i18n(dataOverride).operationTypes) {
    return i18n(dataOverride).operationTypes[key].symbol;
  }
  return key;
}

/**
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} sortie boss name
 */
export function sortieBoss(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.bosses) {
    return i18n(dataOverride).sortie.bosses[key].name;
  }
  return key;
}

/**
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} faction for a sortie based on the boss
 */
export function sortieFaction(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.bosses) {
    return i18n(dataOverride).sortie.bosses[key].faction;
  }
  return key;
}

/**
 *
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} sortie modifier data
 */
export function sortieModifier(key, dataOverride) {
  if (key in i18n(dataOverride).sortie.modifierTypes) {
    return i18n(dataOverride).sortie.modifierTypes[key];
  }
  return key;
}

/**
 * @param {string} key - The data key
 * @param {string} dataOverride locale for use with translation
 * @returns {string} sortie modifier description
 */
export function sortieModDesc(key, dataOverride) {
  if (i18n(dataOverride).sortie.modifierDescriptions && key in i18n(dataOverride).sortie.modifierDescriptions) {
    return i18n(dataOverride).sortie.modifierDescriptions[key];
  }
  return key;
}

/**
 * Retrieve the localized region for a given key
 * @param {string} key - The region key
 * @param {string} dataOverride - The locale to use for translations
 * @returns {string} localized region name
 */
export function region(key, dataOverride) {
  if (key && i18n(dataOverride).persistentEnemy.regions[key]) {
    return i18n(dataOverride).persistentEnemy.regions[key];
  }
  return key;
}

/**
 * Retrieve conclave challenge name for the given key and locale
 * @param {string} key key to retrieve
 * @param {string} dataOverride locale key override
 * @returns {string} - The conclave challenge name for the given key
 */
export function conclaveChallenge(key, dataOverride) {
  const splitKey = String(key).split('/').slice(-1)[0];

  if (i18n(dataOverride).conclave?.challenges?.[splitKey]) {
    return i18n(dataOverride).conclave.challenges[splitKey];
  }
  return {
    title: toTitleCase(splitResourceName(splitKey)),
    description: toTitleCase(splitResourceName(splitKey)),
    standing: 0,
  };
}

/**
 * Get the steel path data for given key
 * @param {string} dataOverride - The locale to use for translations
 * @returns {string} - The steel path data for the given key
 */
export function steelPath(dataOverride) {
  return (i18n(dataOverride) || /* istanbul ignore next */ data).steelPath;
}

/**
 * An object containing functions to convert in-game names to their localizations
 * @typedef {Record<string, Function>} Translator
 * @property {Function} faction          - Converts faction names
 * @property {Function} node             - Converts star map node names
 * @property {Function} nodeMissionType  - Returns the mission type of given node
 * @property {Function} nodeEnemy        - Returns the faction that controls a given node
 * @property {Function} languageString   - Converts generic language strings
 * @property {Function} languageDesc     - Converts generic language strings
 *                                          and retrieves the description
 * @property {Function} missionType      - Converts mission types
 * @property {Function} conclaveMode     - Converts conclave modes
 * @property {Function} conclaveCategory - Converts conclave challenge categories
 * @property {Function} fissureModifier  - Converts fissure mission modifiers
 * @property {Function} syndicate        - Converts syndicate names
 * @property {Function} upgrade          - Converts upgrade types
 * @property {Function} operation        - Converts operation types
 * @property {Function} sortieBoss       - Converts sortie boss names
 * @property {Function} sortieModifier    - Converts sortie modifier types
 * @property {Function} sortieModDesc    - Converts sortie modifier type descriptions
 * @property {Function} region           - Converts persistent enemy region indicies
 * @property {Function} conclaveChallenge - Convert conclave identifiers into standing data
 * @property {Function} steelPath        -  Retrieve Steel Path rotation data for locale
 * @property {Function} toTitleCase      - Format provided string as titlecase
 */
export default {
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
  toTitleCase,
};
