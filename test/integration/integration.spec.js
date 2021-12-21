import chai from 'chai';
import sinonChai from 'sinon-chai';
import fs from 'fs';
import fetch from 'node-fetch';

import WorldState from '../../main.js';

const logger = {
  error: () => {},
  debug: () => {},
  info: () => {},
  log: () => {},
};

chai.should();
chai.use(sinonChai);

describe('WorldState (integration)', () => {
  describe('#constructor()', async () => {
    ['pc', 'ps4', 'xb1', 'swi'].forEach((platform) => {
      it('should parse live worldstate data', function (done) {
        this.timeout = 10000; // allow 10 seconds to parse the worldstate
        const url = `https://content.${platform === 'pc' ? '' : `${platform}.`}warframe.com/dynamic/worldState.php`;
        fetch(url)
          .then((d) => d.text())
          .then((ws) => {
            let wsl;
            (() => {
              wsl = new WorldState(ws, { logger, locale: 'en' });
            }).should.not.throw();

            wsl.news.forEach((article) => {
              if (article.message.toLowerCase().includes('stream')) {
                article.should.include({ stream: true });
              }
            });

            /* Easy debugging! */
            setTimeout(() => {
              fs.writeFileSync(`./data.${platform}.json`, JSON.stringify(wsl.syndicateMissions
                .find((m) => m.syndicateKey === 'Ostrons')));
              done();
            }, 1000);
          });
      });
    });
  });
});
