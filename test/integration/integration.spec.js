'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');
const fs = require('fs').promises;

const fetch = require('node-fetch');
const path = require('path');

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
    await Promise.all(
      // no more other console worldstates.....
      ['pc'].map(async function (platform) {
        it(`should parse live ${platform} worldstate data`, async function () {
          this.timeout = 10000; // allow 10 seconds to parse the worldstate

          const { kuvaData, ws } = await fetch('https://10o.io/arbitrations.json')
            .then((res) => res.json())
            .then(async (semlar) => ({
              kuvaData: semlar,
              ws: await fetch('https://content.warframe.com/dynamic/worldState.php').then((res) => res.text()),
            }));

          let wsl;
          (() => {
            try {
              // once without kuva data
              wsl = new WorldState(ws, { logger, locale: 'en' });
              wsl = new WorldState(ws, { logger, locale: 'en', kuvaData });
            } catch (e) {
              console.error(e);
              throw e;
            }
          }).should.not.throw();

          wsl &&
            wsl.news &&
            wsl.news.forEach((article) => {
              if (article.message.toLowerCase().includes('stream')) {
                article.should.include({ stream: true });
              }
            });
          /* Easy debugging! */
          if (process.env.CI) {
            return fs.writeFile(
              path.resolve(`./data.${platform}.json`),
              JSON.stringify(wsl.syndicateMissions.find((m) => m.syndicateKey === 'Ostrons'))
            );
          }
        });
      })
    );
  });
});
