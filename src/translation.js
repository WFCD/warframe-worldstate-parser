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
  }
  return key.split('/').slice(-1)[0];
}

function languageString(key) {
  const lowerKey = String(key).toLowerCase();
  if (lowerKey in data.languages) {
    return data.languages[lowerKey].value;
  }
  return toTitleCase(lowerKey.split('/').slice(-1)[0]);
}

function missionType(key) {
  if (key in data.missionTypes) {
    return data.missionTypes[key].value;
  }
  return key;
}

module.exports = {
  faction,
  node,
  languageString,
  missionType,
};
