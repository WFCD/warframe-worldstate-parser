'use strict';

// Resource names
const resources = [
  'Alloy Plate',
  'Argon Crystal',
  'Circuits',
  'Control Module',
  'Cryotic',
  'Ferrite',
  'Gallium',
  'Morphics',
  'Nano Spores',
  'Neural Sensors',
  'Neurodes',
  'Orokin Cell',
  'Oxium',
  'Plastids',
  'Polymer Bundle',
  'Rubedo',
  'Salvage',
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
  'Chilling Reload',
  'Constitution',
  'Drifting Contact',
  'Focus Energy',
  'Fortitude',
  'Hammer Shot',
  'Ice Storm',
  'Lethal Torrent',
  'Rending Strike',
  'Stunning Speed',
  'Wildfire',
  'Seeking Fury',
  'Streamlined Form',
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

/**
 * All possible RewardTypes
 * @type {Array.<RewardType>}
 */
const rewardTypes = [
  {
    name: 'vauban',
    description: 'Vauban parts',
    test: (s) => /^vauban(?!.*helmet)/i.test(s),
    thumbnail: 'https://i.imgur.com/r5x0owi.png',
    color: 0x5c5a53,
  },
  {
    name: 'vandal',
    description: 'Vandal Weapon Parts',
    test: (s) => /vandal/i.test(s),
    thumbnail: 'https://i.imgur.com/kPQcg5B.png',
    color: 0x5c5a53,
  },
  {
    name: 'wraith',
    description: 'Wraith Weapon Parts',
    test: (s) => /wraith/i.test(s),
    thumbnail: 'https://i.imgur.com/B5sv3mQ.png',
    color: 0x5c5a53,
  },
  {
    name: 'skin',
    description: 'Weapon skins',
    test: (s) => /skin/i.test(s),
    thumbnail:
      'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png',
    color: 0x4f4c33,
  },
  {
    name: 'helmet',
    description: 'Alternative helmets',
    test: (s) => /helmet/i.test(s),
    thumbnail:
      'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png',
    color: 0x567677,
  },
  {
    name: 'nitain',
    description: 'Nitain extract',
    test: (s) => /nitain/i.test(s),
    thumbnail: 'https://i.imgur.com/3Db4PHh.png',
    color: 0xaeada4,
  },
  {
    name: 'mutalist',
    description: 'Mutalist Alad V coordinates',
    test: (s) => /mutalist/i.test(s),
    thumbnail: 'https://i.imgur.com/96AWqr8.png',
    color: 0x26b37,
  },
  {
    name: 'weapon',
    description: 'Weapons',
    test: (s) => /dagger|sword|glaive/i.test(s),
    thumbnail: 'https://i.imgur.com/A2gbH8k.png',
    color: 0xa3a097,
  },
  {
    name: 'fieldron',
    description: 'Fieldron',
    test: (s) => /fieldron/i.test(s),
    thumbnail: 'https://i.imgur.com/qlrlfft.png',
    color: 0x4d5556,
  },
  {
    name: 'detonite',
    description: 'Detonite Injector',
    test: (s) => /detonite/i.test(s),
    thumbnail: 'https://i.imgur.com/rV6lN4W.png',
    color: 0x4d5556,
  },
  {
    name: 'mutagen',
    description: 'Mutagen Mass',
    test: (s) => /mutagen/i.test(s),
    thumbnail: 'https://i.imgur.com/vV7kzub.png',
    color: 0x4d5556,
  },
  {
    name: 'clantech',
    description: 'Clantech resources',
    test: (s) => /fieldron|detonite|mutagen/i.test(s),
    thumbnail:
      'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/clantech_thmb.png',
    color: 0x4d5556,
  },
  {
    name: 'aura',
    description: 'Auras',
    test: (s) => auras.includes(s),
    thumbnail:
      'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png',
    color: 0xc8f8ff,
  },
  {
    name: 'neuralSensors',
    description: 'Neural Sensors',
    test: (s) => /neural/i.test(s),
    thumbnail: 'https://i.imgur.com/Gq6cz9p.png',
    color: 0xc8f8ff,
  },
  {
    name: 'neurodes',
    description: 'Neurodes',
    test: (s) => /neurode/i.test(s),
    thumbnail: 'https://cdn.warframestat.us/img/component-neurode.png',
    color: 0xc8f8ff,
  },
  {
    name: 'orokinCell',
    description: 'Orokin Cell',
    test: (s) => /orokin\scell/i.test(s),
    thumbnail: 'https://i.imgur.com/tEQdoDE.png',
    color: 0xc8f8ff,
  },
  {
    name: 'alloyPlate',
    description: 'Alloy Plate',
    test: (s) => /alloy\splate/i.test(s),
    thumbnail: 'https://i.imgur.com/E8K3fOI.png',
    color: 0xc8f8ff,
  },
  {
    name: 'circuits',
    description: 'Circuits',
    test: (s) => /circuits/i.test(s),
    thumbnail: 'https://i.imgur.com/OxJvWIx.png',
    color: 0xc8f8ff,
  },
  {
    name: 'controlModule',
    description: 'Control Module',
    test: (s) => /control\smodule/i.test(s),
    thumbnail: 'https://i.imgur.com/F1UUub1.png',
    color: 0xc8f8ff,
  },
  {
    name: 'ferrite',
    description: 'Ferrite',
    test: (s) => /ferrite/i.test(s),
    thumbnail: 'https://i.imgur.com/h93eVLr.png',
    color: 0xc8f8ff,
  },
  {
    name: 'gallium',
    description: 'Gallium',
    test: (s) => /gallium/i.test(s),
    thumbnail: 'https://i.imgur.com/pvpc73S.png',
    color: 0xa1adba,
  },
  {
    name: 'morphics',
    description: 'Morphics',
    test: (s) => /morphics/i.test(s),
    thumbnail: 'https://i.imgur.com/SF3XWd6.png',
    color: 0xc8f8ff,
  },
  {
    name: 'nanoSpores',
    description: 'Nano Spores',
    test: (s) => /nano\sspores/i.test(s),
    thumbnail: 'https://i.imgur.com/bb71Cy7.png',
    color: 0x533f36,
  },
  {
    name: 'oxium',
    description: 'Oxium',
    test: (s) => /oxium/i.test(s),
    thumbnail: 'https://i.imgur.com/hY8NCjk.png',
    color: 0x92713b,
  },
  {
    name: 'rubedo',
    description: 'Rubedo',
    test: (s) => /rubedo/i.test(s),
    thumbnail: 'https://i.imgur.com/gSO9ILf.png',
    color: 0xce3e36,
  },
  {
    name: 'salvage',
    description: 'Salvage',
    test: (s) => /salvage/i.test(s),
    thumbnail: 'https://i.imgur.com/3L7xLYg.png',
    color: 0x8b8e8d,
  },
  {
    name: 'plastids',
    description: 'Plastids',
    test: (s) => /plastids/i.test(s),
    thumbnail: 'https://i.imgur.com/5yVfTEF.png',
    color: 0xceae88,
  },
  {
    name: 'polymerBundle',
    description: 'Polymer Bundle',
    test: (s) => /polymer\sbundle/i.test(s),
    thumbnail: 'https://i.imgur.com/pg8asnC.png',
    color: 0x6b4da4,
  },
  {
    name: 'argonCrystal',
    description: 'Argon Crystal',
    test: (s) => /argon\scrystal/i.test(s),
    thumbnail: 'https://i.imgur.com/DdJJYSB.png',
    color: 0xc8f8ff,
  },
  {
    name: 'cryotic',
    description: 'Cryotic',
    test: (s) => /cryotic/i.test(s),
    thumbnail: 'https://i.imgur.com/yqPgj21.png',
    color: 0x78a2b3,
  },
  {
    name: 'tellurium',
    description: 'Tellurium',
    test: (s) => /tellurium/i.test(s),
    thumbnail: 'https://i.imgur.com/ocjnGU8.png',
    color: 0xe72e18,
  },
  {
    name: 'resource',
    description: 'Resources',
    test: (s) => resources.includes(s),
    thumbnail: 'https://i.imgur.com/Bq5TEPo.png',
    color: 0xffee9c,
  },
  {
    name: 'nightmare',
    description: 'Nightmare mods',
    test: (s) => nightmare.includes(s),
    thumbnail: 'https://i.imgur.com/cAYNH7j.png',
    color: 0xb22e2c,
  },
  {
    name: 'endo',
    description: 'Endo',
    test: (s) => /\d+\sendo/i.test(s),
    thumbnail: 'https://i.imgur.com/mS8oSwx.png',
    color: 0xc2a24c,
  },
  {
    name: 'reactor',
    description: 'Orokin Reactors',
    test: (s) => /reactor/i.test(s),
    thumbnail: 'https://i.imgur.com/6Hm1BEq.png',
    color: 0xd7c37d,
  },
  {
    name: 'catalyst',
    description: 'Orokin Catalyst',
    test: (s) => /catalyst/i.test(s),
    thumbnail: 'https://i.imgur.com/C4X9NWm.png',
    color: 0x689add,
  },
  {
    name: 'potato',
    description: 'Orokin Catalysts/Reactors',
    test: (s) => /catalyst|reactor/i.test(s),
    thumbnail: 'https://i.imgur.com/6Hm1BEq.png',
    color: 0x689add,
  },
  {
    name: 'forma',
    description: 'Forma',
    test: (s) => /forma/i.test(s),
    thumbnail: 'https://i.imgur.com/2b0FT3D.png',
    color: 0xb19547,
  },
  {
    name: 'exilus',
    description: 'Exilus',
    test: (s) => /exilus/i.test(s),
    thumbnail: 'https://i.imgur.com/eQNeNpY.png',
    color: 0x88332d,
  },
  {
    name: 'synthula',
    description: 'Synthula',
    test: (s) => /synthula/i.test(s),
    thumbnail: 'https://i.imgur.com/X0Lvfc9.png',
    color: 0x9fa19f,
  },
  {
    name: 'kavatGene',
    description: 'Kavat Genetic Code',
    test: (s) => /Kavat Ge/i.test(s),
    thumbnail: 'https://i.imgur.com/ijVUmQV.png',
    color: 0x76a8ad,
  },
  {
    name: 'kubrowEgg',
    description: 'Kubrow Egg',
    test: (s) => /kubrow\segg/i.test(s),
    thumbnail: 'https://i.imgur.com/Vv3LXnz.png',
    color: 0xa5937f,
  },
  {
    name: 'traces',
    description: 'Void Traces',
    test: (s) => /trace/i.test(s),
    thumbnail: 'https://i.imgur.com/vvZGMPv.png',
    color: 0x69a4dd,
  },
  {
    name: 'riven',
    description: 'Riven Mod',
    test: (s) => /riven/i.test(s),
    thumbnail: 'https://i.imgur.com/LoficZr.png',
    color: 0xa183bd,
  },
  // Catch-all
  {
    name: 'other',
    description: 'Other',
    test: () => true,
    thumbnail: '',
    color: 0x4f545c,
  },
];

/**
 * Returns the type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {string}          The type name
 */
function getItemType(item, types = rewardTypes) {
  return types.find((t) => t.test(item)).name;
}

/**
 * Returns the full type of a given item
 * @param   {string}          item The item whose type needs to be determined
 * @param   {Array.<RewardType>}  [types] The possible types
 * @returns {RewardType}      The type
 */
function getItemTypeFull(item, types = rewardTypes) {
  return types.find((t) => t.test(item));
}

/**
 * Represents a mission reward
 */
class Reward {
  /**
   * @param   {Object} data                 The mission data
   * @param   {Object}             deps            The dependencies object
   * @param   {Translator}         deps.translator The string translator
   * @param   {string}             deps.locale     Locale to use for translations
   */
  constructor(data, { translator, locale }) {
    /**
     * The items being rewarded
     * @type {Array.<string>}
     */
    this.items = data.items ? data.items.map((i) => translator.languageString(i), locale) : [];

    /**
     * The counted items being rewarded
     * @type {Array.<Object>}
     */
    this.countedItems = data.countedItems
      ? data.countedItems.map((i) => ({
          count: i.ItemCount,
          type: translator.languageString(i.ItemType, locale),
          key: translator.languageString(i.ItemType),
        }))
      : [];

    /**
     * The credits being rewarded
     * @type {number}
     */
    this.credits = data.credits || 0;

    this.asString = this.toString();

    this.itemString = this.items
      .concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()))
      .join(' + ');

    this.thumbnail = this.getTypesFull()[0] ? this.getTypesFull()[0].thumbnail : 'https://i.imgur.com/JCKyUXJ.png';

    this.color = this.getTypesFull()[0] ? this.getTypesFull()[0].color : 0xf1c40f;
  }

  /**
   * The types of all items that are being rewarded
   * @returns {Array.<string>}
   */
  getTypes() {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemType(t));
  }

  /**
   * The types of all the items that are being rewarded
   * @returns {Array.<RewardType>}
   */
  getTypesFull() {
    return this.items.concat(this.countedItems.map((i) => i.key)).map((t) => getItemTypeFull(t));
  }

  /**
   * The reward's string representation
   * @returns {string}
   */
  toString() {
    const tokens = this.items.concat(this.countedItems.map((i) => `${i.count > 1 ? i.count : ''} ${i.type}`.trim()));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }
}

module.exports = Reward;
