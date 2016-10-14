'use strict';

const data = require('warframe-worldstate-data');

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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
  } else if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeMissionType(key) {
  if (key in data.solNodes) {
    return data.solNodes[key].type;
  } else if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function nodeEnemy(key) {
  if (key in data.solNodes) {
    return data.solNodes[key].enemy;
  } else if (key) {
    return key.split('/').slice(-1)[0];
  }
  return key;
}

function languageString(key) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in data.languages) {
    return data.languages[lowerKey].value;
  } else if (key) {
    return toTitleCase(lowerKey.split('/').slice(-1)[0]);
  }
  return key;
}

function missionType(key) {
  if (key in data.missionTypes) {
    return data.missionTypes[key].value;
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

function syndicate(key) {
  if (key in data.syndicates) {
    return data.syndicates[key].name;
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
  syndicate,
};
