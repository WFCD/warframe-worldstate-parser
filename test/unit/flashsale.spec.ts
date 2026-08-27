import * as chai from 'chai';

import { FlashSale, type RawFlashSale } from '@/models';

const expect = chai.expect;

describe('FlashSale', function () {
  describe('#constructor()', function () {
    it('should throw TypeError when called with no arguments or an invalid argument', function () {
      expect(() => {
        new FlashSale(undefined as unknown as RawFlashSale);
      }).to.throw(TypeError);
      expect(() => {
        new FlashSale({} as unknown as RawFlashSale);
      }).to.throw(TypeError);
    });

    it('should preserve TypeName as uniqueName', function () {
      const typeName =
        '/Lotus/StoreItems/Upgrades/Skins/Events/InfQuantaInfestedAladV';
      const sale = new FlashSale({
        TypeName: typeName,
        StartDate: { $date: { $numberLong: '1586372400000' } },
        EndDate: { $date: { $numberLong: '1586977200000' } },
        Discount: 50,
        RegularOverride: 0,
        PremiumOverride: 100,
        ShowInMarket: true,
        Featured: false,
        Popular: false,
      });

      expect(sale.uniqueName).to.equal(typeName);
    });
  });
});
