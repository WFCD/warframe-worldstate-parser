import { cdn, wfCdn } from './ImgCdn.js';
import { auras, nightmare, resources } from './RewardData.js';

/**
 * An object describing a type of reward, including name, description,
 * test function to verify type from a string, thumbnail url, and color
 */
export interface RewardType {
  /**
   * Name of the reward type.
   */
  name: string;

  /**
   * Description of the reward type.
   */
  description: string;

  /**
   * Function for testing the reward type against a string.
   */
  test: (s: string) => boolean;

  /**
   * Thumbnail url for the reward type.
   */
  thumbnail: string;

  /**
   * Summary color representing this reward type
   */
  color: number;
}

/**
 * All possible RewardTypes
 * @type {Array.<RewardType>}
 */
export default <RewardType[]>[
  {
    name: 'vauban',
    description: 'Vauban parts',
    test: (s: string) => /^vauban(?!.*helmet)/i.test(s),
    thumbnail: wfCdn('vauban.png'),
    color: 0x5c5a53,
  },
  {
    name: 'vandal',
    description: 'Vandal Weapon Parts',
    test: (s: string) => /vandal/i.test(s),
    thumbnail: wfCdn('dera-vandal.png'),
    color: 0x5c5a53,
  },
  {
    name: 'wraith',
    description: 'Wraith Weapon Parts',
    test: (s: string) => /wraith/i.test(s),
    thumbnail: wfCdn('furax-wraith.png'),
    color: 0x5c5a53,
  },
  {
    name: 'skin',
    description: 'Weapon skins',
    test: (s: string) => /skin/i.test(s),
    thumbnail:
      'https://raw.githubusercontent.com/wfcd/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png',
    color: 0x4f4c33,
  },
  {
    name: 'helmet',
    description: 'Alternative helmets',
    test: (s: string) => /helmet/i.test(s),
    thumbnail:
      'https://raw.githubusercontent.com/wfcd/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png',
    color: 0x567677,
  },
  {
    name: 'nitain',
    description: 'Nitain extract',
    test: (s: string) => /nitain/i.test(s),
    thumbnail: wfCdn('nitain-extract.png'),
    color: 0xaeada4,
  },
  {
    name: 'mutalist',
    description: 'Mutalist Alad V coordinates',
    test: (s: string) => /mutalist/i.test(s),
    thumbnail: wfCdn('mutalist-alad-v-nav-coordinate.png'),
    color: 0x26b37,
  },
  {
    name: 'weapon',
    description: 'Weapons',
    test: (s: string) => /dagger|sword|glaive/i.test(s),
    thumbnail: wfCdn('blueprint'),
    color: 0xa3a097,
  },
  {
    name: 'fieldron',
    description: 'Fieldron',
    test: (s: string) => /fieldron/i.test(s),
    thumbnail: wfCdn('fieldron.png'),
    color: 0x4d5556,
  },
  {
    name: 'detonite',
    description: 'Detonite Injector',
    test: (s: string) => /detonite/i.test(s),
    thumbnail: wfCdn('detonite-injector.png'),
    color: 0x4d5556,
  },
  {
    name: 'mutagen',
    description: 'Mutagen Mass',
    test: (s: string) => /mutagen/i.test(s),
    thumbnail: wfCdn('mutagen-mass.png'),
    color: 0x4d5556,
  },
  {
    name: 'clantech',
    description: 'Clantech resources',
    test: (s: string) => /fieldron|detonite|mutagen/i.test(s),
    thumbnail: 'https://github.com/wfcd/warframe-worldstate-parser/raw/master/resources/clantech_thmb.png',
    color: 0x4d5556,
  },
  {
    name: 'aura',
    description: 'Auras',
    test: (s: string) => auras.includes(s),
    thumbnail: 'https://github.com/wfcd/warframe-worldstate-parser/raw/master/resources/aura_thumb.png',
    color: 0xc8f8ff,
  },
  {
    name: 'neuralSensors',
    description: 'Neural Sensors',
    test: (s: string) => /neural/i.test(s),
    thumbnail: wfCdn('neural-sensors.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'neurodes',
    description: 'Neurodes',
    test: (s: string) => /neurode/i.test(s),
    thumbnail: wfCdn('neurodes.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'orokinCell',
    description: 'Orokin Cell',
    test: (s: string) => /orokin\scell/i.test(s),
    thumbnail: wfCdn('orokin-cell.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'alloyPlate',
    description: 'Alloy Plate',
    test: (s: string) => /alloy\splate/i.test(s),
    thumbnail: wfCdn('alloy-plate.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'circuits',
    description: 'Circuits',
    test: (s: string) => /circuits/i.test(s),
    thumbnail: wfCdn('circuits.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'controlModule',
    description: 'Control Module',
    test: (s: string) => /control\smodule/i.test(s),
    thumbnail: wfCdn('control-module.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'ferrite',
    description: 'Ferrite',
    test: (s: string) => /ferrite/i.test(s),
    thumbnail: wfCdn('ferrite.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'gallium',
    description: 'Gallium',
    test: (s: string) => /gallium/i.test(s),
    thumbnail: wfCdn('gallium.png'),
    color: 0xa1adba,
  },
  {
    name: 'morphics',
    description: 'Morphics',
    test: (s: string) => /morphics/i.test(s),
    thumbnail: wfCdn('morphics.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'nanoSpores',
    description: 'Nano Spores',
    test: (s: string) => /nano\sspores/i.test(s),
    thumbnail: wfCdn('nano-spores.png'),
    color: 0x533f36,
  },
  {
    name: 'oxium',
    description: 'Oxium',
    test: (s: string) => /oxium/i.test(s),
    thumbnail: wfCdn('oxium.png'),
    color: 0x92713b,
  },
  {
    name: 'rubedo',
    description: 'Rubedo',
    test: (s: string) => /rubedo/i.test(s),
    thumbnail: wfCdn('rubedo.png'),
    color: 0xce3e36,
  },
  {
    name: 'salvage',
    description: 'Salvage',
    test: (s: string) => /salvage/i.test(s),
    thumbnail: wfCdn('salvage.png'),
    color: 0x8b8e8d,
  },
  {
    name: 'plastids',
    description: 'Plastids',
    test: (s: string) => /plastids/i.test(s),
    thumbnail: wfCdn('plastids.png'),
    color: 0xceae88,
  },
  {
    name: 'polymerBundle',
    description: 'Polymer Bundle',
    test: (s: string) => /polymer\sbundle/i.test(s),
    thumbnail: wfCdn('polymer-bundle.png'),
    color: 0x6b4da4,
  },
  {
    name: 'argonCrystal',
    description: 'Argon Crystal',
    test: (s: string) => /argon\scrystal/i.test(s),
    thumbnail: wfCdn('argon-crystal.png'),
    color: 0xc8f8ff,
  },
  {
    name: 'cryotic',
    description: 'Cryotic',
    test: (s: string) => /cryotic/i.test(s),
    thumbnail: wfCdn('cryotic.png'),
    color: 0x78a2b3,
  },
  {
    name: 'tellurium',
    description: 'Tellurium',
    test: (s: string) => /tellurium/i.test(s),
    thumbnail: wfCdn('tellurium.png'),
    color: 0xe72e18,
  },
  {
    name: 'resource',
    description: 'Resources',
    test: (s: string) => resources.includes(s),
    thumbnail: 'https://i.imgur.com/Bq5TEPo.png',
    color: 0xffee9c,
  },
  {
    name: 'nightmare',
    description: 'Nightmare mods',
    test: (s: string) => nightmare.includes(s),
    thumbnail: cdn('svg/nightmare.svg'),
    color: 0xb22e2c,
  },
  {
    name: 'endo',
    description: 'Endo',
    test: (s: string) => /^\d+x?\sendo/i.test(s),
    thumbnail: wfCdn('endo.png'),
    color: 0xc2a24c,
  },
  {
    name: 'reactor',
    description: 'Orokin Reactors',
    test: (s: string) => /reactor/i.test(s),
    thumbnail: wfCdn('orokin-reactor.png'),
    color: 0xd7c37d,
  },
  {
    name: 'catalyst',
    description: 'Orokin Catalyst',
    test: (s: string) => /catalyst/i.test(s),
    thumbnail: wfCdn('orokin-catalyst.png'),
    color: 0x689add,
  },
  {
    name: 'potato',
    description: 'Orokin Catalysts/Reactors',
    test: (s: string) => /catalyst|reactor/i.test(s),
    thumbnail: wfCdn('orokin-catalyst.png'),
    color: 0x689add,
  },
  {
    name: 'forma',
    description: 'Forma',
    test: (s: string) => /forma/i.test(s),
    thumbnail: wfCdn('forma.png'),
    color: 0xb19547,
  },
  {
    name: 'exilus',
    description: 'Exilus',
    test: (s: string) => /exilus/i.test(s),
    thumbnail: wfCdn('exilus-adapter.png'),
    color: 0x88332d,
  },
  {
    name: 'synthula',
    description: 'Synthula',
    test: (s: string) => /synthula/i.test(s),
    thumbnail: wfCdn('synthula.png'),
    color: 0x9fa19f,
  },
  {
    name: 'kavatGene',
    description: 'Kavat Genetic Code',
    test: (s: string) => /Kavat Ge/i.test(s),
    thumbnail: wfCdn('kavat-genetic-code.png'),
    color: 0x76a8ad,
  },
  {
    name: 'kubrowEgg',
    description: 'Kubrow Egg',
    test: (s: string) => /kubrow\segg/i.test(s),
    thumbnail: wfCdn('kubrow-egg'),
    color: 0xa5937f,
  },
  {
    name: 'traces',
    description: 'Void Traces',
    test: (s: string) => /trace/i.test(s),
    thumbnail: wfCdn('void-traces.png'),
    color: 0x69a4dd,
  },
  {
    name: 'riven',
    description: 'Riven Mod',
    test: (s: string) => /riven/i.test(s),
    thumbnail: wfCdn('rifle-riven-mod.png'),
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
