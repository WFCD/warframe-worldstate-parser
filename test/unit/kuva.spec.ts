import * as chai from 'chai';

import Kuva from '../../lib/models/Kuva.js';
import mockKuva from '../data/kuvalog.json' with { type: 'json' };
import Dependency from '../../lib/supporting/Dependency.js';

const should = chai.should();

const minDeps:Dependency = {
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
      (() => {
        new Kuva(undefined as unknown as Dependency);
      }).should.throw(TypeError);
    });

    it('should have real data', () => {
      () => {
        real.should.be.an('object').that.has.all.keys('kuva', 'arbitration');
        real.kuva?.should.be.an('array');
        real.arbitration?.should.be.an('object');
      };
    });

    it('should not throw if just dependencies are provided', () => {
      () => {
        (() => {
          new Kuva(minDeps);
        }).should.not.throw();
      };
    });
  });

  describe('parse', () => {
    it('should handle dates vastly away from now', () => {
      let k: Kuva;
      (() => {
        k = new Kuva({
          ...minDeps,
          kuvaData: [
            {
              activation: new Date(0).getTime(),
              expiry: new Date(0).getTime(),
              solnode: 'CrewBattleNode501',
              
            },
          ],
        });
      }).should.not.throw();
      should.exist(k!);
    });
  });
});
