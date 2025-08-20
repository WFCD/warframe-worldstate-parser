import * as chai from 'chai';

import VoidTrader, { RawVoidTrader } from '../../lib/models/VoidTrader.js';
import VaultTrader from '../data/VaultTrader.json' with { type: 'json' };
import Dependency from '../../lib/supporting/Dependency.js';

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

  describe('#toString()', () => {
    it('should format the string correctly according to the data', () => {
      const testData = {
        _id: { $oid: '1234sg' },
        Activation: { sec: 1 },
        Expiry: { sec: 3 },
        Character: 'Baro',
        Manifest: [],
        Node: '',
        InitialStartDate: undefined,
        Completed: false,
        ScheduleInfo: []
      };
      const v = new VoidTrader(testData);

      v.isActive = () => true;
      v.toString().should.contain('Trader at');

      v.isActive = () => false;
      v.toString().should.contain('not here');
    });
  });
});
