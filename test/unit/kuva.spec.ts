import * as chai from 'chai';

import { Kuva } from '@/models';
import type { Dependency } from '@/supporting';
import mockKuva from '@/data/kuvalog.json' with { type: 'json' };

const expect = chai.expect;

const minDeps: Dependency = {
  locale: 'en',
  logger: console,
};

mockKuva.forEach((mission) => {
  const date = new Date(Date.now() - 1000 * 60 * 10);
  /* eslint-disable no-param-reassign */
  // make the start time 10 minutes before now
  mission.start = date.toUTCString();
  // make the end an hour after the start
  mission.end = new Date(date.getTime() + 1000 * 60 * 60).toUTCString();
});

const real = new Kuva({
  ...minDeps,
  kuvaData: mockKuva,
});

describe('Kuva', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument', () => {
      expect(() => {
        new Kuva(undefined as unknown as Dependency);
      }).to.throw(TypeError);
    });

    it('should have real data', () => {
      expect(real).to.be.an('object').that.has.all.keys('kuva', 'arbitration');
      expect(real.kuva).to.be.an('array');
      expect(real.arbitration).to.be.an('object');
    });

    it('should not throw if just dependencies are provided', () => {
      expect(() => {
        new Kuva(minDeps);
      }).to.not.throw();
    });
  });

  describe('parse', () => {
    it('should handle dates vastly away from now', () => {
      let k: Kuva;
      expect(() => {
        k = new Kuva({
          ...minDeps,
          kuvaData: [
            {
              start: new Date(0).getTime().toString(),
              end: new Date(0).getTime().toString(),
              solnode: 'CrewBattleNode501',
            },
          ],
        });
      }).to.not.throw();
      expect(k!).to.exist;
    });
  });
});
