import * as chai from 'chai';

import VoidTrader, { type RawVoidTrader } from '../../lib/models/VoidTrader.js';
import VaultTrader from '../data/VaultTrader.json' with { type: 'json' };
import type Dependency from '../../lib/supporting/Dependency.js';

chai.should();

const deps: Dependency = {
  locale: 'en',
};

describe('VoidTrader', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      (() => {
        new VoidTrader(undefined as unknown as RawVoidTrader);
      }).should.throw(TypeError);
      (() => {
        new VoidTrader({} as unknown as RawVoidTrader);
      }).should.throw(TypeError);
    });
    it('should parse PrimeVaultTrader', () => {
      (() => {
        new VoidTrader(VaultTrader, deps);
      }).should.not.throw();
    });
  });
});
