'use strict';

const chai = require('chai');

const should = chai.should();

const Kuva = require('../../lib/models/Kuva');
const mockKuva = require('../data/kuvalog.json');

const minDeps = {
  translator: { nodeMissionType: () => {}, node: () => {} },
  locale: 'en',
  logger: console,
};

mockKuva.forEach((mission) => {
  /* eslint-disable no-param-reassign */
  // make the start time 10 minutes before now
  mission.start = new Date(Date.now() - 1000 * 60 * 10);
  // make the end an hour after the start
  mission.end = new Date(mission.start.getTime() + 1000 * 60 * 60);
});

const real = new Kuva({
  ...minDeps,
  kuvaData: mockKuva,
});

describe('Kuva', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no argument', () => {
      (() => {
        new Kuva();
      }).should.throw(TypeError);
    });

    it('should have real data', () => {
      () => {
        real.should.be.an('object').that.has.all.keys('kuva', 'arbitration');
        real.kuva.should.be.an('array');
        real.arbitration.should.be.an('object');
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
      let k;
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
      should.exist(k);
    });
  });
});
