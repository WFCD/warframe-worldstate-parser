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

// Reward types
const rewardTypes = [
  {
    name: 'vauban',
    description: 'Vauban parts',
    test: s => /^vauban/i.test(s),
  },
  {
    name: 'skin',
    description: 'Weapon skins',
    test: s => /skin/i.test(s),
  },
  {
    name: 'helmet',
    description: 'Alternative helmets',
    test: s => /helmet/i.test(s),
  },
  {
    name: 'nitain',
    description: 'Nitain extract',
    test: s => /nitain/i.test(s),
  },
  {
    name: 'mutalistCoordinate',
    description: 'Mutalist Alad V coordinates',
    test: s => /mutalist/i.test(s),
  },
  {
    name: 'weapon',
    description: 'Weapons',
    test: s => /dagger|sword|glaive/i.test(s),
  },
  {
    name: 'clantech',
    description: 'Clantech resources',
    test: s => /fieldron|detonite|mutagen/i.test(s),
  },
  {
    name: 'aura',
    description: 'Auras',
    test: s => auras.includes(s),
  },
  {
    name: 'resource',
    description: 'Resources',
    test: s => resources.includes(s),
  },
  {
    name: 'nightmare',
    description: 'Nightmare mods',
    test: s => nightmare.includes(s),
  },
  {
    name: 'endo',
    description: 'Endo',
    test: s => /\d+\sendo/i.test(s),
  },
  {
    name: 'potato',
    description: 'Orokin Catalysts/Reactors',
    test: s => /catalyst|reactor/i.test(s),
  },
  {
    name: 'forma',
    description: 'Forma',
    test: s => /forma/i.test(s),
  },
  {
    name: 'exilus',
    description: 'Exilus',
    test: s => /exilus/i.test(s),
  },

  // Catch-all
  {
    name: 'other',
    description: 'Other',
    test: () => true,
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
