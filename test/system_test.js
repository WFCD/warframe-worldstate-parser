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

let pcData;
let ps4Data;
let xb1Data;
before(function () {
  return Promise.all([
    httpGet('http://content.warframe.com/dynamic/worldState.php').then((d) => {
      pcData = d;
    }),
    httpGet('http://content.ps4.warframe.com/dynamic/worldState.php').then((d) => {
      ps4Data = d;
    }),
    httpGet('http://content.xb1.warframe.com/dynamic/worldState.php').then((d) => {
      xb1Data = d;
    }),
  ]);
});

describe('The parser', function () {
  it('Should parse the PC data without throwing', function () {
    (function () {
      const w = new WorldState(pcData);
      checkToString(w);
    }).should.not.throw();
  });
  it('Should parse the PS4 data without throwing', function () {
    (function () {
      const w = new WorldState(ps4Data);
      checkToString(w);
    }).should.not.throw();
  });
  it('Should parse the XB1 data without throwing', function () {
    (function () {
      const w = new WorldState(xb1Data);
      checkToString(w);
    }).should.not.throw();
  });
});
