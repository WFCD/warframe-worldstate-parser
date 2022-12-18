'use strict';

const fetch = require('node-fetch');
const chai = require('chai');

const WorldState = require('../../main');

const kuvaMock = require('../data/kuvalog.json');
const sentientMock = require('../data/anomaly.json');

chai.should();

const checkToString = (worldState) => {
  Object.getOwnPropertyNames(worldState)
    .filter((p) => {
      // eslint-disable-next-line no-console
      if (!worldState[p]) console.info(`${p} was undefined`);
      return worldState[p];
    })
    .forEach((p) => {
      if (Array.isArray(worldState[p])) {
        worldState[p].forEach((m) => m.toString());
      } else {
        worldState[p].toString();
      }
    });
};

const data = {};
const platforms = ['pc'];
let w;

const getPData = (p) =>
  fetch(`https://content.warframe.com/dynamic/worldState.php`)
    .then((d) => d.text())
    .then((d) => {
      data[p] = d;
    });

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
        try {
          w = new WorldState(data[platform], deps);
          checkToString(w);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw e;
        }
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
        try {
          w = new WorldState(data[platform], deps);
          checkToString(w);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw e;
        }
      }).should.not.throw();
    });
  });
});
