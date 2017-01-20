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
  'Oxium',
  'Tellurium',
];

// Aura names
const auras = [
  'Corrosive Projection',
  'Dead Eye',
  'EMP Aura',
  'Enemy Radar',
  'Energy Siphon',
  'Infested Impedance',
  'Loot Detector',
  'Physique',
  'Pistol Scavenger',
  'Rejuvenation',
  'Rifle Amp',
  'Rifle Scavenger',
  'Shield Disruption',
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
    test: s => /^vauban/i.test(s),
    thumbnail: 'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/vauban_thumb.png',
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
    thumbnail: 'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/nitain_thumb.png',
    color: 0xAEADA4,
  },
  {
    name: 'mutalistCoordinate',
    description: 'Mutalist Alad V coordinates',
    test: s => /mutalist/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/mutalist_thumb.png',
    color: 0x26B37,
  },
  {
    name: 'weapon',
    description: 'Weapons',
    test: s => /dagger|sword|glaive/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/glaive_thumb.png',
    color: 0xA3A097,
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
    name: 'resource',
    description: 'Resources',
    test: s => resources.includes(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/resource_thumb.png',
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
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/endo_thumb.png',
    color: 0xC2A24C,
  },
  {
    name: 'potato',
    description: 'Orokin Catalysts/Reactors',
    test: s => /catalyst|reactor/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/potato_thumb.png',
    color: 0x689ADD,
  },
  {
    name: 'forma',
    description: 'Forma',
    test: s => /forma/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/forma_thumb.png',
    color: 0xF9E592,
  },
  {
    name: 'exilus',
    description: 'Exilus',
    test: s => /exilus/i.test(s),
    thumbnail: 'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/exilus_thumb.png',
    color: 0x722824,
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
      this.countedItems.map(i => `${i.count} ${i.type}`));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }
}

module.exports = Reward;
