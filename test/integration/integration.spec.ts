import fs from 'node:fs/promises';
import path from 'node:path';

import 'chai/register-should';

import * as chai from 'chai';
import sinonChai from 'sinon-chai';

import { fetchProxy as fetch } from '@/supporting';

import WorldState from '@/WorldState';

const logger = {
  error: () => {},
  debug: () => {},
  info: () => {},
  log: () => {},
};

const { expect } = chai;
chai.should();
chai.use(sinonChai);

// biome-ignore lint/correctness/noUnusedVariables: incase we find a way to add kuva later on
const json = async (url: string) => fetch(url).then((res) => res.json());
const text = async (url: string) =>
  fetch(url, { contentType: 'text/html' }).then((res) => res.text());

describe('WorldState (integration)', () => {
  it(`should parse live pc worldstate data`, async function () {
    this.timeout(100000); // allow 100 seconds to parse the worldstate
    // const kuvaData = await json('https://10o.io/arbitrations.json');
    const ws = await text('https://api.warframe.com/cdn/worldState.php');

    (async () => {
      await WorldState(ws, { logger, locale: 'en' });
    }).should.not.throw();

    const wsl = await WorldState(ws, {
      logger,
      locale: 'en',
      kuvaData: undefined,
    });
    expect(wsl?.news).to.exist;
    wsl?.news?.forEach((article) => {
      if (article.message.toLowerCase().includes('stream')) {
        article.should.include({ stream: true });
      }
    });
    expect(wsl?.duviriCycle).to.exist;
    wsl?.duviriCycle?.choices.should.have.length.gte(2);
    expect(wsl?.syndicateMissions).to.exist;
    expect(wsl?.syndicateMissions).to.be.an('array');
    expect(wsl?.syndicateMissions).to.have.length.gte(10);
    const Ostrons = wsl?.syndicateMissions?.filter(
      (m) => m.syndicate === 'Ostrons'
    )[0];
    expect(Ostrons).to.exist;
    expect(Ostrons).to.be.an('object');
    expect(Ostrons.syndicate).to.equal('Ostrons');
    expect(Ostrons.jobs).to.exist;
    expect(Ostrons.jobs).to.be.an('array');
    expect(Ostrons.jobs).to.have.length.gte(1);
    wsl.syndicateMissions.some(
      (m) => !!m.jobs.some((job) => job.rewardPool.length > 0)
    ).should.be.true;

    expect(wsl?.fissures).to.exist;
    expect(wsl?.sentientOutposts.id).to.not.contain('dataOverride');

    /* Easy debugging! */
    if (process.env.CI) {
      return fs.writeFile(
        path.resolve(`./data.pc.json`),
        JSON.stringify(
          wsl.syndicateMissions.find((m) => m.syndicate === 'Ostrons')
        )
      );
    }
  });

  it('should run the README example', async () => {
    const example = async () => {
      const WorldStateParser = await import('warframe-worldstate-parser');
      const worldstateData = await fetch(
        'https://api.warframe.com/cdn/worldState.php',
        { contentType: 'text/html' }
      ).then((data) => data.text());
      // @ts-expect-error it really is callable
      const ws = await WorldStateParser(worldstateData);
      console.log(ws.alerts[0].toString());
    };

    example.should.not.throw();
  });
});
