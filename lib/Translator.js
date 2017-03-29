'use strict';

const worldStateData = require('warframe-worldstate-data');

/**
 * Translator to convert in-game names to their localizations
 */
class Translator {
		
	constructor(lang = 'en_US') {
		this.data = worldStateData[lang];
		if(typeof this.data !== "object") {
			throw new TypeError("data with lang="+lang+" doesn't exists. Please check 'warframe-worldstate-data' dep.");
		}
	}

    /**
	 *
     * @param str
     */
	toTitleCase(str) {
	  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	}

    /**
	 *
     * @param str
     * @returns {string}
     */
	splitResourceName(str) {
	  return str.split(/([A-Z]?[^A-Z]*)/g).filter(item => item).join(' ');
	}

    /**
     * Converts faction names
     * @param key
     * @returns {string}
     */
	faction(key) {
	  if (key in this.data.factions) {
		return this.data.factions[key].value;
	  }
	  return key;
	}

    /**
	 * Converts star map node names
     * @param key
     * @returns {string}
     */
	node(key) {
	  if (key in this.data.solNodes) {
		return this.data.solNodes[key].value;
	  } else if (key) {
		return key.split('/').slice(-1)[0];
	  }
	  return key;
	}

    /**
	 * Returns the mission type of a given node
     * @param key
     * @returns {*}
     */
	nodeMissionType(key) {
	  if (key in this.data.solNodes) {
		return this.data.solNodes[key].type;
	  } else if (key) {
		return key.split('/').slice(-1)[0];
	  }
	  return key;
	}

    /**
	 * Returns the faction that controls a given node
     * @param key
     * @returns {*}
     */
	nodeEnemy(key) {
	  if (key in this.data.solNodes) {
		return this.data.solNodes[key].enemy;
	  } else if (key) {
		return key.split('/').slice(-1)[0];
	  }
	  return key;
	}

    /**
	 * Converts generic language strings
     * @param key
     * @returns {*}
     */
	languageString(key) {
	  const lowerKey = String(key).toLowerCase();
	  if (lowerKey in this.data.languages) {
		return this.toTitleCase(this.data.languages[lowerKey].value);
	  } else if (key) {
		return this.splitResourceName(String(key).split('/').slice(-1)[0]);
	  }
	  return key;
	}

    /**
	 * Converts mission types
     * @param key
     * @returns {*}
     */
	missionType(key) {
	  if (key in this.data.missionTypes) {
		return this.data.missionTypes[key].value;
	  }
	  return key;
	}

    /**
	 * Converts conclave modes
     * @param key
     * @returns {*}
     */
	conclaveMode(key) {
	  if (key in this.data.conclave.modes) {
		return this.data.conclave.modes[key].value;
	  }
	  return key;
	}

    /**
	 * Converts conclave challenge categories
     * @param key
     * @returns {*}
     */
	conclaveCategory(key) {
	  if (key in this.data.conclave.categories) {
		return this.data.conclave.categories[key].value;
	  }
	  return key;
	}

    /**
	 * Converts fissure mission modifiers
     * @param key
     * @returns {*}
     */
	fissureModifier(key) {
	  if (key in this.data.fissureModifiers) {
		return this.data.fissureModifiers[key].value;
	  }
	  return key;
	}

    /**
	 * Converts syndicate names
     * @param key
     * @returns {*}
     */
	fissureTier(key) {
	  if (key in this.data.fissureModifiers) {
		return this.data.fissureModifiers[key].num;
	  }
	  return key;
	}

    /**
	 * Converts upgrade types
     * @param key
     * @returns {*}
     */
	syndicate(key) {
	  if (key in this.data.syndicates) {
		return this.data.syndicates[key].name;
	  }
	  return key;
	}

    /**
	 * Converts upgrade types
     * @param key
     * @returns {*}
     */
	upgrade(key) {
	  if (key in this.data.upgradeTypes) {
		return this.data.upgradeTypes[key].value;
	  }
	  return key;
	}

    /**
	 * Converts operation types
     * @param key
     * @returns {*}
     */
	operation(key) {
	  if (key in this.data.operationTypes) {
		return this.data.operationTypes[key].value;
	  }
	  return key;
	}

    /**
	 * Converts sortie boss names
     * @param key
     * @returns {*}
     */
	sortieBoss(key) {
	  if (key in this.data.sortie.bosses) {
		return this.data.sortie.bosses[key].name;
	  }
	  return key;
	}

    /**
	 * Converts sortie faction names
     * @param key
     * @returns {*}
     */
	sortieFaction(key) {
	  if (key in this.data.sortie.bosses) {
		return this.data.sortie.bosses[key].faction;
	  }
	  return key;
	}

    /**
	 * Converts sortie modifier types
     * @param key
     * @returns {*}
     */
	sortieModifier(key) {
	  if (key in this.data.sortie.modifierTypes) {
		return this.data.sortie.modifierTypes[key];
	  }
	  return key;
	}

    /**
	 * Converts persistent enemy region indicies
     * @param key
     * @returns {*}
     */
	region(key) {
	  if (key && this.data.persistentEnemy[key]) {
		return this.data.persistentEnemy[key];
	  }
	  return key;
	}
}

module.exports = Translator;
