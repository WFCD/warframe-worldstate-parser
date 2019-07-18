'use strict';

const http = require('http');
const chai = require('chai');

const WorldState = require('../main.js');

chai.should();

const httpGet = function httpGet(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Request failed with code + ${response.statusCode}`));
      }
      const body = [];
      response.on('data', data => body.push(data));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', err => reject(err));
  });
};
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

before(() => {
  Promise.all(platforms
    .map(p => httpGet(`http://content${p !== 'pc' ? `.${p}` : ''}.warframe.com/dynamic/worldState.php`)
      .then((d) => { data[p] = d; })));
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
