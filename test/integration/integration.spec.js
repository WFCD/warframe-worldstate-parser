import chai from 'chai';
import sinonChai from 'sinon-chai';
import fs from 'node:fs/promises';
import path from 'node:path';
import WorldState from '../../lib/WorldState.js';

const logger = {
  error: () => {},
  debug: () => {},
  info: () => {},
  log: () => {},
};

const { expect } = chai;
chai.should();
chai.use(sinonChai);

describe('WorldState (integration)', () => {
  it(`should parse live pc worldstate data`, async function () {
    this.timeout = 10000; // allow 10 seconds to parse the worldstate
    const kuvaData = await fetch('https://10o.io/arbitrations.json').then((res) => res.json());
    const ws = await fetch('https://content.warframe.com/dynamic/worldState.php').then((res) => res.text());

    let wsl;
    (() => {
      try {
        // once without kuva data
        wsl = new WorldState(ws, { logger, locale: 'en' });
        wsl = new WorldState(ws, { logger, locale: 'en', kuvaData });
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
        throw e;
      }
    }).should.not.throw();

    expect(wsl.news).to.exist;
    wsl?.news?.forEach((article) => {
      if (article.message.toLowerCase().includes('stream')) {
        article.should.include({ stream: true });
      }
    });
    expect(wsl?.duviriCycle).to.exist;
    wsl?.duviriCycle?.choices.should.have.length.gte(2);
    /* Easy debugging! */
    if (process.env.CI) {
      return fs.writeFile(
        path.resolve(`./data.pc.json`),
        JSON.stringify(wsl.syndicateMissions.find((m) => m.syndicateKey === 'Ostrons'))
      );
    }
  });
});
