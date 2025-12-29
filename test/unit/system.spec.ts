import * as chai from 'chai';

import type { Dependency } from '@/supporting/Dependency.js';
import fetch from '@/supporting/FetchProxy.js';
import sentientMock from '@/data/anomaly.json' with { type: 'json' };
import kuvaMock from '@/data/kuvalog.json' with { type: 'json' };

import WorldState from '@/../main.js';

chai.should();

const data: Record<string, string> = {};
const platforms = ['pc'];

const getPData = (p: string) =>
  fetch(`https://api.warframe.com/cdn/worldState.php`, {
    session: `parser-${p}`,
    contentType: 'text/html',
  })
    .then((d) => d.text())
    .then((d) => {
      data[p] = d;
    });

before(() => {
  const ps = platforms.map(getPData);
  return Promise.all(ps);
});

describe('The parser', () => {
  platforms.forEach((platform) => {
    it(`Should parse the ${platform.toUpperCase()} data without throwing`, () => {
      const deps: Dependency = {
        locale: 'en',
        kuvaData: kuvaMock,
        sentientData: sentientMock,
        logger: console,
      };

      (() => {
        try {
          new WorldState(JSON.parse(data[platform]), deps);
        } catch (e) {
          console.error(e);
          throw e;
        }
      }).should.not.throw();
    });

    it(`Should parse the ${platform.toUpperCase()} data to Spanish without throwing`, () => {
      const deps: Dependency = {
        locale: 'es',
        kuvaData: kuvaMock,
        sentientData: sentientMock,
        logger: console,
      };

      (() => {
        try {
          new WorldState(JSON.parse(data[platform]), deps);
        } catch (e) {
          console.error(e);
          throw e;
        }
      }).should.not.throw();
    });
  });
});
