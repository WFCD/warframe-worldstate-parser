'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const fs = require('fs');

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
      it('should parse live worldstate data', async function () {
        this.timeout = 10000; // allow 10 seconds to parse the worldstate
        const url = `https://content.${platform === 'pc' ? '' : `${platform}.`}warframe.com/dynamic/worldState.php`;
        const ws = await fetch(url).then((d) => d.text());

        let wsl;
        (() => {
          wsl = new WorldState(ws, { logger, locale: 'zh' });
        }).should.not.throw();

        wsl.news.forEach((article) => {
          if (article.message.toLowerCase().includes('stream')) {
            article.should.include({ stream: true });
          }
        });

        /* Easy debugging! */
        setTimeout(() => {
          fs.writeFileSync(`./data.${platform}.json`, JSON.stringify(wsl));
        }, 1000);
      });
    });
  });
});
