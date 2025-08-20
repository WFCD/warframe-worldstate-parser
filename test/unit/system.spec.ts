import * as chai from 'chai';

// eslint-disable-next-line import/no-named-as-default
import WorldstateObject from '../../lib/models/WorldstateObject.js';
import WorldState from '../../main.js';
import sentientMock from '../data/anomaly.json' with { type: 'json' };
import kuvaMock from '../data/kuvalog.json' with { type: 'json' };
import Dependency from '../../lib/supporting/Dependency.js';

chai.should();

const checkToString = (worldState: WorldState) => {
  Object.getOwnPropertyNames(worldState)
    .filter((p) => {
      // eslint-disable-next-line no-console
      if (!worldState[p as keyof WorldState]) console.info(`${p} was undefined`);
      return worldState[p as keyof WorldState];
    })
    .forEach((p) => {
      if (Array.isArray(worldState[p as keyof WorldState])) {
        worldState[p as keyof WorldState].forEach((m: WorldstateObject) => m.toString());
      } else {
        worldState[p as keyof WorldState].toString();
      }
    });
};

const data: Record<string, string> = {};
const platforms = ['pc'];
let w: WorldState;

const getPData = (p: string) =>
  fetch(`https://content.warframe.com/dynamic/worldState.php`)
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
          w = new WorldState(JSON.parse(data[platform]), deps);
          checkToString(w);
        } catch (e) {
          // eslint-disable-next-line no-console
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
          w = new WorldState(JSON.parse(data[platform]), deps);
          checkToString(w);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          throw e;
        }
      }).should.not.throw();
    });
  });
});
