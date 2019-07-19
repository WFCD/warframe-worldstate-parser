'use strict';

const fetch = require('node-fetch');
const chai = require('chai');

const WorldState = require('../main.js');

chai.should();

const checkToString = function checkToString(worldState) {
  Object.getOwnPropertyNames(worldState).forEach((p) => {
    if (Array.isArray(worldState[p])) {
      worldState[p].forEach(m => m.toString());
    } else {
      worldState[p].toString();
    }
  });
};

const data = {};
const platforms = ['pc', 'ps4', 'xb1', 'swi'];
let w;

const getPData = p => fetch(`http://content${p !== 'pc' ? `.${p}` : ''}.warframe.com/dynamic/worldState.php`)
  .then(d => d.text())
  .then((d) => { data[p] = d; });

before(() => {
  const ps = platforms.map(getPData);
  return Promise.all(ps);
});

afterEach(() => {
  if (!w) {
    return;
  }
  w.stopKuva();
});

describe('The parser', () => {
  platforms.forEach((platform) => {
    it(`Should parse the ${platform.toUpperCase()} data without throwing`, () => {
      (() => {
        w = new WorldState(data[platform]);
        checkToString(w);
      }).should.not.throw();
    });

    it(`Should parse the ${platform.toUpperCase()} data to Spanish without throwing`, () => {
      (() => {
        w = new WorldState(data[platform], { locale: 'es' });
        checkToString(w);
      }).should.not.throw();
    });
  });
});
