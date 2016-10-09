'use strict';

const md = require('node-md-config');
const Reward = require('./Reward.js');

class Mission {
  constructor(data, translator) {
    if (data.descText) {
      if (data.descText.includes('/')) {
        this.description = translator.languageString(data.descText);
      } else {
        this.description = data.descText;
      }
    } else {
      this.description = '';
    }

    this.location = translator.node(data.location);
    this.type = translator.missionType(data.missionType);
    this.faction = translator.faction(data.faction);

    if (data.missionReward) {
      this.reward = new Reward(data.missionReward);
    }
    this.minEnemyLevel = data.minEnemyLevel;
    this.maxEnemyLevel = data.maxEnemyLevel;
    this.maxWaveNum = data.maxWaveNum;
  }

  toString() {
    const lines = [
      this.reward.toString(),
    ];

    lines.push(`${this.faction} (${this.type})`);
    lines.push(this.location);
    lines.push(`level ${this.minEnemyLevel} - ${this.maxEnemyLevel}`);

    return lines.join(md.lineEnd);
  }
}

module.exports = Mission;
