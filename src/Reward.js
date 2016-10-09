'use strict';

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
  {
    name: 'other',
    description: 'Other',
    test: () => true,
  },
];

function getItemType(item) {
  return rewardTypes.find(type => type.test(item)).name;
}

class Reward {
  constructor(data, translator) {
    this.items = data.items.map(i => translator.languageString(i));
    this.countedItems = data.countedItems.map(i => ({
      count: i.ItemCount,
      type: translator.languageString(i.ItemType),
    }));
    this.credits = data.credits || 0;
  }

  toString() {
    const tokens = this.items.concat(
      this.countedItems.map(i => `${i.count} ${i.type}`));

    if (this.credits) {
      tokens.push(`${this.credits}cr`);
    }

    return tokens.join(' + ');
  }

  get types() {
    return this.items.concat(this.countedItems.map(i => i.type)).map(getItemType);
  }
}

module.exports = Reward;
