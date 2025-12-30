import * as chai from 'chai';

import { type RawVoidTrader, VoidTrader } from '@/models';
import type { Dependency } from '@/supporting';
import VaultTrader from '@/data/VaultTrader.json' with { type: 'json' };

const expect = chai.expect;

const deps: Dependency = {
  locale: 'en',
};

describe('VoidTrader', () => {
  describe('#constructor()', () => {
    it('should throw TypeError when called with no arguments or an invalid argument', () => {
      expect(() => {
        new VoidTrader(undefined as unknown as RawVoidTrader);
      }).to.throw(TypeError);
      expect(() => {
        new VoidTrader({} as unknown as RawVoidTrader);
      }).to.throw(TypeError);
    });
    it('should parse PrimeVaultTrader', () => {
      expect(() => {
        new VoidTrader(VaultTrader, deps);
      }).to.not.throw();
    });
  });
});
