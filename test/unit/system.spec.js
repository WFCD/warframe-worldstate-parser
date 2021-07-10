'use strict';

const fetch = require('node-fetch');
const chai = require('chai');

const WorldState = require('../../main');

const kuvaMock = require('../data/kuvalog.json');
const sentientMock = require('../data/anomaly.json');

chai.should();

const checkToString = function checkToString(worldState) {
  Object.getOwnPropertyNames(worldState).forEach((p) => {
    if (Array.isArray(worldState[p])) {
      worldState[p].forEach((m) => m.toString());
    } else {
      worldState[p].toString();
    }
  });
};

const data = {};
const platforms = ['pc', 'ps4', 'xb1', 'swi'];
let w;

const getPData = (p) => fetch(`http://content${p !== 'pc' ? `.${p}` : ''}.warframe.com/dynamic/worldState.php`)
  .then((d) => d.text())
  .then((d) => { data[p] = d; });

before(() => {
  const ps = platforms.map(getPData);
  return Promise.all(ps);
});

describe('The parser', () => {
  platforms.forEach((platform) => {
    it(`Should parse the ${platform.toUpperCase()} data without throwing`, () => {
      const deps = {
        kuvaData: kuvaMock,
        sentientData: sentientMock,
        logger: console,
      };

      (() => {
        w = new WorldState(data[platform], deps);
        checkToString(w);
      }).should.not.throw();
    });

    it(`Should parse the ${platform.toUpperCase()} data to Spanish without throwing`, () => {
      const deps = {
        locale: 'es',
        kuvaData: kuvaMock,
        sentientData: sentientMock,
        logger: console,
      };

      (() => {
        w = new WorldState(data[platform], deps);
        checkToString(w);
      }).should.not.throw();
    });
  });
});
