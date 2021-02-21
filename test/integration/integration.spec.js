'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const fetch = require('node-fetch');

chai.should();
chai.use(sinonChai);

const WorldState = rewire('../../lib/WorldState.js');

describe('WorldState (integration)', () => {
  describe('#constructor()', async () => {
    ['pc', 'ps4', 'xb1', 'swi'].forEach((platform) => {
      it('should parse live worldstate data', async () => {
        const url = `https://content.${platform === 'pc' ? '' : `${platform}.`}warframe.com/dynamic/worldState.php`;
        const ws = await fetch(url).then((d) => d.text());

        (() => {
          new WorldState(ws);
        }).should.not.throw();
      });
    });
  });
});
