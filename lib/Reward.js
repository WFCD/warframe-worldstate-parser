'use strict';

// Resource names
const resources = [
  'Neural Sensors',
  'Orokin Cell',
  'Neurodes',
  'Alloy Plate',
  'Circuits',
  'Control Module',
  'Ferrite',
  'Gallium',
  'Morphics',
  'Nano Spores',
  'Oxium',
  'Rubedo',
  'Salvage',
  'Plastids',
  'Polymer Bundle',
  'Argon Crystal',
  'Cryotic',
  'Tellurium',
];

// Aura names
const auras = [
  'Brief Respite',
  'Corrosive Projection',
  'Dead Eye',
  'EMP Aura',
  'Empowered Blades',
  'Enemy Radar',
  'Energy Siphon',
  'Growing Power',
  'Infested Impedance',
  'Loot Detector',
  'Physique',
  'Pistol Amp',
  'Pistol Scavenger',
  'Rejuvenation',
  'Rifle Amp',
  'Rifle Scavenger',
  'Shield Disruption',
  'Shotgun Amp',
  'Shotgun Scavenger',
  'Sniper Scavenger',
  'Speed Holster',
  'Sprint Boost',
  'Stand United',
  'Steel Charge',
];

// Nightmare mod names
const nightmare = [
  'Accelerated Blast',
  'Animal Instinct',
  'Armored Agility',
  'Blaze',
  'Constitution',
  'Focus Energy',
  'Fortitude',
  'Hammer Shot',
  'Ice Storm',
  'Lethal Torrent',
  'Rending Strike',
  'Stunning Speed',
  'Wildfire',
  'Seeking Fury',
  'Shred',
  'Vigor',
];

/**
 * An object describing a type of reward, including name, description,
 * test function to verify type from a string, thumbnail url, and color
 * @typedef {Object} RewardType
 * @property {string} name          - Name of the reward type
 * @property {string} description   - Description of the reward type
 * @property {string} test          - Function for testing the return type against a string
 * @property {string} thumbnail     - Thumbnail url for this reward type
 * @property {string} color         - Summary color representing this reward type

 */

// Reward types
const rewardTypes = [
  {
    name: 'vauban',
    description: 'Vauban parts',
    test: s => /^vauban(?!.*helmet)/i.test(s),
    thumbnail: 'https://i.imgur.com/r5x0owi.png',
    color: 0x5C5A53,
  },
  {
    name: 'vandal',
    description: 'Vandal Weapon Parts',
    test: s => /vandal/i.test(s),
    thumbnail: 'https://i.imgur.com/kPQcg5B.png',
    color: 0x5C5A53,
  },
  {
    name: 'wraith',
    description: 'Wraith Weapon Parts',
    test: s => /wraith/i.test(s),
    thumbnail: 'https://i.imgur.com/B5sv3mQ.png',
    color: 0x5C5A53,
  },
  {
    name: 'skin',
    description: 'Weapon skins',
    test: s => /skin/i.test(s),
    thumbnail: 'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png',
    color: 0x4F4C33,
  },
  {
    name: 'helmet',
    description: 'Alternative helmets',
    test: s => /helmet/i.test(s),
    thumbnail: 'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png',
    color: 0x567677,
  },
  {
    name: 'nitain',
    description: 'Nitain extract',
    test: s => /nitain/i.test(s),
    thumbnail: 'https://i.imgur.com/3Db4PHh.png',
    color: 0xAEADA4,
  },
  {
    name: 'mutalist',
    description: 'Mutalist Alad V coordinates',
    test: s => /mutalist/i.test(s),
    thumbnail: 'https://i.imgur.com/96AWqr8.png',
    color: 0x26B37,
  },
  {
    name: 'weapon',
    description: 'Weapons',
    test: s => /dagger|sword|glaive/i.test(s),
    thumbnail: 'https://i.imgur.com/WRhGSMI.png',
    color: 0xA3A097,
  },
  {
    name: 'fieldron',
    description: 'Fieldron',
    test: s => /fieldron/i.test(s),
    thumbnail: 'https://i.imgur.com/qlrlfft.png',
    color: 0x4D5556,
  },
  {
    name: 'detonite',
    description: 'Detonite Injector',
    test: s => /detonite/i.test(s),
    thumbnail: 'https://i.imgur.com/rV6lN4W.png',
    color: 0x4D5556,
  },
  {
    name: 'mutagen',
    description: 'Mutagen Mass',
    test: s => /mutagen/i.test(s),
    thumbnail: 'https://i.imgur.com/vV7kzub.png',
    color: 0x4D5556,
  },
  {
    name: 'clantech',
    description: 'Clantech resources',
    test: s => /fieldron|detonite|mutagen/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/clantech_thmb.png',
    color: 0x4D5556,
  },
  {
    name: 'aura',
    description: 'Auras',
    test: s => auras.includes(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png',
    color: 0xC8F8FF,
  },
  {
    name: 'neuralSensors',
    description: 'Neural Sensors',
    test: s => /neural/i.test(s),
    thumbnail: 'https://i.imgur.com/Gq6cz9p.png',
    color: 0xC8F8FF,
  },
  {
    name: 'orokinCell',
    description: 'Orokin Cell',
    test: s => /orokin\scell/i.test(s),
    thumbnail: 'https://i.imgur.com/tEQdoDE.png',
    color: 0xC8F8FF,
  },
  {
    name: 'alloyPlate',
    description: 'Alloy Plate',
    test: s => /alloy\splate/i.test(s),
    thumbnail: 'https://i.imgur.com/E8K3fOI.png',
    color: 0xC8F8FF,
  },
  {
    name: 'circuits',
    description: 'Circuits',
    test: s => /circuits/i.test(s),
    thumbnail: 'https://i.imgur.com/OxJvWIx.png',
    color: 0xC8F8FF,
  },
  {
    name: 'controlModule',
    description: 'Control Module',
    test: s => /control\smodule/i.test(s),
    thumbnail: 'https://i.imgur.com/F1UUub1.png',
    color: 0xC8F8FF,
  },
  {
    name: 'ferrite',
    description: 'Ferrite',
    test: s => /ferrite/i.test(s),
    thumbnail: 'https://i.imgur.com/h93eVLr.png',
    color: 0xC8F8FF,
  },
  {
    name: 'gallium',
    description: 'Gallium',
    test: s => /gallium/i.test(s),
    thumbnail: 'https://i.imgur.com/pvpc73S.png',
    color: 0xA1ADBA,
  },
  {
    name: 'morphics',
    description: 'Morphics',
    test: s => /morphics/i.test(s),
    thumbnail: 'https://i.imgur.com/SF3XWd6.png',
    color: 0xC8F8FF,
  },
  {
    name: 'nanoSpores',
    description: 'Nano Spores',
    test: s => /nano\sspores/i.test(s),
    thumbnail: 'https://i.imgur.com/bb71Cy7.png',
    color: 0x533F36,
  },
  {
    name: 'oxium',
    description: 'Oxium',
    test: s => /oxium/i.test(s),
    thumbnail: 'https://i.imgur.com/hY8NCjk.png',
    color: 0x92713B,
  },
  {
    name: 'rubedo',
    description: 'Rubedo',
    test: s => /rubedo/i.test(s),
    thumbnail: 'https://i.imgur.com/gSO9ILf.png',
    color: 0xCE3E36,
  },
  {
    name: 'salvage',
    description: 'Salvage',
    test: s => /salvage/i.test(s),
    thumbnail: 'https://i.imgur.com/3L7xLYg.png',
    color: 0x8B8E8D,
  },
  {
    name: 'plastids',
    description: 'Plastids',
    test: s => /plastids/i.test(s),
    thumbnail: 'https://i.imgur.com/5yVfTEF.png',
    color: 0xCEAE88,
  },
  {
    name: 'polymerBundle',
    description: 'Polymer Bundle',
    test: s => /polymer\sbundle/i.test(s),
    thumbnail: 'https://i.imgur.com/pg8asnC.png',
    color: 0x6B4DA4,
  },
  {
    name: 'argonCrystal',
    description: 'Argon Crystal',
    test: s => /argon\scrystal/i.test(s),
    thumbnail: 'https://i.imgur.com/DdJJYSB.png',
    color: 0xC8F8FF,
  },
  {
    name: 'cryotic',
    description: 'Cryotic',
    test: s => /cryotic/i.test(s),
    thumbnail: 'https://i.imgur.com/yqPgj21.png',
    color: 0x78A2B3,
  },
  {
    name: 'tellurium',
    description: 'Tellurium',
    test: s => /tellurium/i.test(s),
    thumbnail: 'https://i.imgur.com/ocjnGU8.png',
    color: 0xE72E18,
  },
  {
    name: 'resource',
    description: 'Resources',
    test: s => resources.includes(s),
    thumbnail: 'https://i.imgur.com/Bq5TEPo.png',
    color: 0xFFEE9C,
  },
  {
    name: 'nightmare',
    description: 'Nightmare mods',
    test: s => nightmare.includes(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/nightmare_thumb.png',
    color: 0xB22E2C,
  },
  {
    name: 'endo',
    description: 'Endo',
    test: s => /\d+\sendo/i.test(s),
    thumbnail: 'https://i.imgur.com/mS8oSwx.png',
    color: 0xC2A24C,
  },
  {
    name: 'reactor',
    description: 'Orokin Reactors',
    test: s => /reactor/i.test(s),
    thumbnail: 'https://i.imgur.com/6Hm1BEq.png',
    color: 0xD7C37D,
  },
  {
    name: 'catalyst',
    description: 'Orokin Catalyst',
    test: s => /catalyst/i.test(s),
    thumbnail: 'https://i.imgur.com/C4X9NWm.png',
    color: 0x689ADD,
  },
  {
    name: 'potato',
    description: 'Orokin Catalysts/Reactors',
    test: s => /catalyst|reactor/i.test(s),
    thumbnail: 'https://i.imgur.com/6Hm1BEq.png',
    color: 0x689ADD,
  },
  {
    name: 'forma',
    description: 'Forma',
    test: s => /forma/i.test(s),
    thumbnail: 'https://i.imgur.com/2b0FT3D.png',
    color: 0xB19547,
  },
  {
    name: 'exilus',
    description: 'Exilus',
    test: s => /exilus/i.test(s),
    thumbnail: 'https://i.imgur.com/eQNeNpY.png',
    color: 0x88332D,
  },
  {
    name: 'synthula',
    description: 'Synthula',
    test: s => /synthula/i.test(s),
    thumbnail: 'https://i.imgur.com/X0Lvfc9.png',
    color: 0x9FA19F,
  },
  {
    name: 'kavatGene',
    description: 'Kavat Genetic Code',
    test: s => /Kavat Ge/i.test(s),
    thumbnail: 'https://i.imgur.com/ijVUmQV.png',
    color: 0x76A8AD,
  },
  {
    name: 'kubrowEgg',
    description: 'Kubrow Egg',
    test: s => /kubrow\segg/i.test(s),
    thumbnail: 'https://i.imgur.com/Vv3LXnz.png',
    color: 0xA5937F,
  },
  {
    name: 'traces',
    description: 'Void Traces',
    test: s => /trace/i.test(s),
    thumbnail: 'https://i.imgur.com/vvZGMPv.png',
    color: 0x69A4DD,
  },
  {
    name: 'riven',
    description: 'Riven Mod',
    test: s => /riven/i.test(s),
    thumbnail: 'https://i.imgur.com/LoficZr.png',
    color: 0xA183BD,
  },
  // Catch-all
  {
    name: 'other',
    description: 'Other',
    test: () => true,
    thumbnail: '',
    color: 0x4F545C,
  },
];

/**
 * Returns the type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<Object>}  [types] The possible types
 * @returns {string}          The type name
 */
function getItemType(item, types = rewardTypes) {
  return types.find(t => t.test(item)).name;
}

/**
 * Returns the full type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<Object>}  [types] The possible types
 * @returns {RewardType}      The type
 */
function getItemTypeFull(item, types = rewardTypes) {
  return types.find(t => t.test(item));
}

/**
 * Represents a mission reward
 */
class Reward {
  /**
   * @param   {Object} data                 The mission data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   */
  constructor(data, { translator }) {
    /**
     * The items being rewarded
     * @type {Array.<string>}
     */
    this.items = data.items ? data.items.map(i => translator.languageString(i)) : [];

    /**
     * The counted items being rewarded
     * @type {Array.<Object>}
     */
    this.countedItems = data.countedItems ? data.countedItems.map(i => ({
      count: i.ItemCount,
      type: translator.languageString(i.ItemType),
    })) : [];

    /**
     * The credits being rewarded
     * @type {number}
     */
    this.credits = data.credits || 0;

    this.asString = this.toString();

    this.itemString = this.items.concat(
      this.countedItems.map(i => `${i.count > 1 ? i.count : ''} ${i.type}`.trim())).join(' + ');

    this.thumbnail = this.getTypesFull()[0] ? this.getTypesFull()[0].thumbnail : 'http://i.imgur.com/KQ7f9l7.png';

    this.color = this.getTypesFull()[0] ? this.getTypesFull()[0].color : 0xF1C40F;
  }

  /**
   * The types of all items that are being rewarded
   * @returns {Array.<string>}
   */
  getTypes() {
    return this.items.concat(this.countedItems.map(i => i.type)).map(t => getItemType(t));
  }

  /**
   * The types of all the items that are being rewarded
   * @returns {Array.<RewardType>}
   */
  getTypesFull() {
    return this.items.concat(this.countedItems.map(i => i.type)).map(t => getItemTypeFull(t));
  }

  /**
   * The reward's string representation
   * @returns {string}
   */
  toString() {
    const tokens = this.items.concat(
      this.countedItems.map(i => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }
}

module.exports = Reward;
