'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const fetch = require('node-fetch');

const logger = {
  error: () => {},
  debug: () => {},
  info: () => {},
  log: () => {},
};

chai.should();
chai.use(sinonChai);

const WorldState = rewire('../../lib/WorldState.js');

describe('WorldState (integration)', () => {
  describe('#constructor()', async () => {
    ['pc', 'ps4', 'xb1', 'swi'].forEach((platform) => {
      it('should parse live worldstate data', async () => {
        const url = `https://content.${platform === 'pc' ? '' : `${platform}.`}warframe.com/dynamic/worldState.php`;
        const ws = await fetch(url).then((d) => d.text());

        let wsl;
        (() => {
          wsl = new WorldState(ws, { logger });
        }).should.not.throw();

        wsl.news.forEach((article) => {
          if (article.message.toLowerCase().includes('stream')) {
            article.should.include({ stream: true });
          }
        });
      });
    });
  });
});
